import { HomeQuoteSection } from "@/components/home-quote-section";
import { ProjectVideoSlider } from "@/components/project-video-slider";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="section hero-background">
        <div className="container">
          <div className="hero-wrap hero-home-wrap">
            <div className="hero-home-content reveal">
              <h1 className="hero-white-title home-hero-title">
                <span>Beautiful light.</span>
                <span>Better privacy.</span>
                <span className="italic none">A home that feels right.</span>
              </h1>
              <p className="hero-copy">
                Custom blinds, shutters and curtains designed, measured and installed for the way you live.
              </p>
              <div className="hero-actions">
                <a className="primary-button inline-block" href="#home-quote-section">
                  <div className="primary-button-text-wrap">
                    <div className="primary-button-text">Get a free measure &amp; quote</div>
                    <div className="primary-button-hover-text">Get a free measure &amp; quote</div>
                  </div>
                </a>
                <a className="hero-range-link" href="/products">
                  <span>Explore the range</span>
                  <span className="hero-range-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>

            </div>
            <div className="hero-home-bottom reveal">
              <div className="hero-stats-card">
                <div className="hero-stat">
                  <span className="hero-stat-value">4.9</span>
                  <span className="hero-stat-label">Average customer rating</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">Free</span>
                  <span className="hero-stat-label">In-home measure &amp; quote</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">Custom</span>
                  <span className="hero-stat-label">Made for every opening</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="visual-wrap">
          <video
            aria-hidden="true"
            autoPlay
            className="visual hero-background-image hero-background-video"
            loop
            muted
            playsInline
            poster="/assets/pic1.png"
            preload="metadata"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="visual-overlay hero-overlay" />
        </div>
            </section>
            <section className="section hero-about" id="about">
              <div className="container">
                <div className="hero-about-wrap window-collection-wrap">
                  <div className="window-collection-header">
                    <h2 className="window-collection-title reveal">
                      <span>These aren’t just</span>
                      <span>blinds.</span>
                      <span className="italic none">They’re part of the room.</span>
                    </h2>
                    <p className="window-collection-copy reveal">
                      We help you balance privacy, natural light, temperature and style—then measure and install everything properly.
                    </p>
                  </div>
                  <div className="window-collection-grid">
                    <a className="window-product-card reveal" href="/product/roller-blinds">
                      <img alt="Roller blinds installed in a bright window" className="window-product-image" decoding="async" height="1254" loading="lazy" src="/assets/productstoWEBP/roller%20blinds%20blockout_1.webp" width="1254" />
                      <span className="window-card-number">01</span>
                      <span className="window-card-arrow" aria-hidden="true">↗</span>
                      <span className="window-card-content">
                        <span className="window-card-title">Roller Blinds</span>
                        <span className="window-card-text">Clean-lined blockout, sunscreen and light-filtering options for every room.</span>
                      </span>
                    </a>
                    <a className="window-product-card reveal" href="/product/blockout-curtains">
                      <img alt="Light filtering roller blinds softly diffusing daylight" className="window-product-image" decoding="async" height="1254" loading="lazy" src="/assets/productstoWEBP/vertical%20blinds%202.webp" width="1254" />
                      <span className="window-card-number">02</span>
                      <span className="window-card-arrow" aria-hidden="true">↗</span>
                      <span className="window-card-content">
                        <span className="window-card-title">Vertical Blinds</span>
                        <span className="window-card-text">Soft daylight control that keeps rooms calm, private and beautifully bright.</span>
                      </span>
                    </a>
                    <a className="window-product-card reveal" href="/product/pvc-plantation-shutters">
                      <img alt="Dark blockout roller blinds in a modern room" className="window-product-image" decoding="async" height="1254" loading="lazy" src="/assets/productstoWEBP/blockout curtains.webp" width="1254" />
                      <span className="window-card-number">03</span>
                      <span className="window-card-arrow" aria-hidden="true">↗</span>
                      <span className="window-card-content">
                        <span className="window-card-title">Curtains</span>
                        <span className="window-card-text">A polished finish for bedrooms, media rooms and spaces that need full privacy.</span>
                      </span>
                    </a>
                    <a className="window-product-card reveal" href="/product/curvers">
                      <img alt="Large roller blinds fitted across sliding doors" className="window-product-image" decoding="async" height="1254" loading="lazy" src="/assets/productstoWEBP/pvc plantataion shutters.webp" width="1254" />
                      <span className="window-card-number">04</span>
                      <span className="window-card-arrow" aria-hidden="true">↗</span>
                      <span className="window-card-content">
                        <span className="window-card-title">PVC Shutters</span>
                        <span className="window-card-text">Practical, made-to-measure coverage for wide openings and everyday living.</span>
                      </span>
                    </a>
                    <a className="window-product-card reveal" href="/product/vertical-blinds">
                      <img alt="Custom fitted cassette blinds in a bright bedroom" className="window-product-image" decoding="async" height="1254" loading="lazy" src="/assets/luxxshade.jpeg" width="1254" />
                      <span className="window-card-number">05</span>
                      <span className="window-card-arrow" aria-hidden="true">↗</span>
                      <span className="window-card-content">
                        <span className="window-card-title">Luxx Shades</span>
                        <span className="window-card-text">Measured, made and installed neatly so every edge feels intentional.</span>
                      </span>
                    </a>
                    <a className="window-product-card reveal" href="/product/flyscreens">
                      <img alt="Blinds fitted across a large outdoor-facing doorway" className="window-product-image" decoding="async" height="1254" loading="lazy" src="/assets/flyscreen.jpeg" width="1254" />
                      <span className="window-card-number">06</span>
                      <span className="window-card-arrow" aria-hidden="true">↗</span>
                      <span className="window-card-content">
                        <span className="window-card-title">Flyscreens</span>
                        <span className="window-card-text">Weather-aware shading for patios, balconies and flexible outdoor spaces.</span>
                      </span>
                    </a>
                  </div>
                  <div className="window-collection-action reveal">
                    <a className="window-collection-button inline-block" href="/products">
                      <span>View all window furnishings</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="section window-story" aria-labelledby="window-story-title">
              <div className="container">
                <div className="window-story-intro" hidden>
                  <div className="window-story-reveal reveal">
                    <figure className="window-story-media window-story-media-main" data-story-depth="34">
                      <div className="window-story-image-viewport">
                        <img
                          alt="Vertical blinds shaping warm natural light across a modern workspace"
                          className="window-story-image"
                          decoding="async"
                          height="1066"

                          src="/assets/about%20pic%20folder/story-main.webp"
                          width="1600"
                        />
                      </div>
                      <figcaption className="window-story-caption">
                        <span>01</span>
                        <span>Light, considered</span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="window-story-content">
                    {/* <p className="window-story-kicker reveal">DESIGNED AROUND REAL LIFE</p> */}
                    <h2 className="window-story-title reveal" id="window-story-title">
                      <span>Control the day</span>
                      <span className="italic none">without closing it out.</span>
                    </h2>
                    <p className="window-story-copy reveal">
                      Choose how much light comes in, where privacy begins, and how the room feels from morning to evening. Our recommendations consider window orientation, room use, heat, glare and the look you want to keep.
                    </p>
                    <ul className="window-story-list reveal">
                      <li><span aria-hidden="true">↗</span> In-home product and fabric consultation</li>
                      <li><span aria-hidden="true">↗</span> Accurate professional measurement</li>
                      <li><span aria-hidden="true">↗</span> Clear, itemised quotation</li>
                      <li><span aria-hidden="true">↗</span> Coordinated installation and aftercare</li>
                    </ul>
                    <a className="window-story-link reveal" href="/contact">
                      <span>How we work</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>

                <div className="window-story-brands" aria-labelledby="window-story-brands-title">
                  <div className="window-story-brands-top">
                    <div className="window-story-brands-content reveal">
                      <h2 className="window-story-title window-story-brands-title" id="window-story-brands-title">
                        <span>Brands chosen</span>
                        <span>for quality.</span>
                        <span className="italic none">Materials made to last.</span>
                      </h2>
                    </div>
                    <div className="window-story-brand-visual reveal" role="img" aria-label="Six carefully selected furnishing brands">
                      <div className="window-story-brand-visual-label">
                        <span>CURATED PARTNERS</span>
                        <span>AUSTRALIA</span>
                      </div>
                      <div className="window-story-brand-orbit" aria-hidden="true">
                        <span className="window-story-brand-ring window-story-brand-ring-outer" />
                        <span className="window-story-brand-ring window-story-brand-ring-inner" />
                        <span className="window-story-brand-orbit-dot" />
                        <div className="window-story-brand-orbit-core">
                          <strong>06</strong>
                          <span>TRUSTED<br />BRANDS</span>
                        </div>
                      </div>
                      <div className="window-story-brand-values" aria-hidden="true">
                        <span>PERFORMANCE</span>
                        <span>TEXTURE</span>
                        <span>FINISH</span>
                      </div>
                    </div>
                  </div>
                  <div className="window-story-brand-row reveal" aria-label="Trusted material brands">
                    <div className="window-story-brand-track">
                      <div className="window-story-brand-group">
                        <img alt="Shaw Performance Products" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/1.png" width="300" />
                        <img alt="Alpha Furnishing Motorization" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/2.png" width="300" />
                        <img alt="Louvolite" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/3.png" width="300" />
                        <img alt="Texstyle" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/4.png" width="300" />
                        <img alt="Vertex Fabrics" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/5.png" width="300" />
                        <img alt="Nettex Interior Textiles" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/6.png" width="300" />
                      </div>
                      <div className="window-story-brand-group" aria-hidden="true">
                        <img alt="" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/1.png" width="300" />
                        <img alt="" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/2.png" width="300" />
                        <img alt="" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/3.png" width="300" />
                        <img alt="" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/4.png" width="300" />
                        <img alt="" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/5.png" width="300" />
                        <img alt="" className="window-story-brand-logo" height="100" src="/assets/brand%20logos/6.png" width="300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="window-story-projects" hidden>
                  <div className="window-story-project-heading">
                    <div>
                      {/* <p className="window-story-kicker reveal">INSTALLED PROJECT SHOWCASE</p> */}
                      <h2 className="window-story-title window-story-project-title reveal">
                        <span>A finish that belongs</span>
                        <span className="italic none">in the room.</span>
                      </h2>
                    </div>
                    <p className="window-story-copy window-story-project-copy reveal">
                      See how blinds, screens and specialist systems transform light, privacy and comfort across very different spaces.
                    </p>
                  </div>
                  <div className="window-story-gallery">
                    <div className="window-story-reveal window-story-gallery-main reveal">
                      <figure className="window-story-media" data-story-depth="28">
                        <div className="window-story-image-viewport">
                          <img
                            alt="Statement window screens bringing filtered light into a dining space"
                            className="window-story-image"
                            decoding="async"
                            height="1600"

                            src="/assets/about%20pic%20folder/story-showcase.webp"
                            width="1200"
                          />
                        </div>
                        <figcaption className="window-story-caption window-story-caption-light">
                          <span>02</span>
                          <span>Statement screening</span>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="window-story-gallery-stack">
                      <div className="window-story-reveal reveal">
                        <figure className="window-story-media" data-story-depth="42">
                          <div className="window-story-image-viewport">
                            <img
                              alt="Venetian blinds casting architectural shadows in a bright living room"
                              className="window-story-image"
                              decoding="async"
                              height="1359"

                              src="/assets/about%20pic%20folder/story-light.webp"
                              width="900"
                            />
                          </div>
                          <figcaption className="window-story-caption window-story-caption-light">
                            <span>03</span>
                            <span>Soft privacy</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="window-story-reveal reveal">
                        <figure className="window-story-media" data-story-depth="52">
                          <div className="window-story-image-viewport">
                            <img
                              alt="A hand adjusting horizontal blinds to control daylight"
                              className="window-story-image"
                              decoding="async"
                              height="1091"

                              src="/assets/about%20pic%20folder/story-detail.webp"
                              width="900"
                            />
                          </div>
                          <figcaption className="window-story-caption window-story-caption-light">
                            <span>04</span>
                            <span>Made effortless</span>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section projects-showcase-section">
              <div className="container">
                <div className="inner-wrap">
                  <div className="inner-title-wrap flex">
                    <div className="inner-title-box inner-project reveal">
                      <h2 className="inner-title">
                        These aren’t just
                        <span className="italic">
                          projects
                        </span>
                      </h2>
                    </div>
                    <div className="inner-button-box reveal">
                      <a className="second-button inline-block" href="/project">
                        <div className="project-button-content">
                          <div className="primary-button-text-wrap">
                            <div className="primary-button-text">
                              VIEW ALL
                            </div>
                            <div className="primary-button-hover-text">
                              VIEW ALL
                            </div>
                          </div>
                          <div className="primary-button-icon-box">
                            <div className="primary-button-icon-wrap">
                              <img alt="" className="primary-button-icon" loading="lazy" src="/assets/images/result.svg" />
                              <img alt="" className="primary-button-hover-icon" loading="lazy" src="/assets/images/result.svg" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <ProjectVideoSlider />
                  <div className="project-video-cta reveal">
                    <a className="second-button inline-block" href="/project">
                      <div className="project-button-content">
                        <div className="primary-button-text-wrap">
                          <div className="primary-button-text">VIEW ALL PROJECTS</div>
                          <div className="primary-button-hover-text">VIEW ALL PROJECTS</div>
                        </div>
                        <span className="project-video-cta-arrow" aria-hidden="true">↗</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="styled-windows-section" aria-labelledby="styled-windows-title">
              <div className="styled-windows-backdrop" aria-hidden="true">
                <img
                  alt=""
                  decoding="async"
                  loading="lazy"
                  src="/assets/styled-windows/background.webp"
                />
              </div>
              <div className="styled-windows-overlay" aria-hidden="true" />

              <div className="styled-windows-shell">
                <div className="styled-windows-heading-row">
                  <h2 className="styled-windows-title reveal" id="styled-windows-title">
                    <span>BEAUTIFULLY</span>
                    <span>STYLED WINDOWS</span>
                    <em>FOR EVERY HOME.</em>
                  </h2>
                  <p className="styled-windows-intro reveal">
                    Explore window furnishings designed to enhance privacy, comfort, and style in every room.
                  </p>
                </div>

                <div className="styled-windows-cards" role="list">
                  <a className="styled-windows-card reveal" href="/contact" role="listitem">
                    <span className="styled-windows-card-media">
                      <img
                        alt="Sheer curtains softly filtering daylight in a refined living room"
                        decoding="async"
                        height="1080"
                        loading="lazy"
                        src="/assets/styled-windows/more-privacy.webp"
                        width="720"
                      />
                    </span>
                    <span className="styled-windows-card-copy">
                      <strong>More<br />Privacy</strong>
                      <span>Keep your space private without sacrificing style.</span>
                    </span>
                  </a>

                  <a className="styled-windows-card reveal" href="/contact" role="listitem">
                    <span className="styled-windows-card-media">
                      <img
                        alt="White Venetian blinds controlling daylight in a modern dining room"
                        decoding="async"
                        height="1080"
                        loading="lazy"
                        src="/assets/styled-windows/better-light-control.webp"
                        width="720"
                      />
                    </span>
                    <span className="styled-windows-card-copy">
                      <strong>Better<br />Light Control</strong>
                      <span>Adjust natural light to suit your mood and daily routine.</span>
                    </span>
                  </a>

                  <a className="styled-windows-card reveal" href="/contact" role="listitem">
                    <span className="styled-windows-card-media">
                      <img
                        alt="Light-filtering cellular blinds above a softly upholstered sofa"
                        decoding="async"
                        height="1080"
                        loading="lazy"
                        src="/assets/styled-windows/cooler-rooms.webp"
                        width="720"
                      />
                    </span>
                    <span className="styled-windows-card-copy">
                      <strong>Cooler<br />Rooms</strong>
                      <span>Reduce heat and improve comfort all year round.</span>
                    </span>
                  </a>

                  <a className="styled-windows-card reveal" href="/contact" role="listitem">
                    <span className="styled-windows-card-media">
                      <img
                        alt="Motorised roller blind in a warm contemporary bedroom"
                        decoding="async"
                        height="1080"
                        loading="lazy"
                        src="/assets/styled-windows/motorised-blinds.webp"
                        width="720"
                      />
                    </span>
                    <span className="styled-windows-card-copy">
                      <strong>Motorised<br />Blinds</strong>
                      <span>Effortless control at the touch of a button.</span>
                    </span>
                  </a>
                </div>
              </div>
            </section>
            <section className="section full-padding-bottom why-homeowners-section">
              <div className="container">
                <div className="themselves-wrap why-homeowners-wrap">
                  <div className="themselves-left-box why-homeowners-left reveal">
                    <h2 className="why-homeowners-title">
                      WHY HOMEOWNERS
                      <span>CHOOSE US</span>
                      <span className="italic">Designed around your home.</span>
                    </h2>
                    <p className="why-homeowners-copy">
                      Made-to-measure blinds and shutters, tailored to your space and style. Expert advice, professional fitting, and a local team you can rely on.
                    </p>
                    <a className="primary-button inline-block" href="#home-quote-section">
                      <div className="primary-button-text-wrap">
                        <div className="primary-button-text">
                          BOOK A FREE MEASURE
                        </div>
                        <div className="primary-button-hover-text">
                          BOOK A FREE MEASURE
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="themselves-right-box why-homeowners-right">
                    <div className="why-homeowners-grid">
                      <div className="why-homeowners-cell why-homeowners-reason reveal">
                        <h3>FREE</h3>
                        <p>Measure &amp; Quote</p>
                      </div>
                      <div className="why-homeowners-cell why-homeowners-reason reveal">
                        <h3>MADE TO MEASURE</h3>
                        <p>For every window</p>
                      </div>
                      <div className="why-homeowners-cell why-homeowners-reason reveal">
                        <h3>EXPERT</h3>
                        <p>Professional Fitting</p>
                      </div>
                      <div className="why-homeowners-cell why-homeowners-reason reveal">
                        <h3>QUALITY</h3>
                        <p>Materials &amp; Finish</p>
                      </div>
                      <div className="why-homeowners-cell why-homeowners-stat reveal">
                        <strong data-count-decimals="1" data-count-to="4.9">4.9</strong>
                        <span>Google Rating</span>
                      </div>
                      <div className="why-homeowners-cell why-homeowners-stat reveal">
                        <strong data-count-suffix="+" data-count-to="500">500+</strong>
                        <span>Homes Completed</span>
                      </div>
                      <div className="why-homeowners-cell why-homeowners-stat reveal">
                        <strong data-count-suffix="+" data-count-to="10">10+</strong>
                        <span>Years Experience</span>
                      </div>
                      <div className="why-homeowners-cell why-homeowners-stat reveal">
                        <strong data-count-suffix="+" data-count-to="1500">1,500+</strong>
                        <span>Windows Fitted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <section className="section testimonial">
              <div className="container">
                <div className="testimonial-section-title reveal">
                  <h2 className="inner-title is-testimonial">
                    Testimonials
                    <span className="italic">
                      From Our Customers
                    </span>
                  </h2>
                  <p>
                    Trusted by homeowners, designers and developers across the country.
                  </p>
                </div>
                <div className="testimonial-tabs tabs reveal">
                  <div className="testimonial-tabs-menu tab-menu">
                    <a aria-current="page" className="testimonial-tab-link inline-block tab-link" data-tab="Tab 1">
                      <img alt="" className="testimonial-author-image" loading="lazy" sizes="100vw" src="/assets/images/Testimonial-Author-2.webp" srcSet="/assets/images/Testimonial-Author-2-p-500.webp 500w, /assets/images/Testimonial-Author-2-p-800.webp 800w, /assets/images/Testimonial-Author-2.webp 1044w" />
                    </a>
                    <a className="testimonial-tab-link inline-block tab-link" data-tab="Tab 2">
                      <img alt="" className="testimonial-author-image" loading="lazy" sizes="100vw" src="/assets/images/Testimonial-Author.webp" srcSet="/assets/images/Testimonial-Author-p-500.webp 500w, /assets/images/Testimonial-Author-p-800.webp 800w, /assets/images/Testimonial-Author.webp 1044w" />
                    </a>
                    <a className="testimonial-tab-link inline-block tab-link" data-tab="Tab 3">
                      <img alt="" className="testimonial-author-image" loading="lazy" sizes="100vw" src="/assets/images/Testimonial-Author-1.webp" srcSet="/assets/images/Testimonial-Author-1-p-500.webp 500w, /assets/images/Testimonial-Author-1-p-800.webp 800w, /assets/images/Testimonial-Author-1.webp 1044w" />
                    </a>
                  </div>
                  <div className="testimonial-tabs-content tab-content">
                    <div className="testimonial-tab-pane tab-pane is-active" data-tab="Tab 1">
                      <div className="testimonial-tab-content">
                        <img alt="" className="testimonial-quote-icon" loading="lazy" src="/assets/images/Quote-Icon.svg" />
                        <div className="testimonial-text-block">
                          <div className="testimonial-text-wrapper">
                            <p className="testimonial-text-large">
                              “The bedroom blinds have elevated our space completely. From light control to privacy, everything just works. The quality is unreal.”
                            </p>
                            <p className="testimonial-text-small">
                              Custom blackout blinds in master bedroom, Surrey, Sydney Australia
                            </p>
                          </div>
                          <div className="testimonial-author-block">
                            <img alt="" className="testimonial-author" height="48" loading="lazy" sizes="(max-width: 479px) 100vw, 48px" src="/assets/images/Testimonial-Author-2.webp" srcSet="/assets/images/Testimonial-Author-2-p-500.webp 500w, /assets/images/Testimonial-Author-2-p-800.webp 800w, /assets/images/Testimonial-Author-2.webp 1044w" width="48" />
                            <div className="testimonial-author-info">
                              <p className="testimonial-text-small">
                                James L.
                              </p>
                              <p className="testimonial-text-xsmall">
                                Homeowner
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-tab-pane tab-pane" data-tab="Tab 2">
                      <div className="testimonial-tab-content">
                        <img alt="" className="testimonial-quote-icon" loading="lazy" src="/assets/images/Quote-Icon.svg" />
                        <div className="testimonial-text-block">
                          <div className="testimonial-text-wrapper">
                            <p className="testimonial-text-large">
                              “Our new roller blinds look beautifully clean and make every room feel more comfortable. The measuring and installation process was effortless from start to finish.”
                            </p>
                            <p className="testimonial-text-small">
                              Motorised roller blinds throughout the home, Richmond, Sydney Australia
                            </p>
                          </div>
                          <div className="testimonial-author-block">
                            <img alt="" className="testimonial-author" height="48" loading="lazy" sizes="100vw" src="/assets/images/Testimonial-Author.webp" srcSet="/assets/images/Testimonial-Author-p-500.webp 500w, /assets/images/Testimonial-Author-p-800.webp 800w, /assets/images/Testimonial-Author.webp 1044w" width="48" />
                            <div className="testimonial-author-info">
                              <p className="testimonial-text-small">
                                Daniel M.
                              </p>
                              <p className="testimonial-text-xsmall">
                                Homeowner
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-tab-pane tab-pane" data-tab="Tab 3">
                      <div className="testimonial-tab-content">
                        <img alt="" className="testimonial-quote-icon" loading="lazy" src="/assets/images/Quote-Icon.svg" />
                        <div className="testimonial-text-block">
                          <div className="testimonial-text-wrapper">
                            <p className="testimonial-text-large">
                              “The shutters have transformed the front of our home. They give us privacy without losing natural light, and the finish feels completely made for the space.”
                            </p>
                            <p className="testimonial-text-small">
                              Made-to-measure plantation shutters, Manchester, Sydney Australia
                            </p>
                          </div>
                          <div className="testimonial-author-block">
                            <img alt="" className="testimonial-author" height="48" loading="lazy" sizes="100vw" src="/assets/images/Testimonial-Author-1.webp" srcSet="/assets/images/Testimonial-Author-1-p-500.webp 500w, /assets/images/Testimonial-Author-1-p-800.webp 800w, /assets/images/Testimonial-Author-1.webp 1044w" width="48" />
                            <div className="testimonial-author-info">
                              <p className="testimonial-text-small">
                                Oliver T.
                              </p>
                              <p className="testimonial-text-xsmall">
                                Homeowner
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
            <section className="section benefit">
              <div className="container">
                <div className="benefit-layout">
                  <div className="benefit-intro reveal">
                    <div className="benefit-kicker">HOW IT WORKS</div>
                    <h2 className="benefit-heading">
                      From first measure to the 
                      <span className="italic ">perfect fit.</span>
                    </h2>
                    <p className="benefit-copy">
                      A simple, seamless process designed around you.
                    </p>
                  </div>
                  <div className="benefit-card-stack">
                    <div className="benefit-card-block">
                      <div className="benefit-card one">
                        <span className="benefit-card-number">01</span>
                        <h2 className="benefit-card-title">
                          Free Measure &amp; Quote
                        </h2>
                        <div className="benefit-card-text">
                          Start with a no-obligation enquiry and book a convenient in-home appointment.
                        </div>
                      </div>
                      <div className="benefit-card two">
                        <span className="benefit-card-number">02</span>
                        <h2 className="benefit-card-title">
                          In-Home Consultation
                        </h2>
                        <div className="benefit-card-text">
                          We measure your windows, understand your needs and recommend the right options.
                        </div>
                      </div>
                      <div className="benefit-card three">
                        <span className="benefit-card-number">03</span>
                        <h2 className="benefit-card-title">
                          Choose Your Style
                        </h2>
                        <div className="benefit-card-text">
                          Compare blinds, shutters, fabrics, colours and finishes in your own space.
                        </div>
                      </div>
                      <div className="benefit-card four">
                        <span className="benefit-card-number">04</span>
                        <h2 className="benefit-card-title">
                          Made to Measure
                        </h2>
                        <div className="benefit-card-text">
                          Once approved, everything is custom made to fit your windows perfectly.
                        </div>
                      </div>
                      <div className="benefit-card five">
                        <span className="benefit-card-number">05</span>
                        <h2 className="benefit-card-title">
                          Expert Installation
                        </h2>
                        <div className="benefit-card-text">
                          Your blinds or shutters are professionally fitted and checked for a clean finish.
                        </div>
                      </div>
                    </div>
                    <a className="benefit-step-button inline-block pt-8" href="#home-quote-section">
                      Step 1- Its Free
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="section full-padding-top">
              <div className="container">
                <div className="results-flex">
                  <div className="result-feft-box">
                    <div className="inner-title-wrap results">
                      <div className="inner-title-box is-result reveal">
                        <h2 className="inner-title">
                          EVERYTHING YOU NEED
                          <span>TO KNOW</span>
                          <span className="italic">BEFORE YOU CHOOSE</span>
                        </h2>
                      </div>
                      <div className="inner-button-box reveal">
                        <a className="primary-button inline-block" href="#home-quote-section">
                          <div className="primary-button-text-wrap">
                            <div className="primary-button-text">
                              BOOK A FREE MEASURE
                            </div>
                            <div className="primary-button-hover-text">
                              BOOK A FREE MEASURE
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="result-right-box faq-list" role="list">
                      <details className="faq-row" role="listitem">
                        <summary className="faq-summary">
                          <span className="faq-number">01</span>
                          <span className="faq-question">HOW DOES THE FREE MEASURE &amp; QUOTE WORK?</span>
                          <span className="faq-toggle" aria-hidden="true">+</span>
                        </summary>
                        <div className="faq-answer"><p>We’ll visit your home, measure your windows and talk through the styles, colours and finishes that suit your space. You’ll then receive a clear, no-obligation quote.</p></div>
                      </details>
                      <details className="faq-row" role="listitem">
                        <summary className="faq-summary">
                          <span className="faq-number">02</span>
                          <span className="faq-question">WHICH BLINDS &amp; SHUTTERS ARE RIGHT FOR MY HOME?</span>
                          <span className="faq-toggle" aria-hidden="true">+</span>
                        </summary>
                        <div className="faq-answer"><p>Every room is different. We’ll help you compare the best options for privacy, light control and style, so choosing feels simple.</p></div>
                      </details>
                      <details className="faq-row" role="listitem">
                        <summary className="faq-summary">
                          <span className="faq-number">03</span>
                          <span className="faq-question">ARE YOUR BLINDS &amp; SHUTTERS MADE TO MEASURE?</span>
                          <span className="faq-toggle" aria-hidden="true">+</span>
                        </summary>
                        <div className="faq-answer"><p>Yes. Every blind and shutter is tailored to your windows for a precise fit and a beautifully finished look.</p></div>
                      </details>
                      <details className="faq-row" role="listitem">
                        <summary className="faq-summary">
                          <span className="faq-number">04</span>
                          <span className="faq-question">DO YOU PROVIDE PROFESSIONAL FITTING?</span>
                          <span className="faq-toggle" aria-hidden="true">+</span>
                        </summary>
                        <div className="faq-answer"><p>Absolutely. Our experienced fitters take care of the installation, making sure everything looks right and works exactly as it should.</p></div>
                      </details>
                      <details className="faq-row" role="listitem">
                        <summary className="faq-summary">
                          <span className="faq-number">05</span>
                          <span className="faq-question">HOW LONG DOES THE WHOLE PROCESS TAKE?</span>
                          <span className="faq-toggle" aria-hidden="true">+</span>
                        </summary>
                        <div className="faq-answer"><p>Timescales vary by product, but we’ll keep everything clear from your first measure through to final fitting, with no unnecessary surprises.</p></div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <HomeQuoteSection />
            <section className="section inner-blog">
              <div className="container">
                <div className="inner-wrap">
                  <div className="inner-title-wrap flex">
                    <div className="inner-title-box inner-blog reveal">
                      <h2 className="inner-title">
                        Window Furnishing Ideas
                        <span className="italic">
                          for inspired homes
                        </span>
                      </h2>
                    </div>
                    <div className="inner-button-box reveal">
                      <a className="primary-button inline-block" href="/blog">
                        <div className="primary-button-text-wrap">
                          <div className="primary-button-text">
                            EXPLORE GUIDES
                          </div>
                          <div className="primary-button-hover-text">
                            EXPLORE GUIDES
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="inner-blog-grid" role="list">
                      <div data-cat="design" role="listitem">
                        <div className="blog-card reveal">
                          <a className="blog-image-box inline-block" href="/blog/how-design-trends-shape-buyer-decisions">
                            <img alt="Light-filtering blinds helping create a cooler, more comfortable room" className="blog-image" loading="lazy" src="/assets/styled-windows/cooler-rooms.webp" />
                          </a>
                          <a aria-label="Blog Link" className="blog-card-title-box inline-block" href="/blog/how-design-trends-shape-buyer-decisions">
                            <h3 className="blog-card-title">
                              How to Choose Blinds for a Cooler, More Comfortable Home
                            </h3>
                          </a>
                          <div className="blog-author-box">
                            <div className="blog-author-name">
                              Interior Blinds &amp; Shutters
                            </div>
                            <div className="blog-author-date">
                              Aug 11, 2026
                            </div>
                          </div>
                          <div className="blog-card-divider-wrap">
                            <div className="blog-card-divider" style={{ width: "100%" }}>
                            </div>
                            <div className="blog-card-divider-hover" style={{ width: "0%" }}>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div data-cat="architect" role="listitem">
                        <div className="blog-card reveal">
                          <a className="blog-image-box inline-block" href="/blog/how-the-real-estate-market-is-evolving-in-2025">
                            <img alt="Sheer curtains providing privacy while softly filtering natural light" className="blog-image" loading="lazy" src="/assets/styled-windows/more-privacy.webp" />
                          </a>
                          <a aria-label="Blog Link" className="blog-card-title-box inline-block" href="/blog/how-the-real-estate-market-is-evolving-in-2025">
                            <h3 className="blog-card-title">
                              How to Add Privacy Without Losing Beautiful Natural Light
                            </h3>
                          </a>
                          <div className="blog-author-box">
                            <div className="blog-author-name">
                              Interior Blinds &amp; Shutters
                            </div>
                            <div className="blog-author-date">
                              Aug 08, 2026
                            </div>
                          </div>
                          <div className="blog-card-divider-wrap">
                            <div className="blog-card-divider" style={{ width: "100%" }}>
                            </div>
                            <div className="blog-card-divider-hover" style={{ width: "0%" }}>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div data-cat="design" role="listitem">
                        <div className="blog-card reveal">
                          <a className="blog-image-box inline-block" href="/blog/the-role-of-design-in-real-estate-development">
                            <img alt="Motorised roller blinds fitted in a warm contemporary bedroom" className="blog-image" loading="lazy" src="/assets/styled-windows/motorised-blinds.webp" />
                          </a>
                          <a aria-label="Blog Link" className="blog-card-title-box inline-block" href="/blog/the-role-of-design-in-real-estate-development">
                            <h3 className="blog-card-title">
                              Motorised Blinds: Effortless Comfort at the Touch of a Button
                            </h3>
                          </a>
                          <div className="blog-author-box">
                            <div className="blog-author-name">
                              Interior Blinds &amp; Shutters
                            </div>
                            <div className="blog-author-date">
                              Aug 05, 2026
                            </div>
                          </div>
                          <div className="blog-card-divider-wrap">
                            <div className="blog-card-divider" style={{ width: "100%" }}>
                            </div>
                            <div className="blog-card-divider-hover" style={{ width: "0%" }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    </main>
  );
}
