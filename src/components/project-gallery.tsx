"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECT_VIDEOS } from "@/components/project-video-slider";

type Category = "Blinds" | "Curtains" | "Shutters" | "Flyscreens";

type GalleryProject = {
  title: string;
  location: string;
  category: Category;
  image: string;
  video?: string;
  shape: "portrait" | "landscape" | "tall";
};

const projects: GalleryProject[] = [
  { title: "Soft Light Living", location: "Sydney, NSW", category: "Curtains", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.47.jpeg", video: PROJECT_VIDEOS[1].src, shape: "landscape" },
  { title: "Tailored Corner Finish", location: "North Sydney, NSW", category: "Blinds", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.52%20(1).jpeg", video: PROJECT_VIDEOS[2].src, shape: "landscape" },
  { title: "Floor-to-Ceiling Privacy", location: "Parramatta, NSW", category: "Curtains", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.52.jpeg", shape: "tall" },
  { title: "Calm Bedroom Retreat", location: "Chatswood, NSW", category: "Blinds", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.53.jpeg", shape: "portrait" },
  { title: "Clean Architectural Lines", location: "Ryde, NSW", category: "Shutters", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.54%20(2).jpeg", video: PROJECT_VIDEOS[0].src, shape: "tall" },
  { title: "Warm Neutral Layers", location: "Penrith, NSW", category: "Curtains", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.54.jpeg", video: PROJECT_VIDEOS[3].src, shape: "portrait" },
  { title: "Effortless Light Control", location: "Castle Hill, NSW", category: "Shutters", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.55%20(1).jpeg", shape: "tall" },
  { title: "Private Family Living", location: "Kellyville, NSW", category: "Blinds", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.55%20(2).jpeg", shape: "portrait" },
  { title: "A Softer Outlook", location: "Hills District, NSW", category: "Curtains", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2012.55.55.jpeg", shape: "portrait" },
  { title: "Modern Window Detail", location: "Blacktown, NSW", category: "Blinds", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2016.32.48.jpeg", shape: "tall" },
  { title: "Quiet Comfort", location: "Baulkham Hills, NSW", category: "Shutters", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2016.32.49%20(1).jpeg", shape: "portrait" },
  { title: "Layered Daylight", location: "Wentworthville, NSW", category: "Curtains", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2016.32.49%20(2).jpeg", shape: "portrait" },
  { title: "Made for the Room", location: "Western Sydney, NSW", category: "Blinds", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2016.32.49.jpeg", shape: "tall" },
  { title: "Open-Plan Elegance", location: "Sydney, NSW", category: "Curtains", image: "/assets/projects%20images/WhatsApp%20Image%202026-08-20%20at%2016.32.50.jpeg", video: PROJECT_VIDEOS[4].src, shape: "landscape" },
  { title: "Motorised Bedroom Blinds", location: "Sydney, NSW", category: "Shutters", image: "/assets/styled-windows/motorised-blinds.webp", shape: "tall" },
  { title: "Cooler, Calmer Rooms", location: "Sydney, NSW", category: "Flyscreens", image: "/assets/styled-windows/cooler-rooms.webp", shape: "tall" },
  { title: "Privacy, Beautifully Done", location: "Sydney, NSW", category: "Flyscreens", image: "/assets/styled-windows/more-privacy.webp", shape: "tall" },
  { title: "Balanced Natural Light", location: "Sydney, NSW", category: "Flyscreens", image: "/assets/styled-windows/better-light-control.webp", shape: "tall" },
  { title: "A Complete Window Story", location: "Sydney, NSW", category: "Flyscreens", image: "/assets/styled-windows/background.webp", shape: "landscape" },
];

const categories = ["All", "Blinds", "Curtains", "Shutters", "Flyscreens"] as const;

function ProjectCardVideo({ project }: { project: GalleryProject }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      aria-label={`${project.title} window furnishing installation`}
      className="all-projects-image all-projects-video"
      loop
      muted
      playsInline
      poster={project.image}
      preload="metadata"
      ref={videoRef}
      src={project.video}
    />
  );
}

export function ProjectGallery() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const visibleProjects = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active],
  );

  const countFor = (category: (typeof categories)[number]) =>
    category === "All" ? projects.length : projects.filter((project) => project.category === category).length;

  return (
    <>
      <div aria-label="Filter projects" className="all-projects-filters" role="group">
        {categories.map((category) => (
          <button
            aria-pressed={active === category}
            className="all-projects-filter"
            key={category}
            onClick={() => setActive(category)}
            type="button"
          >
            <span>{category}</span>
            <small>{countFor(category)}</small>
          </button>
        ))}
      </div>

      <div className="all-projects-grid">
        {visibleProjects.map((project) => (
          <article className={`all-projects-card is-${project.shape}`} key={project.image}>
            <div className="all-projects-image-wrap">
              {project.video ? (
                <ProjectCardVideo project={project} />
              ) : (
                <Image
                  alt={`${project.title} window furnishing installation`}
                  className="all-projects-image"
                  fill
                  quality={76}
                  sizes="(max-width: 640px) 100vw, (max-width: 991px) 50vw, 33vw"
                  src={project.image}
                />
              )}
              <span className="all-projects-category">{project.category}</span>
              <span aria-hidden="true" className="all-projects-arrow">↗</span>
            </div>
            <div className="all-projects-card-copy">
              <h2>{project.title}</h2>
              <p>{project.location}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
