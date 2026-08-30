import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const outputDir = process.argv[2] ?? "/tmp/nuvora-lighthouse";
const baseUrl = process.argv[3] ?? "http://localhost:3001";
const concurrency = Number(process.env.PERF_CONCURRENCY ?? 3);

const fixedRoutes = [
  "/",
  "/401",
  "/about",
  "/admin",
  "/blog",
  "/changelog",
  "/checkout",
  "/contact",
  "/license",
  "/order-confirmation",
  "/paypal-checkout",
  "/pricing",
  "/privacy-policy",
  "/products",
  "/project",
  "/style-guide",
  "/terms-of-service",
  "/thanks-you",
  "/keystatic",
];

function contentRoutes(collection, prefix) {
  return readdirSync(path.join(process.cwd(), "src/content", collection))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `${prefix}/${file.replace(/\.mdx$/, "")}`);
}

const products = JSON.parse(
  readFileSync(path.join(process.cwd(), "src/content/products.json"), "utf8"),
);

const routes = [
  ...fixedRoutes,
  ...contentRoutes("blog", "/blog"),
  ...products.map(({ handle }) => `/product/${handle}`),
  ...contentRoutes("projects", "/project"),
  ...contentRoutes("services", "/service"),
];

mkdirSync(outputDir, { recursive: true });

function reportName(route) {
  if (route === "/") return "home";
  return route.slice(1).replaceAll("/", "__");
}

function audit(route) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "npx",
      [
        "--yes",
        "lighthouse",
        `${baseUrl}${route}`,
        "--only-categories=performance",
        "--max-wait-for-load=15000",
        "--output=json",
        `--output-path=${path.join(outputDir, `${reportName(route)}.json`)}`,
        "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
        "--quiet",
      ],
      { stdio: "ignore" },
    );

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Lighthouse failed for ${route} with exit code ${code}`));
    });
  });
}

let cursor = 0;
let completed = 0;

async function worker() {
  while (cursor < routes.length) {
    const route = routes[cursor++];
    await audit(route);
    completed += 1;
    process.stdout.write(`[${completed}/${routes.length}] ${route}\n`);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

const summary = routes.map((route) => {
  const report = JSON.parse(
    readFileSync(path.join(outputDir, `${reportName(route)}.json`), "utf8"),
  );
  const audits = report.audits;
  const metric = (id) => Math.round(audits[id]?.numericValue ?? 0);

  return {
    route,
    score: Math.round((report.categories.performance.score ?? 0) * 100),
    fcpMs: metric("first-contentful-paint"),
    lcpMs: metric("largest-contentful-paint"),
    speedIndexMs: metric("speed-index"),
    tbtMs: metric("total-blocking-time"),
    cls: Number((audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3)),
    interactiveMs: metric("interactive"),
    transferBytes: metric("total-byte-weight"),
    requestCount: audits["network-requests"]?.details?.items?.length ?? 0,
    mainThreadMs: metric("mainthread-work-breakdown"),
    jsExecutionMs: metric("bootup-time"),
  };
});

writeFileSync(path.join(outputDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

const average = (key) =>
  Math.round(summary.reduce((total, page) => total + page[key], 0) / summary.length);

process.stdout.write(
  `Average: score ${average("score")}, LCP ${average("lcpMs")} ms, transfer ${average("transferBytes")} bytes\n`,
);
