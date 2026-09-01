import { MdxBody } from "@/components/ui/mdx-body";

export function LegalPage({
  title,
  source,
}: {
  title: string;
  source: string;
}) {
  const body = source.replace(/^# .+\n+/, "");

  return (
    <main className="legal-page">
      <section className="section inner-hero legal-hero">
        <div className="container">
          <div className="inner-title-wrap inner-hero">
            <div className="inner-title-box">
              <h1 className="hero-white-title">
                {title}
                <span className="italic none">Interior Blinds &amp; Shutters</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="visual-wrap">
          <img
            alt="Interior window furnishings"
            className="visual legal-hero-image"
            loading="eager"
            src="/assets/about%20pic%20folder/story-light.webp"
          />
          <div className="visual-overlay" />
        </div>
      </section>

      <section className="section legal-document-section">
        <div className="container">
          <div className="legal-document-grid">
            <aside className="legal-document-meta reveal">
              <span className="legal-document-label">Legal</span>
              <strong>{title}</strong>
              <span>Last updated<br />14 August 2026</span>
              <a href="/contact-us">
                Questions? Contact us ↗
              </a>
            </aside>
            <MdxBody source={body} className="legal-content richtext reveal" />
          </div>
        </div>
      </section>
    </main>
  );
}
