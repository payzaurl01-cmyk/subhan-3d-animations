import { getProducts } from "@/lib/content";

// Nuvora template — pricing. Hero + tab markup mirror the original design; each
// plan's feature list is pulled from the products content (src/content/products.json)
// so it stays in sync with the plan / product detail pages. The Monthly/Yearly tabs
// are switched by NuvoraScripts (initTabs).
const DESCRIPTION = "Unlock your needs and Suitable plan for your every deal and management";

type PlanRow = { handle: string; name: string; monthly: string; yearly: string };
const PLANS: PlanRow[] = [
  { handle: "basic", name: "Basic", monthly: "$999.00", yearly: "$799.00" },
  { handle: "advance", name: "Advance", monthly: "$799.00", yearly: "$639.00" },
];

function PlanCard({
  plan,
  price,
  features,
  active,
}: {
  plan: PlanRow;
  price: string;
  features: string[];
  active: boolean;
}) {
  return (
    <div role="listitem">
      <div className={active ? "pricing-card reveal" : "pricing-card"}>
        <div className="pricing-card-left-box">
          <div className="plan-name-box">
            <h2 className="plan-name">{plan.name}</h2>
            <div className="secondary-text-regular">{DESCRIPTION}</div>
          </div>
          <div className="plan-price-box">
            <h3 className="plan-price">{price}</h3>
            <div className="secondary-text-regular">/month</div>
          </div>
          <a className="plan-button inline-block" href={`/product/${plan.handle}`}>
            <div className="primary-button-content">
              <div className="primary-button-text-wrap">
                <div className="primary-button-text">Select Plan</div>
                <div className="primary-button-hover-text">Select Plan</div>
              </div>
            </div>
          </a>
        </div>
        <div className="pricing-card-right-box">
          <ul className="feature-list list-unstyled" role="list">
            {features.map((feat, i) => (
              <li className="feature-list-item" key={i}>
                <div className="feature-icon-box">
                  <img
                    alt=""
                    className="feature-icon"
                    loading="lazy"
                    src="/assets/images/693ea9c07304940fc24e8a22_tick-circle.svg"
                  />
                </div>
                <div className="description">{feat}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const products = getProducts();
  const featuresOf = (handle: string) =>
    products.find((p) => p.handle === handle)?.features ?? [];

  return (
    <>
      <section className="section inner-hero">
        <div className="container">
          <div className="inner-title-wrap inner-hero">
            <div className="inner-title-box is-pricing">
              <h1 className="hero-white-title">
                Simple pricing that helps you
                <span className="italic none">to stand for your project</span>
              </h1>
            </div>
            <div className="inner-button-box">
              <a className="primary-button inline-block" href="/contact-us">
                <div className="primary-button-text-wrap">
                  <div className="primary-button-text">GET IN TOUCH</div>
                  <div className="primary-button-hover-text">GET IN TOUCH</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="visual-wrap">
          <img
            alt=""
            className="visual"
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 5760px) 100vw, 5760px"
            src="/assets/images/Pricing-Banner-Image.webp"
            srcSet="/assets/images/Pricing-Banner-Image-p-500.webp 500w, /assets/images/Pricing-Banner-Image-p-800.webp 800w, /assets/images/Pricing-Banner-Image-p-1080.webp 1080w, /assets/images/Pricing-Banner-Image-p-1600.webp 1600w, /assets/images/Pricing-Banner-Image-p-2000.webp 2000w, /assets/images/Pricing-Banner-Image-p-2600.webp 2600w, /assets/images/Pricing-Banner-Image-p-3200.webp 3200w, /assets/images/Pricing-Banner-Image.webp 5760w"
          />
          <div className="visual-overlay" />
        </div>
      </section>
      <section className="section full-padding-bottom">
        <div className="container">
          <div className="pricing-card-wrap">
            <div className="tabs">
              <div className="tabs-menu tab-menu reveal">
                <a aria-current="page" className="tab-link-tab-1 inline-block tab-link" data-tab="Tab 1">
                  <div>Monthly</div>
                </a>
                <a className="tab-link-tab-1 inline-block tab-link" data-tab="Tab 2">
                  <div>Yearly</div>
                </a>
              </div>
              <div className="tab-content">
                <div className="tab-pane is-active" data-tab="Tab 1">
                  <div>
                    <div className="plan-collection-list" role="list">
                      {PLANS.map((plan) => (
                        <PlanCard
                          key={plan.handle}
                          plan={plan}
                          price={plan.monthly}
                          features={featuresOf(plan.handle)}
                          active
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tab-pane" data-tab="Tab 2">
                  <div>
                    <div className="plan-collection-list" role="list">
                      {PLANS.map((plan) => (
                        <PlanCard
                          key={plan.handle}
                          plan={plan}
                          price={plan.yearly}
                          features={featuresOf(plan.handle)}
                          active={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
