"use client";

import { useEffect, useRef, useState } from "react";

export const PROJECT_VIDEOS = [
  {
    src: "/assets/WhatsApp%20Video%202026-08-20%20at%2012.56.06.mp4",
    title: "Made-to-measure finish",
  },
  {
    src: "/assets/WhatsApp%20Video%202026-08-20%20at%2012.56.07.mp4",
    title: "Designed for the room",
  },
  {
    src: "/assets/WhatsApp%20Video%202026-08-21%20at%2002.54.22.mp4",
    title: "Precision installation",
  },
  {
    src: "/assets/WhatsApp%20Video%202026-08-21%20at%2002.54.22%20%281%29.mp4",
    title: "Light, privacy and comfort",
  },
  {
    src: "/assets/WhatsApp%20Video%202026-08-21%20at%2002.54.22%20%282%29.mp4",
    title: "A beautifully finished space",
  },
] as const;

export function ProjectVideoSlider() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        });
      },
      { root: viewport, threshold: 0.35 },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let previousTime = performance.now();

    const move = (time: number) => {
      const elapsed = Math.min(time - previousTime, 32);
      previousTime = time;
      viewport.scrollLeft += elapsed * 0.035;

      const loopPoint = viewport.scrollWidth / 2;
      if (viewport.scrollLeft >= loopPoint) viewport.scrollLeft -= loopPoint;

      frame = requestAnimationFrame(move);
    };

    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  function pauseForInteraction() {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsPaused(true);
  }

  function resumeAfterInteraction() {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), 1400);
  }

  return (
    <div aria-label="Installed project videos" className="project-video-slider reveal" role="region">
      <p className="project-video-hint">Swipe to explore <span aria-hidden="true">→</span></p>
      <div
        className="project-video-viewport"
        onMouseLeave={resumeAfterInteraction}
        onMouseMove={pauseForInteraction}
        onPointerDown={pauseForInteraction}
        onPointerUp={resumeAfterInteraction}
        ref={viewportRef}
      >
        <div className="project-video-track">
          {[0, 1].map((groupIndex) => (
            <div aria-hidden={groupIndex === 1} className="project-video-group" key={groupIndex}>
              {PROJECT_VIDEOS.map((project, index) => {
                const videoIndex = groupIndex * PROJECT_VIDEOS.length + index;

                return (
                  <article className="project-video-card" key={`${groupIndex}-${project.src}`}>
                    <video
                      aria-label={project.title}
                      autoPlay
                      className="project-video-media"
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      ref={(video) => {
                        videoRefs.current[videoIndex] = video;
                      }}
                      src={project.src}
                    />
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
