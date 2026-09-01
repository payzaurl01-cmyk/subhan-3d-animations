import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Interior Blinds & Shutters and our considered approach to custom window furnishings.",
};

const values = [
  {
    icon: "/assets/images/693ea335c66b9f98d2e38c62_shield-security.svg",
    title: "Built on trust",
    text: "Clear advice, honest recommendations and careful work from the first measure to the final fit.",
  },
  {
    icon: "/assets/images/693ea3354ffb342f59b14d24_cup.svg",
    title: "Quality first",
    text: "We select dependable materials and finishes designed to look beautiful and perform every day.",
  },
  {
    icon: "/assets/images/693ea3357666691cc6f7b059_sun-fog.svg",
    title: "Made for your light",
    text: "Every solution balances privacy, light control, comfort and the character of your rooms.",
  },
  {
    icon: "/assets/images/693ea335a59a2f1251cafbab_profile-2user.svg",
    title: "Personal service",
    text: "One thoughtful process, tailored to your windows, your style and the way you live.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <section className="section inner-hero-about">
        <div className="container">
          <div className="inner-title-wrap inner-hero">
            <div className="inner-title-box is-hero-about">
              <h1 className="hero-white-title">
                Window furnishings made
                <span className="italic none">for the way you live.</span>
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
            alt="Soft natural light through custom window furnishings"
            className="visual"
            loading="eager"
            src="/assets/about%20pic%20folder/story-showcase.webp"
          />
          <div className="visual-overlay" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="at-flex">
            <div className="at-left-box reveal">
              <img alt="" className="at-icon" loading="lazy" src="/assets/images/about-right.svg" />
            </div>
            <div className="at-right-box reveal">
              <h2 className="at-title">
                <span className="opacity-zero is-at">0000000</span>
                AT INTERIOR BLINDS &amp; SHUTTERS, WE CREATE MADE-TO-MEASURE WINDOW
                FURNISHINGS THAT BRING BETTER LIGHT, PRIVACY AND COMFORT TO EVERY ROOM.
                FROM THE FIRST CONVERSATION TO INSTALLATION, EVERY DETAIL IS CONSIDERED.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="section is-value">
        <div className="container">
          <div className="value-content-block">
            <div className="value-title-block">
              <h2 className="value-title reveal">What guides us</h2>
              <div className="value-description reveal">
                <p>
                  Thoughtful advice, precise measuring and a finish that feels completely at home.
                </p>
              </div>
            </div>
            <div className="value-widget-block">
              {values.map((value) => (
                <div className="value-widget reveal" key={value.title}>
                  <img alt="" className="value-widget-icon" height="40" loading="lazy" src={value.icon} width="40" />
                  <div className="value-widget-body">
                    <h3 className="value-widget-title">{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section is-story">
        <div className="container">
          <div className="story-content-block">
            <div className="mission-sub-title">
              <img alt="" className="sub-title-icon" height="36" loading="lazy" src="/assets/images/693ea9c0dbbbfe3ce9eb7f41_arrow-right.svg" width="36" />
              <div className="sub-title-text">Our approach</div>
            </div>
            <div className="story-right-content">
              <h2 className="story-title reveal">Made personal</h2>
              <div className="story-text-block reveal">
                <div className="story-text-wrapper">
                  <div className="story-year">01</div>
                  <div className="story-text-wrap">
                    <p>
                      We begin by understanding your space, how the room is used and what you want your windows to do.
                    </p>
                  </div>
                </div>
                <div className="story-text-wrapper">
                  <div className="story-year">02</div>
                  <div className="story-text-wrap">
                    <p>
                      We help you choose the right style, fabric and finish, then measure carefully for a made-to-fit result.
                    </p>
                  </div>
                </div>
                <div className="story-text-wrapper">
                  <div className="story-year">03</div>
                  <div className="story-text-wrap">
                    <p>
                      Your furnishings are installed with care, tested and finished so they feel effortless from day one.
                    </p>
                  </div>
                </div>
              </div>
              <div className="story-image-wrap reveal">
                <img
                  alt="A bright interior with elegant window furnishings"
                  className="story-image"
                  loading="lazy"
                  src="/assets/about%20pic%20folder/story-main.webp"
                />
                <div className="dashbord-image-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section is-mission">
        <div className="container">
          <div className="mission-content-block">
            <div className="mission-sub-title">
              <img alt="" className="sub-title-icon" height="36" loading="lazy" src="/assets/images/693ea9c0dbbbfe3ce9eb7f41_arrow-right.svg" width="36" />
              <div className="sub-title-text">Our promise</div>
            </div>
            <div className="mission-right-content">
              <div className="mission-text-block">
                <div className="mission-title-block">
                  <h2 className="mission-title reveal">Beautifully resolved</h2>
                  <p className="reveal">
                    We believe the best window furnishings do more than complete a room. They make daily life calmer, more comfortable and more private while reflecting your personal style.
                  </p>
                </div>
                <div className="mission-list reveal">
                  {[
                    "A free measure and considered product guidance.",
                    "Custom solutions for blinds, curtains, shutters and flyscreens.",
                    "Careful installation and a clean, professional finish.",
                  ].map((item) => (
                    <div className="mission-list-item" key={item}>
                      <img alt="" className="mission-list-icon" height="24" loading="lazy" src="/assets/images/693ea9c07304940fc24e8a22_tick-circle.svg" width="24" />
                      <p className="mission-list-text">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="story-image-wrap reveal">
                <img
                  alt="Detail of custom blinds filtering daylight"
                  className="story-image"
                  loading="lazy"
                  src="/assets/about%20pic%20folder/story-detail.webp"
                />
                <div className="dashbord-image-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="animated-image-section">
        <div className="animated-image-wrapper">
          <div className="animated-image-wrap">
            <img
              alt="Light filtering through contemporary blinds"
              className="animated-image"
              loading="lazy"
              src="/assets/about%20pic%20folder/story-light.webp"
            />
            <div className="animated-text-wrap">
              <h2 className="heading">Made for you</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
