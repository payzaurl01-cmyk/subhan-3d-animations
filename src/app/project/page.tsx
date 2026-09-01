import type { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { ProjectGallery } from "@/components/project-gallery";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Explore our made-to-measure blinds, curtains, shutters and flyscreen installations across Sydney.",
};

export default function ProjectPage() {
  return (
    <main className="all-projects-page">
      <section className="all-projects-hero">
        <div className="all-projects-shell">
          <p className="all-projects-eyebrow">SYDNEY &amp; SURROUNDS</p>
          <h1 className="all-projects-title">
            Homes we’ve <em>transformed.</em>
          </h1>
          <div className="all-projects-intro-row">
            <p className="all-projects-intro">
              Every project is measured, made and installed by us. Explore considered window solutions created for real Sydney homes.
            </p>
            <div className="all-projects-stats" aria-label="Project highlights">
              <div><strong>600+</strong><span>INSTALLS COMPLETED</span></div>
              <div><strong>5★</strong><span>CUSTOMER RATING</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="all-projects-feature-wrap">
        <div className="all-projects-shell">
          <div className="all-projects-feature reveal">
            <div className="all-projects-feature-copy">
              <p>FEATURED INSTALLATION</p>
              <h2 className="hero-white-title "> Made for the way you live.</h2>
              <span>From soft filtered daylight to complete privacy, every detail is chosen to make the room feel calmer, more comfortable and beautifully finished.</span>
            </div>
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <section className="all-projects-gallery-section">
        <div className="all-projects-shell">
          <div className="all-projects-gallery-heading reveal">
            <p>OUR WORK</p>
            <h2>Browse every <em>installation.</em></h2>
          </div>
          <ProjectGallery />
          <section className="all-projects-reviews" aria-labelledby="project-reviews-title">
            <div className="all-projects-reviews-heading">
              <p>HOMEOWNER STORIES</p>
              <h2 className="hero-white-title" id="project-reviews-title">The best finish is a <em>happy home.</em></h2>
            </div>
            <div className="all-projects-review-grid">
              <article className="all-projects-review-card">
                <div className="all-projects-review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“The whole process felt effortless. The team helped us choose the right fabric, measured everything carefully and left every room beautifully finished.”</blockquote>
                <footer><strong>Amelia R.</strong><span>Sheer curtains · Sydney</span></footer>
              </article>
              <article className="all-projects-review-card is-featured">
                <div className="all-projects-review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“Our new blinds completely changed the light in the house. They look clean, work perfectly and the installation was exceptionally tidy.”</blockquote>
                <footer><strong>Michael T.</strong><span>Roller blinds · Castle Hill</span></footer>
              </article>
              <article className="all-projects-review-card">
                <div className="all-projects-review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“We finally have privacy without losing the natural light we love. Every detail feels considered and made for our home.”</blockquote>
                <footer><strong>Priya S.</strong><span>Layered curtains · Parramatta</span></footer>
              </article>
            </div>
          </section>
          <div className="all-projects-bottom-cta reveal">
            <p>Have a window in mind?</p>
            <a href="/contact-us">BOOK A FREE MEASURE &amp; QUOTE <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
