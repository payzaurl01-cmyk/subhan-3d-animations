"use client";

import { useEffect } from "react";

/**
 * Vanilla interaction layer ported from the template's assets/js/main.js:
 * scroll-reveal, hamburger full-screen menu, testimonial tabs, slot-roll counters,
 * YouTube/image lightbox, custom checkboxes/radios, blog category filter, demo
 * forms, autoplay video, and a localStorage cart (+ checkout / order-confirmation).
 *
 * The original markup + class names are reproduced 1:1 in the React components, so
 * this logic drives them unchanged. Navigation is full-reload (plain <a>), so this
 * re-initialises the freshly rendered DOM on every page load.
 */
export function NuvoraScripts() {
  useEffect(() => {
    const $ = <T extends Element = Element>(s: string, c?: ParentNode): T | null =>
      (c || document).querySelector<T>(s);
    const $$ = <T extends Element = Element>(s: string, c?: ParentNode): T[] =>
      Array.prototype.slice.call((c || document).querySelectorAll<T>(s));
    const on = (
      el: EventTarget | null,
      ev: string,
      fn: EventListenerOrEventListenerObject,
      o?: boolean | AddEventListenerOptions,
    ) => {
      if (el) el.addEventListener(ev, fn, o);
    };

    /* -------------------------------------------------------------- reveal */
    function initReveal() {
      const els = $$<HTMLElement>(".reveal");
      if (!els.length) return () => {};
      function reveal(el: HTMLElement) {
        el.classList.add("is-visible");
        window.setTimeout(() => el.classList.add("reveal-complete"), 1300);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }

    /* -------------------------------------- window story scroll perspective */
    function initWindowStoryScroll() {
      const section = $<HTMLElement>(".window-story");
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return () => {};
      }

      const media = $$<HTMLElement>("[data-story-depth]", section);
      const activeMedia = new Set<HTMLElement>();
      const mediaIndexes = new Map(media.map((item, index) => [item, index]));
      let observer: IntersectionObserver | null = null;
      let frame = 0;
      let listening = false;
      function update() {
        frame = 0;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        activeMedia.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const depth = Number(item.dataset.storyDepth || 30);
          const index = mediaIndexes.get(item) || 0;
          const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
          const centeredProgress = progress - 0.5;
          const direction = index % 2 === 0 ? 1 : -1;
          const offset = centeredProgress * depth * 1.8;
          item.style.setProperty("--story-x", (centeredProgress * direction * 10).toFixed(2) + "px");
          item.style.setProperty("--story-y", offset.toFixed(2) + "px");
          item.style.setProperty("--story-rotate", ((0.5 - progress) * 7).toFixed(2) + "deg");
          item.style.setProperty("--story-rotate-y", (centeredProgress * direction * 4).toFixed(2) + "deg");
          item.style.setProperty("--story-image-y", (-offset * 0.45).toFixed(2) + "px");
        });
      }
      function requestUpdate() {
        if (frame || !activeMedia.size) return;
        frame = window.requestAnimationFrame(update);
      }

      function syncListeners() {
        if (activeMedia.size && !listening) {
          window.addEventListener("scroll", requestUpdate, { passive: true });
          window.addEventListener("resize", requestUpdate);
          listening = true;
        } else if (!activeMedia.size && listening) {
          window.removeEventListener("scroll", requestUpdate);
          window.removeEventListener("resize", requestUpdate);
          listening = false;
        }
      }

      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const item = entry.target as HTMLElement;
              if (entry.isIntersecting) activeMedia.add(item);
              else activeMedia.delete(item);
              item.classList.toggle("is-scroll-active", entry.isIntersecting);
            });
            syncListeners();
            requestUpdate();
          },
          { rootMargin: "35% 0px" },
        );
        media.forEach((item) => observer!.observe(item));
      } else {
        media.forEach((item) => {
          activeMedia.add(item);
          item.classList.add("is-scroll-active");
        });
        syncListeners();
        requestUpdate();
      }

      return () => {
        observer?.disconnect();
        activeMedia.clear();
        syncListeners();
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    /* Pause decorative looping motion when its component is off screen. */
    function initMotionPerformance() {
      const statsCard = $<HTMLElement>(".hero-stats-card");
      if (!statsCard || !("IntersectionObserver" in window)) return () => {};
      const observer = new IntersectionObserver(
        ([entry]) => statsCard.classList.toggle("is-motion-active", entry.isIntersecting),
        { threshold: 0.05 },
      );
      observer.observe(statsCard);
      return () => observer.disconnect();
    }

    /* ------------------------------------------ homepage FAQ hover accordion */
    function initFaqHover() {
      const rows = $$<HTMLDetailsElement>(".faq-row");
      if (!rows.length) return () => {};

      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
      const cleanups = rows.map((row) => {
        const summary = $<HTMLElement>(".faq-summary", row);
        const open = () => {
          if (canHover.matches) row.open = true;
        };
        const close = () => {
          if (!canHover.matches) return;
          row.open = false;
          if (document.activeElement === summary) summary?.blur();
        };
        const preventPointerToggle = (event: MouseEvent) => {
          if (canHover.matches && event.detail > 0) event.preventDefault();
        };

        row.addEventListener("pointerenter", open);
        row.addEventListener("pointerleave", close);
        summary?.addEventListener("click", preventPointerToggle);

        return () => {
          row.removeEventListener("pointerenter", open);
          row.removeEventListener("pointerleave", close);
          summary?.removeEventListener("click", preventPointerToggle);
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    }

    /* -------------------------------------------- hamburger full-screen menu */
    function initNav() {
      const overlay = $<HTMLElement>(".open-menu");
      if (!overlay) return;
      function set(open: boolean) {
        overlay!.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-open", open);
        overlay!.setAttribute("aria-hidden", open ? "false" : "true");
      }
      $$<HTMLElement>(".hamburger-menu.open").forEach((b) => {
        on(b, "click", (e) => {
          e.preventDefault();
          set(true);
        });
      });
      $$<HTMLElement>(".hamburger-menu.close", overlay).forEach((b) => {
        on(b, "click", (e) => {
          e.preventDefault();
          set(false);
        });
      });
      $$<HTMLElement>("a", overlay).forEach((a) => on(a, "click", () => set(false)));
      on(overlay, "click", (e) => {
        if (e.target === overlay) set(false);
      });
      on(document, "keydown", (e) => {
        if ((e as KeyboardEvent).key === "Escape") set(false);
      });
      set(false);
    }

    /* ------------------------------------------------------------------ tabs */
    function initTabs() {
      $$<HTMLElement>(".tabs").forEach((wrap) => {
        const links = $$<HTMLElement>(".tab-link", wrap);
        const panes = $$<HTMLElement>(".tab-pane", wrap);
        if (!links.length) return;
        function activate(i: number) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          panes.forEach((p) => p.classList.remove("is-active"));
          if (links[i]) links[i].setAttribute("aria-current", "page");
          if (panes[i]) panes[i].classList.add("is-active");
        }
        links.forEach((link, i) => {
          on(link, "click", (e) => {
            e.preventDefault();
            activate(i);
          });
        });
        if (!$(".tab-pane.is-active", wrap)) activate(0);
      });
    }

    /* -------------------------------------------------------------- counters */
    function initCounters() {
      const items = $$<HTMLElement>(".counter-digit-item").filter(
        (col) => $$(".counter-number", col).length > 1,
      );
      if (!items.length) return;
      type Group = { box: Element; cols: HTMLElement[]; done: boolean };
      const groups: Group[] = [];
      items.forEach((col) => {
        const box =
          col.closest(".counter-single-box, .themselves-counter-single-box") || col;
        let g: Group | null = null;
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].box === box) {
            g = groups[i];
            break;
          }
        }
        if (!g) {
          g = { box, cols: [], done: false };
          groups.push(g);
        }
        g.cols.push(col);
        const n = $$(".counter-number", col).length;
        col.style.willChange = "transform";
        col.style.transform = "translateY(-" + (n - 1) * 100 + "%)";
      });
      function roll() {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        let pending = false;
        groups.forEach((g) => {
          if (g.done) return;
          if (g.box.getBoundingClientRect().top > vh * 0.85) {
            pending = true;
            return;
          }
          g.done = true;
          g.cols.forEach((col, k) => {
            setTimeout(() => {
              col.style.transition = "transform 1.4s cubic-bezier(.16,1,.3,1)";
              col.style.transform = "translateY(0)";
            }, 90 * k);
          });
        });
        if (!pending) window.removeEventListener("scroll", onScroll);
      }
      let scheduled = false;
      function onScroll() {
        if (scheduled) return;
        scheduled = true;
        const raf =
          window.requestAnimationFrame || ((f: FrameRequestCallback) => setTimeout(f, 16));
        raf(() => {
          roll();
          scheduled = false;
        });
        setTimeout(() => {
          if (scheduled) {
            roll();
            scheduled = false;
          }
        }, 120);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      roll();
    }

    /* ------------------------------------- why-homeowners count-up metrics */
    function initHomeownerCounters() {
      const counters = $$<HTMLElement>(".why-homeowners-stat [data-count-to]");
      if (!counters.length) return () => {};

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const activeFrames = new Map<HTMLElement, number>();
      const formatters = new Map<number, Intl.NumberFormat>();

      function formatValue(value: number, decimals: number, suffix: string) {
        if (!formatters.has(decimals)) {
          formatters.set(
            decimals,
            new Intl.NumberFormat("en-AU", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }),
          );
        }
        return formatters.get(decimals)!.format(value) + suffix;
      }

      function getCounterSettings(counter: HTMLElement) {
        return {
          target: Number(counter.dataset.countTo || 0),
          decimals: Number(counter.dataset.countDecimals || 0),
          suffix: counter.dataset.countSuffix || "",
        };
      }

      function finish(counter: HTMLElement) {
        const { target, decimals, suffix } = getCounterSettings(counter);
        counter.textContent = formatValue(target, decimals, suffix);
      }

      if (reducedMotion || !("IntersectionObserver" in window)) {
        counters.forEach(finish);
        return () => {};
      }

      function animate(counter: HTMLElement) {
        const { target, decimals, suffix } = getCounterSettings(counter);
        const startValue = Math.min(1, target);
        const duration = 1500;
        const startedAt = performance.now();

        function update(now: number) {
          const progress = Math.min((now - startedAt) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const rawValue = startValue + (target - startValue) * easedProgress;
          const value = decimals ? rawValue : Math.floor(rawValue);
          counter.textContent = formatValue(value, decimals, suffix);

          if (progress < 1) {
            const frame = window.requestAnimationFrame(update);
            activeFrames.set(counter, frame);
          } else {
            activeFrames.delete(counter);
            finish(counter);
          }
        }

        const frame = window.requestAnimationFrame(update);
        activeFrames.set(counter, frame);
      }

      counters.forEach((counter) => {
        const { target, decimals, suffix } = getCounterSettings(counter);
        counter.textContent = formatValue(Math.min(1, target), decimals, suffix);
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const counter = entry.target as HTMLElement;
            observer.unobserve(counter);
            animate(counter);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.35 },
      );

      counters.forEach((counter) => observer.observe(counter));

      return () => {
        observer.disconnect();
        activeFrames.forEach((frame) => window.cancelAnimationFrame(frame));
        activeFrames.clear();
      };
    }

    /* -------------------------------------------------------------- lightbox */
    function initLightbox() {
      const anchors = $$<HTMLAnchorElement>("a[data-lightbox]").filter(
        (a) => a.getAttribute("data-lightbox") !== "none",
      );
      if (!anchors.length) return;

      const box = document.createElement("div");
      box.className = "nv-lightbox";
      box.setAttribute("aria-hidden", "true");
      box.innerHTML =
        '<div class="nv-lightbox-backdrop" data-lb-close></div>' +
        '<button class="nv-lightbox-close" data-lb-close aria-label="Close">&times;</button>' +
        '<button class="nv-lightbox-nav nv-lightbox-prev" data-lb-prev aria-label="Previous">&#8249;</button>' +
        '<div class="nv-lightbox-stage"></div>' +
        '<button class="nv-lightbox-nav nv-lightbox-next" data-lb-next aria-label="Next">&#8250;</button>';
      document.body.appendChild(box);
      const stage = $<HTMLElement>(".nv-lightbox-stage", box)!;

      let group: HTMLAnchorElement[] = [];
      let gi = 0;
      function render() {
        const a = group[gi];
        const kind = a.getAttribute("data-lightbox");
        if (kind === "video") {
          const id = a.getAttribute("data-video-id");
          stage.innerHTML =
            '<div class="nv-lightbox-video"><iframe src="https://www.youtube.com/embed/' +
            id +
            '?autoplay=1&rel=0" title="Video" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe></div>';
        } else {
          stage.innerHTML =
            '<img class="nv-lightbox-img" src="' +
            a.getAttribute("data-lightbox-src") +
            '" alt="">';
        }
        const multi = group.length > 1;
        $<HTMLElement>(".nv-lightbox-prev", box)!.style.display = multi ? "" : "none";
        $<HTMLElement>(".nv-lightbox-next", box)!.style.display = multi ? "" : "none";
      }
      function open(a: HTMLAnchorElement) {
        const g = a.getAttribute("data-lightbox-group");
        group = g
          ? anchors.filter((x) => x.getAttribute("data-lightbox-group") === g)
          : [a];
        gi = Math.max(0, group.indexOf(a));
        render();
        box.classList.add("is-open");
        box.setAttribute("aria-hidden", "false");
        document.body.classList.add("nav-open");
      }
      function close() {
        box.classList.remove("is-open");
        box.setAttribute("aria-hidden", "true");
        document.body.classList.remove("nav-open");
        stage.innerHTML = "";
      }
      function step(d: number) {
        gi = (gi + d + group.length) % group.length;
        render();
      }

      anchors.forEach((a) => {
        on(a, "click", (e) => {
          e.preventDefault();
          open(a);
        });
      });
      on(box, "click", (e) => {
        const t = e.target as HTMLElement;
        if (t.closest("[data-lb-close]")) return close();
        if (t.closest("[data-lb-prev]")) return step(-1);
        if (t.closest("[data-lb-next]")) return step(1);
      });
      on(document, "keydown", (e) => {
        const ke = e as KeyboardEvent;
        if (!box.classList.contains("is-open")) return;
        if (ke.key === "Escape") close();
        else if (ke.key === "ArrowLeft") step(-1);
        else if (ke.key === "ArrowRight") step(1);
      });
    }

    /* ---------------------------------------------- custom checkbox / radio */
    function initChecks() {
      const inputs = $$<HTMLInputElement>("input[type=checkbox], input[type=radio]");
      function boxOf(inp: HTMLInputElement) {
        return (
          inp.parentElement &&
          inp.parentElement.querySelector(".wf-checkbox-input, .wf-radio-input")
        );
      }
      function syncAll() {
        inputs.forEach((i) => {
          const b = boxOf(i);
          if (b) b.classList.toggle("is-checked", i.checked);
        });
      }
      inputs.forEach((inp) => on(inp, "change", syncAll));
      syncAll();
    }

    /* --------------------------------------------------- blog category filter */
    function initBlogFilter() {
      const chips = $$<HTMLElement>(".catagory-button[data-filter]");
      if (!chips.length) return;
      const cards = $$<HTMLElement>(
        ".blog-collection-item, .blog-card-collection-item, [data-cat]",
      ).filter((c) => c.hasAttribute("data-cat"));
      function apply(cat: string | null) {
        cards.forEach((c) => {
          c.style.display =
            cat === "all" || c.getAttribute("data-cat") === cat ? "" : "none";
        });
        chips.forEach((ch) => {
          ch.setAttribute(
            "aria-current",
            ch.getAttribute("data-filter") === cat ? "page" : "false",
          );
        });
      }
      chips.forEach((ch) => {
        on(ch, "click", (e) => {
          e.preventDefault();
          apply(ch.getAttribute("data-filter"));
        });
      });
      apply("all");
    }

    /* ------------------------------------------------------------ demo forms */
    function initForms() {
      $$<HTMLFormElement>("[data-demo-form]").forEach((form) => {
        on(form, "submit", (e) => {
          e.preventDefault();
          const wrap = form.parentElement;
          const done = wrap
            ? wrap.querySelector<HTMLElement>("[data-form-done]")
            : null;
          form.style.display = "none";
          if (done) {
            done.hidden = false;
            done.style.display = "block";
          }
        });
      });
    }

    /* ------------------------------------------------------------------ video */
    function initVideo() {
      const videos = $$<HTMLVideoElement>("video[data-viewport-autoplay]");
      if (!videos.length || !("IntersectionObserver" in window)) return () => {};

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) void video.play().catch(() => undefined);
            else video.pause();
          });
        },
        { rootMargin: "300px 0px", threshold: 0.05 },
      );

      videos.forEach((video) => {
        video.muted = true;
        observer.observe(video);
      });

      return () => observer.disconnect();
    }

    /* ============================================================ CART (LS) */
    const CART_KEY = "Nuvora:cart:v1";
    type CartItem = { id: string; name: string; price: string; img: string; qty: number };
    const Cart = {
      read(): CartItem[] {
        try {
          return JSON.parse(localStorage.getItem(CART_KEY) || "null") || [];
        } catch {
          return [];
        }
      },
      write(items: CartItem[]) {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        this.render();
      },
      add(item: Partial<CartItem> & { id: string; name: string; price: string }) {
        const items = this.read();
        const ex = items.filter((i) => i.id === item.id)[0];
        if (ex) ex.qty += item.qty || 1;
        else
          items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            img: item.img || "",
            qty: item.qty || 1,
          });
        this.write(items);
      },
      remove(id: string) {
        this.write(this.read().filter((i) => i.id !== id));
      },
      count() {
        return this.read().reduce((n, i) => n + i.qty, 0);
      },
      total() {
        return this.read().reduce((s, i) => s + parsePrice(i.price) * i.qty, 0);
      },
      render() {
        const items = this.read();
        const n = Cart.count();
        $$<HTMLElement>("[data-cart-count]").forEach((el) => {
          el.textContent = String(n);
          el.hidden = n === 0;
        });
        $$<HTMLElement>("[data-cart-list]").forEach((list) => {
          list.innerHTML = "";
          items.forEach((i) => {
            const li = document.createElement("li");
            li.className = "cart-line";
            li.innerHTML =
              (i.img ? '<img class="cart-line-img" src="' + i.img + '" alt="">' : "") +
              '<div class="cart-line-main"><div class="cart-line-name">' +
              esc(i.name) +
              '</div><div class="cart-line-price">' +
              esc(i.price) +
              " × " +
              i.qty +
              "</div></div>" +
              '<button class="cart-line-remove" data-cart-remove="' +
              esc(i.id) +
              '" aria-label="Remove">×</button>';
            list.appendChild(li);
          });
        });
        $$<HTMLElement>("[data-cart-empty]").forEach((e) => {
          e.style.display = items.length ? "none" : "";
        });
        $$<HTMLElement>("[data-cart-footer]").forEach((f) => {
          f.hidden = items.length === 0;
        });
        $$<HTMLElement>("[data-cart-subtotal]").forEach((s) => {
          s.textContent = fmt(Cart.total());
        });
      },
    };
    function parsePrice(p: string) {
      const n = parseFloat(String(p).replace(/[^0-9.]/g, ""));
      return isNaN(n) ? 0 : n;
    }
    function fmt(n: number) {
      return (
        "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      );
    }
    function esc(s: string) {
      return String(s).replace(
        /[&<>"]/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
      );
    }

    function initCart() {
      document.addEventListener("click", (e) => {
        const t = e.target as HTMLElement;
        const openBtn = t.closest("[data-cart-open]");
        if (openBtn) {
          e.preventDefault();
          $$<HTMLElement>("[data-cart-modal]").forEach((m) => {
            const o = m.classList.toggle("is-open");
            m.setAttribute("aria-hidden", o ? "false" : "true");
          });
          return;
        }
        const closeBtn = t.closest("[data-cart-close]");
        if (closeBtn) {
          e.preventDefault();
          $$<HTMLElement>("[data-cart-modal]").forEach((m) => {
            m.classList.remove("is-open");
            m.setAttribute("aria-hidden", "true");
          });
          return;
        }
        const rm = t.closest("[data-cart-remove]");
        if (rm) {
          e.preventDefault();
          Cart.remove(rm.getAttribute("data-cart-remove") || "");
          return;
        }
        const add = t.closest("[data-add-to-cart]");
        if (add) {
          e.preventDefault();
          Cart.add({
            id: add.getAttribute("data-cart-id") || add.getAttribute("data-cart-name") || "",
            name: add.getAttribute("data-cart-name") || "",
            price: add.getAttribute("data-cart-price") || "",
            img: add.getAttribute("data-cart-img") || "",
          });
          $$<HTMLElement>("[data-cart-modal]").forEach((m) => {
            m.classList.add("is-open");
            m.setAttribute("aria-hidden", "false");
          });
          return;
        }
        if (!t.closest(".cart")) {
          $$<HTMLElement>("[data-cart-modal].is-open").forEach((m) => {
            m.classList.remove("is-open");
            m.setAttribute("aria-hidden", "true");
          });
        }
      });
      Cart.render();
    }
    (window as unknown as { NuvoraCart: typeof Cart }).NuvoraCart = Cart;

    /* ------------------------------------------------- checkout / confirmation */
    const ORDER_KEY = "Nuvora:order:v1";
    function renderOrderSummary(items: CartItem[]) {
      const list = $<HTMLElement>(".wf-commerce-commercecheckoutorderitemslist");
      if (list) {
        list.innerHTML = "";
        if (!items.length)
          list.innerHTML = '<div class="checkout-order-empty">Your cart is empty.</div>';
        items.forEach((i) => {
          const d = document.createElement("div");
          d.className = "checkout-order-item";
          d.innerHTML =
            (i.img ? '<img class="checkout-order-img" src="' + i.img + '" alt="">' : "") +
            '<div class="checkout-order-main"><div class="checkout-order-name">' +
            esc(i.name) +
            '</div><div class="checkout-order-qty">Qty ' +
            i.qty +
            "</div></div>" +
            '<div class="checkout-order-price">' +
            esc(i.price) +
            "</div>";
          list.appendChild(d);
        });
      }
      const total = items.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0);
      $$<HTMLElement>(".wf-commerce-commercecheckoutsummarylineitem").forEach((li) => {
        const v = li.lastElementChild as HTMLElement | null;
        if (v) v.textContent = fmt(total);
      });
      const t = $<HTMLElement>(".wf-commerce-commercecheckoutsummarytotal");
      if (t) t.textContent = fmt(total);
    }
    function initCheckout() {
      if (!$(".wf-commerce-commercecheckoutorderitemslist")) return;
      if (/order-confirmation/.test(location.pathname)) {
        let order: { id: string; items: CartItem[] } | null = null;
        try {
          order = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
        } catch {
          /* ignore */
        }
        renderOrderSummary(order ? order.items : []);
        if (order)
          $$<HTMLElement>("[data-order-number]").forEach((el) => {
            el.textContent = order!.id;
          });
        return;
      }
      const items = Cart.read();
      renderOrderSummary(items);
      const place = $<HTMLElement>(".wf-commerce-commercecheckoutplaceorderbutton");
      on(place, "click", (e) => {
        e.preventDefault();
        if (!items.length) return;
        const order = {
          id: "NVR-" + String(Date.now()).slice(-8),
          items,
          total: Cart.total(),
          date: new Date().toISOString(),
        };
        localStorage.setItem(ORDER_KEY, JSON.stringify(order));
        Cart.write([]);
        location.href = "/order-confirmation";
      });
    }

    /* -------------------------------------------------------------- boot */
    const destroyReveal = initReveal();
    const destroyWindowStoryScroll = initWindowStoryScroll();
    const destroyMotionPerformance = initMotionPerformance();
    const destroyFaqHover = initFaqHover();
    initNav();
    initTabs();
    initCounters();
    const destroyHomeownerCounters = initHomeownerCounters();
    initLightbox();
    initBlogFilter();
    initChecks();
    initForms();
    const destroyVideo = initVideo();
    initCart();
    initCheckout();
    return () => {
      destroyReveal();
      destroyWindowStoryScroll();
      destroyMotionPerformance();
      destroyFaqHover();
      destroyHomeownerCounters();
      destroyVideo();
    };
  }, []);

  return null;
}
