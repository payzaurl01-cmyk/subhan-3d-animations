"use client";

import { useMemo, useState } from "react";

type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
};

type Category = {
  id: string;
  label: string;
  headline: string;
  script: string;
  intro: string;
  products: Product[];
};

const CATEGORIES: Category[] = [
  {
    id: "curtains",
    label: "Curtains",
    headline: "Curtains, beautifully made.",
    script: "Softness, privacy and a finish that feels like home.",
    intro: "Designer curtains and draperies crafted for every room and style. From softly filtered daylight to complete privacy, every finish is made to measure.",
    products: [
      {
        slug: "sheer-curtains",
        name: "Sheer Curtains",
        short: "Soft filtered light",
        description: "Lightweight sheers gently filter daylight while maintaining privacy, creating an airy, welcoming atmosphere that softens every room.",
        image: "/assets/products/sheer-curtains.webp",
        imageAlt: "Full-height sheer curtains filtering natural light in a living room",
        features: ["Gently filters daylight", "Maintains daytime privacy", "Creates an airy, open feel", "Custom made for your room"],
      },
      {
        slug: "blockout-curtains",
        name: "Blockout Curtains",
        short: "Privacy and darkness",
        description: "Tailored blockout curtains create a calm, private retreat with stronger light control and an elegant floor-to-ceiling finish.",
        image: "/assets/products/blockout-curtains.webp",
        imageAlt: "Elegant blockout curtains installed in a contemporary bedroom",
        features: ["Strong room darkening", "Enhanced privacy", "Helps insulate your space", "Tailored headings and finishes"],
      },
      {
        slug: "motorised-blockout-curtains",
        name: "Motorised Curtains",
        short: "Effortless smart control",
        description: "Quiet motorised curtains bring comfort and control to wide windows, high openings and everyday routines—with no visible cords.",
        image: "/assets/products/motorised-blockout-curtains.webp",
        imageAlt: "Motorised blockout curtains in a modern interior",
        features: ["Smooth, quiet operation", "Cord-free appearance", "Remote and smart options", "Ideal for wide openings"],
      },
      {
        slug: "double-curtains",
        name: "Double Curtains",
        short: "Sheer and blockout layers",
        description: "A dual-track curtain pairs soft sheers with a blockout layer, giving you flexible daylight, privacy and comfort from morning to night.",
        image: "/assets/products/double-curtains.webp",
        imageAlt: "Layered sheer and blockout curtains on a double track",
        features: ["Two layers in one system", "Day-to-night privacy", "Flexible light control", "A full, luxurious finish"],
      },
    ],
  },
  {
    id: "roller-blinds",
    label: "Roller Blinds",
    headline: "Blinds, precisely fitted.",
    script: "Clean lines, easy control and comfort made for daily life.",
    intro: "Made-to-measure blinds balance privacy, glare and natural light in a streamlined design. Choose the fabric and operation that works with your room.",
    products: [
      {
        slug: "roller-blinds",
        name: "Blockout Roller Blinds",
        short: "Maximum light control",
        description: "Blockout roller blinds offer dependable privacy and room darkening in a clean, compact design made precisely for your windows.",
        image: "/assets/products/blockout-roller-blinds.webp",
        imageAlt: "Blockout roller blinds fitted to a contemporary window",
        features: ["Excellent room darkening", "Clean minimal profile", "Wide fabric selection", "Manual or motorised control"],
      },
      {
        slug: "light-filtering",
        name: "Light Filtering Blinds",
        short: "Soft diffused daylight",
        description: "Light-filtering fabrics soften harsh daylight and reduce glare while keeping your interior bright, balanced and comfortable.",
        image: "/assets/products/light-filtering-roller-blinds.webp",
        imageAlt: "Light filtering roller blinds diffusing daylight",
        features: ["Softens direct sunlight", "Reduces daytime glare", "Maintains a bright interior", "Made to your measurements"],
      },
      {
        slug: "motorised-roller-blinds",
        name: "Motorised Roller Blinds",
        short: "Smart everyday ease",
        description: "Motorised roller blinds provide smooth, precise control for single windows or connected spaces, all with a refined cord-free finish.",
        image: "/assets/products/motorised-roller-blinds.webp",
        imageAlt: "Motorised roller blind in a refined living space",
        features: ["Quiet powered movement", "Remote and smart control", "Safe cord-free design", "Perfect for hard-to-reach windows"],
      },
      {
        slug: "vertical-blinds",
        name: "Vertical Blinds",
        short: "Ideal for wide openings",
        description: "Vertical blinds glide neatly across large windows and doors, with rotating vanes that make privacy and light simple to adjust.",
        image: "/assets/products/vertical-blinds.webp",
        imageAlt: "Vertical blinds installed across a wide glass door",
        features: ["Designed for wide windows", "Adjustable rotating vanes", "Smooth easy-glide operation", "Durable fabric choices"],
      },
      {
        slug: "zebra-blinds",
        name: "Zebra Blinds",
        short: "Layered light control",
        description: "Alternating sheer and solid panels align to move naturally between filtered light and greater privacy in one contemporary blind.",
        image: "/assets/products/zebra-blinds.webp",
        imageAlt: "Zebra blind with alternating sheer and solid fabric panels",
        features: ["Flexible privacy control", "Contemporary layered design", "Filtered or screened light", "Multiple colours and textures"],
      },
      {
        slug: "venetian-blinds",
        name: "Venetian Blinds",
        short: "Classic adjustable slats",
        description: "Crisp horizontal slats tilt with precision, letting you direct daylight, preserve privacy and create a timeless architectural finish.",
        image: "/assets/products/venetian-blinds.webp",
        imageAlt: "Venetian blinds with adjustable horizontal slats",
        features: ["Precise light direction", "Simple privacy adjustment", "Timeless clean lines", "Easy-care finish options"],
      },
      {
        slug: "double-roller-blinds",
        name: "Double Roller Blinds",
        short: "Day and night layers",
        description: "Two blinds share one neat system: a light-filtering or sunscreen layer for daytime and a blockout layer for privacy after dark.",
        image: "/assets/products/double-roller-blinds.webp",
        imageAlt: "Double roller blinds combining light filtering and blockout layers",
        features: ["Two fabrics, one system", "Day-to-night flexibility", "Compact dual brackets", "Independent layer control"],
      },
    ],
  },
  {
    id: "plantation-shutters",
    label: "Plantation Shutters",
    headline: "Shutters, timelessly refined.",
    script: "Architectural character with privacy in every tilt.",
    intro: "Plantation shutters frame the window with crisp lines and lasting character, offering simple control over daylight, airflow and privacy.",
    products: [
      {
        slug: "pvc-plantation-shutters",
        name: "PVC Plantation Shutters",
        short: "Durable timeless style",
        description: "Moisture-resistant PVC shutters deliver a strong, easy-care finish with adjustable louvres for comfortable light, airflow and privacy.",
        image: "/assets/products/plantation-shutters.webp",
        imageAlt: "White PVC plantation shutters in a bright room",
        features: ["Moisture-resistant PVC", "Adjustable light and airflow", "Easy-clean surface", "Made for your exact opening"],
      },
    ],
  },
  {
    id: "curvers",
    label: "Curvers",
    headline: "Curves, beautifully considered.",
    script: "A softer silhouette shaped around your architecture.",
    intro: "Curvers are tailored for feature windows and considered interiors, bringing smooth coverage and an elegant flowing form to the room.",
    products: [
      {
        slug: "curvers",
        name: "Made-to-Measure Curvers",
        short: "Tailored architectural form",
        description: "A specialist curved solution follows the shape of your space for clean coverage, graceful movement and a truly custom finish.",
        image: "/assets/products/curvers.webp",
        imageAlt: "Curved full-height window furnishing in a contemporary interior",
        features: ["Tailored to unique spaces", "Smooth architectural form", "Flexible privacy control", "Professional measurement and fit"],
      },
    ],
  },
  {
    id: "flyscreens",
    label: "Flyscreens",
    headline: "Fresh air, beautifully screened.",
    script: "Open your home to the breeze, not unwanted guests.",
    intro: "Made-to-measure flyscreens protect windows and doors with durable mesh, discreet framing and smooth everyday operation.",
    products: [
      {
        slug: "flyscreens",
        name: "Custom Flyscreens",
        short: "Fresh air, fewer insects",
        description: "A low-profile, durable screen lets fresh air move through your home while helping keep insects outside and sightlines clear.",
        image: "/assets/products/flyscreens.webp",
        imageAlt: "Custom flyscreen fitted to a wide opening",
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
  const category = CATEGORIES[categoryIndex];
  const product = category.products[productIndex];

  const updateUrl = (slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("product", slug);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const selectCategory = (nextCategoryIndex: number) => {
    const firstProduct = CATEGORIES[nextCategoryIndex].products[0];
    setCategoryIndex(nextCategoryIndex);
    setProductIndex(0);
    updateUrl(firstProduct.slug);
  };

  const selectProduct = (nextProductIndex: number) => {
    setProductIndex(nextProductIndex);
    updateUrl(category.products[nextProductIndex].slug);
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
            <div className="product-showcase-media" key={product.image}>
              <img src={product.image} alt={product.imageAlt} />
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
                <p className="product-control-label">Choose your style</p>
                <div className={`product-type-grid${category.products.length <= 2 ? " is-compact" : ""}`} role="tablist" aria-label={`${category.label} styles`}>
                  {category.products.map((item, index) => (
                    <button
                      aria-selected={index === productIndex}
                      className={index === productIndex ? "is-active" : ""}
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
              </div>

              <article className="product-detail-card" aria-live="polite">
                <p className="product-detail-kicker">Selected style</p>
                <h3>{product.name}</h3>
                <p className="product-detail-description">{product.description}</p>
                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>
                      <svg aria-hidden="true" viewBox="0 0 20 20"><path d="m5 10.3 3.1 3.1L15.5 6" /></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>

              <div className="product-showcase-actions">
                <a className="product-primary-cta" href="/contact">
                  Book a free measure
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a className="product-text-cta" href="/contact">
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
