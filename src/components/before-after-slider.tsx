"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderStyle = { "--slider-position": `${position}%` } as CSSProperties;

  return (
    <div
      className={`all-projects-feature-images before-after-slider${isDragging ? " is-dragging" : ""}`}
      style={sliderStyle}
    >
      <Image
        alt="Australian living room before sheer curtain installation"
        className="before-after-image"
        fill
        priority
        quality={82}
        sizes="(max-width: 991px) 100vw, 58vw"
        src="/assets/project-feature/australian-home-before.png"
      />

      <div className="before-after-layer">
        <Image
          alt="Australian living room after sheer curtain installation"
          className="before-after-image"
          fill
          priority
          quality={82}
          sizes="(max-width: 991px) 100vw, 58vw"
          src="/assets/project-feature/australian-home-after.png"
        />
      </div>

      <span className="before-after-label is-before">Before</span>
      <span className="before-after-label is-after">After</span>

      <input
        aria-label="Compare the room before and after sheer curtain installation"
        aria-valuetext={`${position}% before image visible`}
        className="before-after-range"
        max="100"
        min="0"
        onBlur={() => setIsDragging(false)}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
        onPointerCancel={() => setIsDragging(false)}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        type="range"
        value={position}
      />

      <div aria-hidden="true" className="before-after-divider">
        <span className="before-after-handle">
          <span>‹</span>
          <span>›</span>
        </span>
      </div>
    </div>
  );
}
