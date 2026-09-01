"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProductDetail = {
  name: string;
  short: string;
  description: string;
  features: string[];
  image?: string;
  imageAlt?: string;
};

type Product = ProductDetail & {
  slug: string;
  image: string;
  imageAlt: string;
};

type Category = {
  id: string;
  label: string;
  headline: string;
  script: string;
  intro: string;
  typeLabel: string;
  secondaryType?: {
    label: string;
    options: ProductDetail[];
  };
  products: Product[];
};

const CATEGORIES: Category[] = [
  {
    id: "blinds",
    label: "Blinds",
    headline: "Blinds, precisely fitted.",
    script: "Clean lines, easy control and comfort made for daily life.",
    intro: "Made-to-measure blinds balance privacy, glare and natural light in a streamlined design. Choose the fabric and operation that works with your room.",
    typeLabel: "Blind Type",
    products: [
      {
        slug: "roller-blinds",
        name: "Roller Blinds",
        short: "Maximum light control",
        description: "Roller blinds offer dependable privacy and room darkening in a clean, compact design made precisely for your windows.",
        image: "https://i.postimg.cc/jSx3zPx6/roller-blinds-blockout-2.png",
        imageAlt: "Blockout roller blinds fitted to a contemporary window",
        features: ["Excellent room darkening", "Clean minimal profile", "Wide fabric selection", "Manual or motorised control"],
      },
      {
        slug: "light-filtering",
        name: "Light Filter Roller Blinds",
        short: "Soft diffused daylight",
        description: "Light-filtering fabrics soften harsh daylight and reduce glare while keeping your interior bright, balanced and comfortable.",
        image: "https://i.postimg.cc/DydYJBTf/Light-filtering-roller-blinds.png",
        imageAlt: "Light filtering roller blinds diffusing daylight",
        features: ["Softens direct sunlight", "Reduces daytime glare", "Maintains a bright interior", "Made to your measurements"],
      },
      {
        slug: "motorised-roller-blinds",
        name: "Motorised Roller Blinds",
        short: "Smart everyday ease",
        description: "Motorised roller blinds provide smooth, precise control for single windows or connected spaces, all with a refined cord-free finish.",
        image: "https://i.postimg.cc/FH74v2My/motorised-roller-blinds.png",
        imageAlt: "Motorised roller blind in a refined living space",
        features: ["Quiet powered movement", "Remote and smart control", "Safe cord-free design", "Perfect for hard-to-reach windows"],
      },
      {
        slug: "vertical-blinds",
        name: "Vertical Blinds",
        short: "Ideal for wide openings",
        description: "Vertical blinds glide neatly across large windows and doors, with rotating vanes that make privacy and light simple to adjust.",
        image: "https://i.postimg.cc/dtmSk4YR/vertical-blinds-2.png",
        imageAlt: "Vertical blinds installed across a wide glass door",
        features: ["Designed for wide windows", "Adjustable rotating vanes", "Smooth easy-glide operation", "Durable fabric choices"],
      },
      {
        slug: "zebra-blinds",
        name: "Zebra Blinds",
        short: "Layered light control",
        description: "Alternating sheer and solid panels align to move naturally between filtered light and greater privacy in one contemporary blind.",
        image: "https://i.postimg.cc/Cxhrjkhj/zebra-blinds.png",
        imageAlt: "Zebra blind with alternating sheer and solid fabric panels",
        features: ["Flexible privacy control", "Contemporary layered design", "Filtered or screened light", "Multiple colours and textures"],
      },
      {
        slug: "venetian-blinds",
        name: "Venetian Blinds",
        short: "Classic adjustable slats",
        description: "Crisp horizontal slats tilt with precision, letting you direct daylight, preserve privacy and create a timeless architectural finish.",
        image: "https://i.postimg.cc/GmZj2yf1/venatation-blinds.png",
        imageAlt: "Venetian blinds with adjustable horizontal slats",
        features: ["Precise light direction", "Simple privacy adjustment", "Timeless clean lines", "Easy-care finish options"],
      },
      {
        slug: "double-roller-blinds",
        name: "Double Blinds",
        short: "Day and night layers",
        description: "Two blinds share one neat system: a light-filtering layer for daytime and a blockout layer for privacy after dark.",
        image: "https://i.postimg.cc/65CnqHFV/double-roller-blinds.png",
        imageAlt: "Double roller blinds combining light filtering and blockout layers",
        features: ["Two fabrics, one system", "Day-to-night flexibility", "Compact dual brackets", "Independent layer control"],
      },
    ],
  },
  {
    id: "curtains",
    label: "Curtains",
    headline: "Curtains, beautifully made.",
    script: "Softness, privacy and a finish that feels like home.",
    intro: "Designer curtains and draperies crafted for every room and style. From softly filtered daylight to complete privacy, every finish is made to measure.",
    typeLabel: "Fabric Type",
    secondaryType: {
      label: "Stitching Type",
      options: [
        {
          name: "S Wave",
          short: "Soft, even folds",
          description: "S Wave stitching creates smooth, continuous folds that hang evenly from the track for a relaxed and contemporary curtain finish.",
          features: ["Consistent flowing folds", "Clean modern appearance", "Glides smoothly on its track", "Ideal for full-height curtains"],
          image: "/assets/products/sheer-curtains.webp",
          imageAlt: "Curtains with soft, even S Wave folds",
        },
        {
          name: "Pinch Pleated",
          short: "Tailored structured folds",
          description: "Pinch pleated stitching gathers the fabric into precise, structured folds for a polished look with timeless tailored character.",
          features: ["Elegant structured heading", "Full tailored appearance", "Works with tracks or rods", "Suited to classic interiors"],
          image: "/assets/products/blockout-curtains.webp",
          imageAlt: "Curtains with a tailored pinch pleated heading",
        },
      ],
    },
    products: [
      {
        slug: "sheer-curtains",
        name: "Sheer Curtains",
        short: "Soft filtered light",
        description: "Lightweight sheers gently filter daylight while maintaining privacy, creating an airy, welcoming atmosphere that softens every room.",
        image: "https://i.postimg.cc/ncYwj0JZ/sheer-curtains-2.png",
        imageAlt: "Full-height sheer curtains filtering natural light in a living room",
        features: ["Gently filters daylight", "Maintains daytime privacy", "Creates an airy, open feel", "Custom made for your room"],
      },
      {
        slug: "blockout-curtains",
        name: "Blockout Curtains",
        short: "Privacy and darkness",
        description: "Tailored blockout curtains create a calm, private retreat with stronger light control and an elegant floor-to-ceiling finish.",
        image: "https://i.postimg.cc/jdrFSBGS/blockout-curtains-2.png",
        imageAlt: "Elegant blockout curtains installed in a contemporary bedroom",
        features: ["Strong room darkening", "Enhanced privacy", "Helps insulate your space", "Tailored headings and finishes"],
      },
      {
        slug: "motorised-blockout-curtains",
        name: "Motorised Blockout Curtains",
        short: "Effortless smart control",
        description: "Quiet motorised blockout curtains bring comfort and control to wide windows, high openings and everyday routines—with no visible cords.",
        image: "https://i.postimg.cc/x1SC1jPv/motorised-blockout-curtains.png",
        imageAlt: "Motorised blockout curtains in a modern interior",
        features: ["Smooth, quiet operation", "Cord-free appearance", "Remote and smart options", "Ideal for wide openings"],
      },
      {
        slug: "acoustic-curtains",
        name: "Acoustic Curtains",
        short: "Softer sound and comfort",
        description: "Dense acoustic curtains help soften echoes and outside noise while adding privacy, warmth and a full tailored finish.",
        image: "https://i.postimg.cc/DZ08sCHZ/Chat-GPT-Image-Aug-22-2026-07-11-31-PM.png",
        imageAlt: "Full-height acoustic curtains in a contemporary room",
        features: ["Helps soften room echo", "Improves privacy", "Adds thermal comfort", "Tailored to your opening"],
      },
      {
        slug: "luxx-shades",
        name: "Luxx Shades",
        short: "A refined soft finish",
        description: "Luxx shades bring a smooth, flowing silhouette to feature windows with flexible privacy and a polished custom finish.",
        image: "https://i.postimg.cc/wTdGjnSd/curvers-1.jpg",
        imageAlt: "Luxx shades fitted to a curved feature window",
        features: ["Soft architectural shape", "Flexible privacy control", "Made for unique spaces", "Professional measurement and fit"],
      },
    ],
  },
  {
    id: "plantation-shutters",
    label: "Shutters",
    headline: "Shutters, timelessly refined.",
    script: "Architectural character with privacy in every tilt.",
    intro: "Plantation shutters frame the window with crisp lines and lasting character, offering simple control over daylight, airflow and privacy.",
    typeLabel: "Shutter Type",
    secondaryType: {
      label: "Blade Type",
      options: [
        {
          name: "Classic",
          short: "Timeless adjustable louvres",
          description: "Classic shutter blades provide a balanced, timeless profile with simple tilt control for privacy, daylight and airflow.",
          features: ["Timeless louvre profile", "Easy light adjustment", "Flexible privacy control", "Clean architectural finish"],
          image: "/assets/products/plantation-shutters.webp",
          imageAlt: "Classic plantation shutter blades",
        },
      ],
    },
    products: [
      {
        slug: "pvc-plantation-shutters",
        name: "PVC Plantation Shutters",
        short: "Durable timeless style",
        description: "Our most popular shutter range. PVC plantation shutters are moisture-resistant and low-maintenance, making them ideal for bathrooms, kitchens, laundries and living areas.",
        image: "https://i.postimg.cc/28fKSgPC/pvc-plantataion-shutters-2.png",
        imageAlt: "White PVC plantation shutters in a bright room",
        features: ["100% waterproof", "Won't warp, crack, swell or fade", "UV stabilised and won't yellow", "Custom made for your exact windows"],
      },
    ],
  },
  {
    id: "flyscreens",
    label: "Flyscreens",
    headline: "Fresh air, beautifully screened.",
    script: "Open your home to the breeze, not unwanted guests.",
    intro: "Made-to-measure flyscreens protect windows and doors with durable mesh, discreet framing and smooth everyday operation.",
    typeLabel: "Flyscreen Type",
    products: [
      {
        slug: "flyscreens",
        name: "Fiber Mesh",
        short: "Fresh air, fewer insects",
        description: "A low-profile, durable screen lets fresh air move through your home while helping keep insects outside and sightlines clear.",
        image: "https://i.postimg.cc/nctPhN6x/flyscreen.jpg",
        imageAlt: "Fiber mesh flyscreen fitted to a wide opening",
        features: ["Fresh airflow with protection", "Durable easy-care mesh", "Low-profile frame options", "Made for windows and doors"],
      },
    ],
  },
];

function findInitialSelection(slug?: string) {
  for (let categoryIndex = 0; categoryIndex < CATEGORIES.length; categoryIndex += 1) {
    const productIndex = CATEGORIES[categoryIndex].products.findIndex((product) => product.slug === slug);
    if (productIndex >= 0) return { categoryIndex, productIndex };
  }
  return { categoryIndex: 0, productIndex: 0 };
}

export default function ProductExplorer({ initialProduct }: { initialProduct?: string }) {
  const initial = useMemo(() => findInitialSelection(initialProduct), [initialProduct]);
  const [categoryIndex, setCategoryIndex] = useState(initial.categoryIndex);
  const [productIndex, setProductIndex] = useState(initial.productIndex);
  const [secondaryIndex, setSecondaryIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<"primary" | "secondary">("primary");
  const category = CATEGORIES[categoryIndex];
  const product = category.products[productIndex];
  const secondaryProduct = category.secondaryType?.options[secondaryIndex];
  const selectedProduct = selectedType === "secondary" && secondaryProduct ? secondaryProduct : product;
  const selectedImage = selectedProduct.image ?? product.image;
  const selectedImageAlt = selectedProduct.imageAlt ?? product.imageAlt;

  const updateUrl = (slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("product", slug);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const selectCategory = (nextCategoryIndex: number) => {
    const firstProduct = CATEGORIES[nextCategoryIndex].products[0];
    setCategoryIndex(nextCategoryIndex);
    setProductIndex(0);
    setSecondaryIndex(0);
    setSelectedType("primary");
    updateUrl(firstProduct.slug);
  };

  const selectProduct = (nextProductIndex: number) => {
    setProductIndex(nextProductIndex);
    setSelectedType("primary");
    updateUrl(category.products[nextProductIndex].slug);
  };

  const selectSecondaryProduct = (nextSecondaryIndex: number) => {
    setSecondaryIndex(nextSecondaryIndex);
    setSelectedType("secondary");
  };

  return (
    <>
      <section className="product-showcase-hero" aria-labelledby="products-heading">
        <div className="container product-showcase-hero-inner">
          <p className="product-showcase-breadcrumb">Products <span>/</span> {category.label}</p>
          <h1 id="products-heading" key={category.headline}>{category.headline}</h1>
          <p className="product-showcase-script" key={category.script}>{category.script}</p>
        </div>
      </section>

      <section className="product-showcase-shell" aria-label="Explore our products">
        <div className="container">
          <div className="product-category-tabs" role="tablist" aria-label="Product categories">
            {CATEGORIES.map((item, index) => (
              <button
                aria-controls="product-selection-panel"
                aria-selected={index === categoryIndex}
                className={index === categoryIndex ? "is-active" : ""}
                id={`category-tab-${item.id}`}
                key={item.id}
                onClick={() => selectCategory(index)}
                role="tab"
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            aria-labelledby={`category-tab-${category.id}`}
            className="product-selection-panel"
            id="product-selection-panel"
            role="tabpanel"
          >
            <div className="product-showcase-media" key={selectedImage}>
              <Image
                alt={selectedImageAlt}
                fill
                priority
                quality={74}
                sizes="(max-width: 991px) 100vw, 52vw"
                src={selectedImage}
              />
              <div className="product-image-badge"><span>Made</span> to measure</div>
            </div>

            <div className="product-showcase-content" key={`${category.id}-${product.slug}`}>
              <div className="product-panel-intro">
                <span className="product-panel-number">{String(categoryIndex + 1).padStart(2, "0")}</span>
                <div>
                  <p className="product-panel-eyebrow">Our {category.label}</p>
                  <h2>{category.label}</h2>
                  <p>{category.intro}</p>
                </div>
              </div>

              <div className="product-type-wrap">
                <p className="product-control-label product-type-heading">{category.typeLabel}</p>
                <div className={`product-type-grid${category.products.length <= 2 ? " is-compact" : ""}`} role="tablist" aria-label={`${category.label} styles`}>
                  {category.products.map((item, index) => (
                    <button
                      aria-selected={index === productIndex}
                      className={selectedType === "primary" && index === productIndex ? "is-active" : ""}
                      key={item.slug}
                      onClick={() => selectProduct(index)}
                      role="tab"
                      type="button"
                    >
                      <strong>{item.name}</strong>
                      <span>{item.short}</span>
                    </button>
                  ))}
                </div>

                {category.secondaryType ? (
                  <div className="product-secondary-type">
                    <p className="product-control-label product-type-heading">{category.secondaryType.label}</p>
                    <div className="product-type-grid" role="tablist" aria-label={`${category.secondaryType.label} options`}>
                      {category.secondaryType.options.map((option, index) => (
                        <button
                          aria-selected={selectedType === "secondary" && index === secondaryIndex}
                          className={selectedType === "secondary" && index === secondaryIndex ? "is-active" : ""}
                          key={option.name}
                          onClick={() => selectSecondaryProduct(index)}
                          role="tab"
                          type="button"
                        >
                          <strong>{option.name}</strong>
                          <span>{option.short}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <article className="product-detail-card" aria-live="polite">
                <p className="product-detail-kicker">Selected type</p>
                <h3>{selectedProduct.name}</h3>
                <p className="product-detail-description">{selectedProduct.description}</p>
                <ul>
                  {selectedProduct.features.map((feature) => (
                    <li key={feature}>
                      <svg aria-hidden="true" viewBox="0 0 20 20"><path d="m5 10.3 3.1 3.1L15.5 6" /></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>

              <div className="product-showcase-actions">
                <a className="product-primary-cta" href="/contact-us">
                  Book a free measure
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a className="product-text-cta" href="/contact-us">
                  View fabrics &amp; colours <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
