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
  { title: "Soft Light Curtains", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/WhatsApp%20Image%202026-08-20%20at%2012.55.46.optimized.webp", video: PROJECT_VIDEOS[1].src, shape: "landscape" },
  { title: "Light Filtering Roller Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/Light%20filtering%20roller%20blinds.optimized.webp", video: PROJECT_VIDEOS[2].src, shape: "landscape" },
  { title: "PVC Plantation Shutters", location: "Sydney, NSW", category: "Shutters", image: "/assets/categories/Shutters/pvc%20plantataion%20shutters%202.optimized.webp", video: PROJECT_VIDEOS[0].src, shape: "tall" },
  { title: "Tailored Curtain Finish", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/WhatsApp%20Image%202026-08-20%20at%2012.55.47%20(1).optimized.webp", video: PROJECT_VIDEOS[3].src, shape: "portrait" },
  { title: "Modern Flyscreen", location: "Sydney, NSW", category: "Flyscreens", image: "/assets/categories/Flyscreens/flyscreen.optimized.webp", video: PROJECT_VIDEOS[4].src, shape: "landscape" },
  { title: "Acoustic Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/Acoustic.optimized.webp", shape: "portrait" },
  { title: "Cassette Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/cassette%20blinds.optimized.webp", shape: "tall" },
  { title: "Cassette Blinds Detail", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/cassette%20blinds%202.optimized.webp", shape: "portrait" },
  { title: "Double Roller Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/double%20roller%20blinds.optimized.webp", shape: "landscape" },
  { title: "Sliding Door Roller Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/sliding%20door%20roller%20blinds.optimized.webp", shape: "tall" },
  { title: "Sliding Door Blinds Detail", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/sliding%20door%20roller%20blinds%202.optimized.webp", shape: "portrait" },
  { title: "Venetian Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/venatation%20blinds.optimized.webp", shape: "portrait" },
  { title: "Vertical Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/vertical%20blinds.optimized.webp", shape: "tall" },
  { title: "Zebra Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/zebra%20blinds.optimized.webp", shape: "landscape" },
  { title: "Custom Blinds Installation", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/WhatsApp%20Image%202026-08-20%20at%2012.55.49%20(1).optimized.webp", shape: "portrait" },
  { title: "Contemporary Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/WhatsApp%20Image%202026-08-20%20at%2016.32.48.optimized.webp", shape: "tall" },
  { title: "Made-to-Measure Blinds", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/WhatsApp%20Image%202026-08-20%20at%2016.32.49.optimized.webp", shape: "portrait" },
  { title: "Blinds Installation Detail", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/WhatsApp%20Image%202026-08-20%20at%2016.32.49%20(1).optimized.webp", shape: "portrait" },
  { title: "Complete Blinds Finish", location: "Sydney, NSW", category: "Blinds", image: "/assets/categories/Blinds/WhatsApp%20Image%202026-08-20%20at%2016.32.49%20(2).optimized.webp", shape: "tall" },
  { title: "Elegant Curtains", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/WhatsApp%20Image%202026-08-20%20at%2012.55.47.optimized.webp", shape: "portrait" },
  { title: "Curtain Installation", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/WhatsApp%20Image%202026-08-20%20at%2012.55.49.optimized.webp", shape: "tall" },
  { title: "Floor-to-Ceiling Curtains", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/WhatsApp%20Image%202026-08-20%20at%2012.55.50.optimized.webp", shape: "landscape" },
  { title: "Layered Curtain Finish", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/WhatsApp%20Image%202026-08-20%20at%2012.55.50%20(1).optimized.webp", shape: "portrait" },
  { title: "Custom Curtain Project", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/WhatsApp%20Image%202026-08-21%20at%2001.55.39.optimized.webp", shape: "tall" },
  { title: "Blockout Curtains", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/blockout%20curtains%202.optimized.webp", shape: "portrait" },
  { title: "Blockout Curtain Detail", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/blockout%20curtains%202.webp", shape: "landscape" },
  { title: "Curved Curtains", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/curvers%202.optimized.webp", shape: "tall" },
  { title: "Sheer Curtains", location: "Sydney, NSW", category: "Curtains", image: "/assets/categories/Curtains/sheer%20curtains%202.optimized.webp", shape: "portrait" },
  { title: "Flyscreens Detail", location: "Sydney, NSW", category: "Flyscreens", image: "/assets/categories/Flyscreens/flyscreen%202.optimized.webp", shape: "tall" },
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
      preload="none"
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
