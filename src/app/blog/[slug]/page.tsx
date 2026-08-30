import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { MdxBody } from "@/components/ui/mdx-body";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.conclusion || post.title,
    openGraph: { title: post.title, images: [post.heroImage], type: "article" },
  };
}

// Nuvora template — blog detail. Layout mirrors the original design; the article
// body is Markdown (src/content/blog/<slug>.mdx) rendered inside `.blog-post richtext`.
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <section className="section blog-single">
        <div className="container">
          <div className="blog-single-hero-wrap">
            <div className="blog-single-hero-title-box">
              <div className="animation-content-wrap">
                <div className="animation-content">
                  <div className="title-flex">
                    <h1 className="blog-single-title">{post.title}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-single-hero-button-box">
              <div className="animation-content-wrap">
                <div className="animation-content">
                  <div className="title-flex">
                    <a className="primary-button inline-block" href="/contact">
                      <div className="primary-button-text-wrap">
                        <div className="primary-button-text">GET IN TOUCH</div>
                        <div className="primary-button-hover-text">GET IN TOUCH</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="animation-content-wrap">
            <div className="animation-content">
              <div className="blog-single-author-flex">
                <div className="blog-single-author-box">
                  <div className="secondary-text-regular">Published Date</div>
                  <h2 className="blog-single-author-content">{post.date}</h2>
                </div>
                <div className="blog-single-author-box">
                  <div className="secondary-text-regular">Author Name</div>
                  <h2 className="blog-single-author-content">{post.author}</h2>
                </div>
                <div className="blog-single-author-box">
                  <div className="secondary-text-regular">Estimate Time</div>
                  <h2 className="blog-single-author-content">{post.readTime}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section blog-single-inner">
        <div className="container">
          <div className="blog-single-image-box">
            <Image alt="" className="return-image" height={1000} priority quality={76} sizes="100vw" src={post.heroImage} width={1600} />
            <div className="dashbord-image-overlay" />
          </div>
          <div className="blog-post-wrap">
            <MdxBody source={post.body} className="blog-post richtext reveal" />
          </div>
          {post.commonImage ? (
            <div className="blog-single-common-image-box">
              <Image alt="" className="return-image" height={1000} loading="lazy" quality={74} sizes="100vw" src={post.commonImage} width={1600} />
              <div className="dashbord-image-overlay" />
            </div>
          ) : null}
          <div className="conclusion-box">
            <h3 className="conclusion-title reveal">{post.conclusionTitle}</h3>
            <p className="primary-text reveal">{post.conclusion}</p>
          </div>
        </div>
      </section>
    </>
  );
}
