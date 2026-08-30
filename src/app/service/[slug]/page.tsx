import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getService, getServices } from "@/lib/content";
import { MdxBody } from "@/components/ui/mdx-body";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    openGraph: { title: service.title, images: [service.detailsImage] },
  };
}

// Nuvora template — service detail. Layout mirrors the original design; the two
// rich-text bodies are Markdown (src/content/services/<slug>.mdx).
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="section single">
        <div className="container">
          <div className="single-hero-wrap service">
            <div className="animation-content-wrap">
              <div className="animation-content">
                <h1 className="single-title">{service.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section full-padding-bottom">
        <div className="container">
          <div className="service-details-image-box">
            <Image alt="" className="return-image" height={1000} priority quality={76} sizes="100vw" src={service.detailsImage} width={1600} />
            <div className="dashbord-image-overlay" />
          </div>
          <div className="service-post-box reveal">
            <MdxBody source={service.body} className="service-post richtext" />
          </div>
          {service.choose.length ? (
            <div className="service-single-background reveal">
              <div className="blog-single-choose-wrap">
                <h2 className="choose-title reveal">{service.chooseTitle}</h2>
                <div className="choose-box">
                  {service.choose.map((c) => (
                    <div className="choose-card-wrap" key={c.n}>
                      <div className="choose-number-box">
                        <h3 className="choose-number">{c.n}</h3>
                      </div>
                      <div className="choose-content-box">
                        <h3 className="choose-card-number">{c.title}</h3>
                        <div className="secondary-text-regular">{c.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {service.postTwo ? (
            <div className="service-post-box reveal">
              <MdxBody source={service.postTwo} className="service-post-two richtext" />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
