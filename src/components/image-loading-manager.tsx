"use client";

import { useEffect } from "react";

const CONTENT_IMAGE_SELECTOR = [
  ".visual-wrap > img",
  ".window-product-image",
  ".window-story-image",
  ".styled-windows-backdrop img",
  ".styled-windows-card-media img",
  ".blog-image",
  ".guides-hero-media img",
  ".guides-featured-image img",
  ".guides-card-image img",
  ".story-image",
  ".animated-image",
  ".license-image",
  ".product-showcase-media img",
  "img.all-projects-image",
  "img.before-after-image",
  ".project-single-image-box img",
  ".gallery-image-box img",
  ".blog-single-image-box img",
  ".blog-single-common-image-box img",
].join(",");

export function ImageLoadingManager() {
  useEffect(() => {
    const watchedSources = new WeakMap<HTMLImageElement, string>();

    const removeLoaderIfReady = (image: HTMLImageElement) => {
      const host = image.parentElement;
      if (!host || host.querySelector("img.app-image-loading")) return;

      host.querySelector(":scope > .app-image-loader")?.remove();
      host.classList.remove("app-image-loader-host");
    };

    const addLoader = (image: HTMLImageElement) => {
      const host = image.parentElement;
      if (!host || host.querySelector(":scope > .app-image-loader")) return;

      host.classList.add("app-image-loader-host");

      const loader = document.createElement("span");
      loader.className = "app-image-loader";
      loader.setAttribute("aria-hidden", "true");

      const brandedLoader = document.createElement("span");
      brandedLoader.className = "app-logo-loader";

      const scene = document.createElement("span");
      scene.className = "app-logo-loader-scene";

      const orbitPrimary = document.createElement("span");
      orbitPrimary.className = "app-logo-loader-orbit orbit-primary";

      const orbitSecondary = document.createElement("span");
      orbitSecondary.className = "app-logo-loader-orbit orbit-secondary";

      const mark = document.createElement("span");
      mark.className = "app-logo-loader-mark";

      const logo = document.createElement("img");
      logo.alt = "";
      logo.decoding = "async";
      logo.height = 64;
      logo.src = "/assets/logo-96.webp";
      logo.width = 64;

      const shine = document.createElement("span");
      shine.className = "app-logo-loader-shine";

      const copy = document.createElement("span");
      copy.className = "app-logo-loader-copy";
      copy.textContent = "INTERIOR BLINDS & SHUTTERS";

      const progress = document.createElement("span");
      progress.className = "app-logo-loader-progress";
      progress.append(document.createElement("i"));

      mark.append(logo, shine);
      scene.append(orbitPrimary, orbitSecondary, mark);
      brandedLoader.append(scene, copy, progress);
      loader.append(brandedLoader);
      host.append(loader);
    };

    const watchImage = (image: HTMLImageElement) => {
      if (!image.matches(CONTENT_IMAGE_SELECTOR)) return;

      const sourceKey = `${image.getAttribute("src") ?? ""}|${image.getAttribute("srcset") ?? ""}`;
      if (watchedSources.get(image) === sourceKey) return;
      watchedSources.set(image, sourceKey);

      image.classList.remove("app-image-loaded");

      if (image.complete) {
        image.classList.remove("app-image-loading");
        removeLoaderIfReady(image);
        return;
      }

      image.classList.add("app-image-loading");
      addLoader(image);

      const finishLoading = () => {
        if (watchedSources.get(image) !== sourceKey) return;
        image.classList.remove("app-image-loading");
        image.classList.add("app-image-loaded");
        removeLoaderIfReady(image);
      };

      image.addEventListener("load", finishLoading, { once: true });
      image.addEventListener("error", finishLoading, { once: true });
    };

    document.querySelectorAll<HTMLImageElement>(CONTENT_IMAGE_SELECTOR).forEach(watchImage);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLImageElement) {
          watchImage(mutation.target);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node instanceof HTMLImageElement) watchImage(node);
          node.querySelectorAll<HTMLImageElement>(CONTENT_IMAGE_SELECTOR).forEach(watchImage);
        });
      });
    });

    observer.observe(document.body, {
      attributeFilter: ["src", "srcset"],
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
