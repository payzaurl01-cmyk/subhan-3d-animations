import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const outputDir = process.argv[2] ?? "/tmp/nuvora-route-trace";
const baseUrl = process.argv[3] ?? "http://localhost:3001";
const port = Number(process.env.CHROME_DEBUG_PORT ?? 9333);
const concurrency = Number(process.env.PERF_CONCURRENCY ?? 3);
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const fixedRoutes = [
  "/", "/401", "/404", "/about", "/admin", "/blog", "/changelog",
  "/checkout", "/contact", "/license", "/order-confirmation", "/paypal-checkout",
  "/pricing", "/privacy-policy", "/products", "/project", "/style-guide",
  "/terms-of-service", "/thanks-you", "/route-that-does-not-exist", "/keystatic",
];

function contentRoutes(collection, prefix) {
  return readdirSync(path.join(process.cwd(), "src/content", collection))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `${prefix}/${file.replace(/\.mdx$/, "")}`);
}

const products = JSON.parse(readFileSync(path.join(process.cwd(), "src/content/products.json"), "utf8"));
const routes = [
  ...fixedRoutes,
  ...contentRoutes("blog", "/blog"),
  ...products.map(({ handle }) => `/product/${handle}`),
  ...contentRoutes("projects", "/project"),
  ...contentRoutes("services", "/service"),
];

mkdirSync(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=/tmp/nuvora-perf-chrome-${port}`,
  "--no-first-run",
  "--disable-extensions",
], { stdio: "ignore" });

async function waitForChrome() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Chrome DevTools endpoint did not start.");
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      this.listeners.get(message.method)?.forEach((listener) => listener(message.params));
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) ?? new Set();
    listeners.add(listener);
    this.listeners.set(method, listeners);
  }

  waitFor(method, timeoutMs) {
    return new Promise((resolve) => {
      const finish = (value) => {
        clearTimeout(timer);
        this.listeners.get(method)?.delete(handler);
        resolve(value);
      };
      const handler = (params) => finish(params);
      const timer = setTimeout(() => finish(null), timeoutMs);
      this.on(method, handler);
    });
  }

  close() {
    this.socket.close();
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function trace(route) {
  const targetResponse = await fetch(
    `http://127.0.0.1:${port}/json/new?${encodeURIComponent("about:blank")}`,
    { method: "PUT" },
  );
  const target = await targetResponse.json();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();

  const requests = new Map();
  let documentStatus = 0;
  client.on("Network.responseReceived", ({ requestId, response, type }) => {
    requests.set(requestId, { type, url: response.url, bytes: 0 });
    if (type === "Document" && response.url === `${baseUrl}${route}`) documentStatus = response.status;
  });
  client.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    const request = requests.get(requestId);
    if (request) request.bytes = encodedDataLength;
  });

  await Promise.all([
    client.send("Page.enable"),
    client.send("Network.enable"),
    client.send("Performance.enable"),
    client.send("Network.setCacheDisabled", { cacheDisabled: true }),
    client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 80,
      downloadThroughput: 1_600_000 / 8,
      uploadThroughput: 750_000 / 8,
      connectionType: "cellular4g",
    }),
    client.send("Emulation.setCPUThrottlingRate", { rate: 4 }),
    client.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
    }),
  ]);

  await client.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `
      window.__routePerf = { lcp: 0, cls: 0, blocking: 0 };
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        window.__routePerf.lcp = entries.at(-1)?.startTime || window.__routePerf.lcp;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__routePerf.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__routePerf.blocking += Math.max(0, entry.duration - 50);
      }).observe({ type: "longtask", buffered: true });
    `,
  });

  const loaded = client.waitFor("Page.loadEventFired", 12_000);
  await client.send("Page.navigate", { url: `${baseUrl}${route}` });
  await loaded;
  await delay(4_000);

  const { result } = await client.send("Runtime.evaluate", {
    expression: `(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paint = Object.fromEntries(performance.getEntriesByType("paint").map((entry) => [entry.name, entry.startTime]));
      const resources = performance.getEntriesByType("resource");
      return {
        title: document.title,
        readyState: document.readyState,
        fcpMs: paint["first-contentful-paint"] || 0,
        lcpMs: window.__routePerf?.lcp || 0,
        tbtMs: window.__routePerf?.blocking || 0,
        cls: window.__routePerf?.cls || 0,
        ttfbMs: navigation?.responseStart || 0,
        domContentLoadedMs: navigation?.domContentLoadedEventEnd || 0,
        loadMs: navigation?.loadEventEnd || 0,
        domNodes: document.querySelectorAll("*").length,
        imageCount: document.images.length,
        incompleteImages: [...document.images].filter((image) => !image.complete).length,
        videoCount: document.querySelectorAll("video").length,
        resourceCount: resources.length,
      };
    })()`,
    returnByValue: true,
  });

  const network = [...requests.values()];
  const bytesFor = (...types) => network
    .filter((request) => types.includes(request.type))
    .reduce((sum, request) => sum + request.bytes, 0);

  client.close();
  await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`);

  return {
    route,
    status: documentStatus,
    ...result.value,
    transferBytes: bytesFor(...new Set(network.map(({ type }) => type))),
    imageBytes: bytesFor("Image"),
    mediaBytes: bytesFor("Media"),
    scriptBytes: bytesFor("Script"),
    cssBytes: bytesFor("Stylesheet"),
    requestCount: network.length,
  };
}

await waitForChrome();
let cursor = 0;
let completed = 0;
const results = [];

async function worker() {
  while (cursor < routes.length) {
    const route = routes[cursor++];
    try {
      results.push(await trace(route));
    } catch (error) {
      results.push({ route, error: error.message });
    }
    completed += 1;
    process.stdout.write(`[${completed}/${routes.length}] ${route}\n`);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
results.sort((a, b) => routes.indexOf(a.route) - routes.indexOf(b.route));
writeFileSync(path.join(outputDir, "summary.json"), `${JSON.stringify(results, null, 2)}\n`);
chrome.kill("SIGTERM");

const valid = results.filter(({ error }) => !error);
const average = (key) => Math.round(valid.reduce((sum, item) => sum + item[key], 0) / valid.length);
process.stdout.write(`Average: LCP ${average("lcpMs")} ms, transfer ${average("transferBytes")} bytes\n`);
