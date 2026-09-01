import { ContactQuoteForm } from "@/components/contact-quote-form";

export default function ContactUsPage() {
  return (
    <>
      <section className="section inner-hero">
              <div className="container">
                <div className="inner-title-wrap contact">
                  <div className="inner-title-box is-contact">
                    <h1 className="hero-white-title">
                      Ready to transform
                      <span className="italic none">
                        your home?
                      </span>
                    </h1>
                  </div>
                  <div className="inner-button-box">
                    <a className="primary-button inline-block" href="#contact-quote-form">
                      <div className="primary-button-content">
                        <div className="primary-button-text-wrap">
                          <div className="primary-button-text">
                            BOOK A FREE MEASURE
                          </div>
                          <div className="primary-button-hover-text">
                            BOOK A FREE MEASURE
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="visual-wrap">
                <img alt="" className="visual" decoding="async" fetchPriority="high" src="/assets/contact-hero.webp" />
                <div className="visual-overlay">
                </div>
              </div>
            </section>
            <section className="section full-padding-bottom">
              <div className="container">
                <div className="contact-flex">
                  <div className="contact-left-box">
                    <h2 className="contact-title reveal">
                      Book your free measure &amp; quote.
                    </h2>
                    <p className="secondary-text-regular reveal">
                      We’ll help you choose the right blinds, shutters or curtains for your space, style and budget.
                    </p>
                    <div className="contact-card reveal">
                      <div className="primary-text-regular">
                        Phone
                      </div>
                      <a className="primary-text-regular text-primary" href="tel:+61458822281">
                        +61 458 822 281
                      </a>
                    </div>
                    <div className="plan-divider" style={{ width: "0%" }}>
                    </div>
                    <div className="contact-card reveal">
                      <div className="primary-text-regular">
                        Email
                      </div>
                      <a className="primary-text-regular text-primary" href="mailto:info@interiorblindsandshutters.com.au">
                        info@interiorblindsandshutters.com.au
                      </a>
                    </div>
                    <div className="contact-card reveal">
                      <div className="primary-text-regular">
                        ADDRESS
                      </div>
                      <a className="primary-text-regular text-primary" href="mailto:info@interiorblindsandshutters.com.au">
                        9 Muir Road Edmondson Park, NSW 2174
                      </a>
                    </div>
                  </div>
                  <div className="contact-right-box reveal">
                    <div className="form-block">
                      <ContactQuoteForm />
                    </div>
                  </div>
                </div>
              </div>
            </section>
    </>
  );
}
