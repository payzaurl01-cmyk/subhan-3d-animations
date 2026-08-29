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
    const watchImage = (image: HTMLImageElement) => {
      if (!image.matches(CONTENT_IMAGE_SELECTOR)) return;

      image.classList.remove("app-image-loaded");

      if (image.complete) {
        image.classList.remove("app-image-loading");
        return;
      }

      image.classList.add("app-image-loading");

      const finishLoading = () => {
        image.classList.remove("app-image-loading");
        image.classList.add("app-image-loaded");
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
