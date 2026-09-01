import type { Metadata } from "next";
import Image from "next/image";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Window Furnishing Guides",
  description:
    "Practical guides for choosing blinds, curtains and shutters for better light, privacy and comfort.",
};

const CATEGORIES = [
  { label: "All guides", filter: "all" },
  { label: "Blinds", filter: "blinds" },
  { label: "Curtains", filter: "curtains" },
  { label: "Shutters", filter: "shutters" },
  { label: "Smart living", filter: "smart" },
];

export default function BlogPage() {
  const posts = getBlogPosts();
  const featuredPost = posts[0];

  return (
    <main className="guides-page">
      <section className="guides-hero" aria-labelledby="guides-title">
        <div className="guides-shell guides-hero-grid">
          <div className="guides-hero-content">
            <p className="guides-eyebrow">INTERIOR BLINDS &amp; SHUTTERS JOURNAL</p>
            <h1 id="guides-title" className="hero-white-title home-hero-title">
              Better light starts with
              <em>better choices.</em>
            </h1>
            <p className="guides-hero-copy">
              Clear, practical advice to help you choose window furnishings that
              feel right, perform beautifully and suit the way you live.
            </p>
            <a className="guides-hero-link" href="#all-guides">
              Explore the guides <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="guides-hero-media">
            <Image
              alt="Soft daylight filtering through beautifully fitted window furnishings"
              fill
              priority
              quality={76}
              sizes="(max-width: 767px) 100vw, 48vw"
              src="/assets/styled-windows/background.webp"
            />
            <div className="guides-hero-note">
              <span>01</span>
              <p>Advice for brighter, calmer and more comfortable rooms.</p>
            </div>
          </div>
        </div>
      </section>

      {featuredPost ? (
        <section className="guides-featured">
          <div className="guides-shell">
            <a className="guides-featured-card reveal" href={`/blog/${featuredPost.slug}`}>
              <div className="guides-featured-image">
                <Image alt={featuredPost.title} height={1000} quality={74} sizes="(max-width: 767px) 100vw, 62vw" src={featuredPost.heroImage} width={1400} />
              </div>
              <div className="guides-featured-content">
                <p className="guides-card-category">FEATURED GUIDE · {featuredPost.readTime}</p>
                <h2>{featuredPost.title}</h2>
                <p>
                  Start with the room, the direction of the light and the comfort you
                  want—then choose the finish that brings it all together.
                </p>
                <span className="guides-read-link">Read the guide <b aria-hidden="true">↗</b></span>
              </div>
            </a>
          </div>
        </section>
      ) : null}

      <section className="guides-library" id="all-guides" aria-labelledby="all-guides-title">
        <div className="guides-shell">
          <div className="guides-library-heading reveal">
            <div>
              <p className="guides-eyebrow">PRACTICAL ADVICE, MADE SIMPLE</p>
              <h2 id="all-guides-title">Guides for every window.</h2>
            </div>
            <p>
              Compare materials, understand light control and plan your rooms with
              confidence before your free in-home measure.
            </p>
          </div>

          <div className="guides-filters reveal" aria-label="Filter guides">
            {CATEGORIES.map((category, index) => (
              <button
                className="catagory-button guides-filter"
                data-filter={category.filter}
                key={category.filter}
                type="button"
                {...(index === 0 ? { "aria-current": "page" as const } : {})}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="guides-grid" role="list">
            {posts.map((post, index) => (
              <article className="guides-card reveal" data-cat={post.category} key={post.slug} role="listitem">
                <a className="guides-card-image" href={`/blog/${post.slug}`}>
                  <Image alt={post.title} height={1100} loading="lazy" quality={72} sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" src={post.cardImage} width={900} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </a>
                <div className="guides-card-meta">
                  <span className="guides-card-category">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <a className="guides-read-link" href={`/blog/${post.slug}`}>
                  Read guide <b aria-hidden="true">↗</b>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guides-cta">
        <div className="guides-shell guides-cta-inner reveal">
          <div>
            <p className="guides-eyebrow">NEED ADVICE FOR YOUR HOME?</p>
            <h2 className="hero-white-title home-hero-title" >Let’s find the right fit.</h2>
          </div>
          <p>We’ll bring the samples, measure your windows and help you compare the best options in your space.</p>
          <a href="/contact-us">Book a free measure <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
