// Nuvora template — shared site footer.
// Markup mirrors the original design; styling comes from /assets/css/styles.css.
export function Footer() {
  return (
    <section className="section footer">
      <div className="plan-divider footer" />
      <div className="container">
        <div className="footer-wrap">
          <div className="footer-top-flex">
            <div className="footer-about-box">
              <div className="footer-logo-wrap">
                <a aria-current="page" className="footer-logo inline-block" href="/">
                  <span className="site-brand footer-site-brand">
                    <img
                      alt=""
                      className="site-brand-image"
                      decoding="async"
                      height="42"
                      loading="lazy"
                      src="/assets/logo-96.webp"
                      width="42"
                    />
                    <span className="site-brand-text">Interior Blinds &amp; Shutters</span>
                  </span>
                </a>
                <div className="footer-about-box">
                  <div className="text-small">
                    Custom blinds, shutters and curtains designed, measured and installed for the way you live.
                  </div>
                </div>
              </div>

              <div className="footer-contact-wrap">
                <div className="small-text font-bold">CONTACT</div>
                <a className="footer-contact-link" href="tel:+61458822281">
                  +61 458 822 281 
                </a>
              </div>
               <div className="footer-contact-wrap">
                <div className="small-text font-bold">ADDRESS</div>
                <a className="footer-contact-link" href="tel:+61458822281">
                 9 Muir Road Edmondson Park, NSW 2174
                </a>
              </div>

              <div className="plan-divider" />

              <div className="footer-social-wrap">
                <div className="small-text">SOCIAL MEDIA</div>
                <div className="footer-social-box">
                  <a
                    aria-label="Instagram"
                    className="footer-social-link inline-block"
                    href="https://www.instagram.com/interiorblindsandshutters?utm_source=qr"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt="" className="social-link-icon" loading="lazy" src="/assets/images/instagram.svg" />
                  </a>
                  <a
                    aria-label="Facebook"
                    className="footer-social-link inline-block"
                    href="https://www.facebook.com/profile.php?id=100092455395096&amp;mibextid=LQQJ4d"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt="" className="social-link-icon" loading="lazy" src="/assets/images/facebook.svg" />
                  </a>
                  <a
                    aria-label="TikTok"
                    className="footer-social-link inline-block"
                    href="https://www.tiktok.com/@interiorblindsandshutter?_t=8cHVXSJBb1N&amp;_r=1"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt="" className="social-link-icon" loading="lazy" src="/assets/images/tiktok.svg" />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-top-righ-box">
              <div className="footer-wedget-wrap">
                <div className="footer-single-widget">
                  <div className="footer-wized-title">NAVIGATION</div>
                  <a aria-current="page" className="footer-menu" href="/">
                    Home
                  </a>
                  <a className="footer-menu" href="/about">
                    About Us
                  </a>
                  <a className="footer-menu" href="/products">
                    Products
                  </a>
                  <a className="footer-menu" href="/project">
                    Projects
                  </a>
                  <a className="footer-menu" href="/privacy-policy">
                    Privacy Policy
                  </a>
                  <a className="footer-menu" href="/terms-of-service">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-medium-box">
          <div className="footer-medium-flex">
            <h2 className="footer-title">Beautiful light.</h2>
            <div className="footer-title-flex">
              <h2 className="footer-title">Better</h2>
              <a className="get-box inline-block" href="#home-quote-section">
                <div className="sami-description">BOOK A FREE MEASURE</div>
              </a>
              <h2 className="footer-title">Privacy.</h2>
            </div>
            <h2 className="italic">
              Made for<br /> your home.
            </h2>
          </div>

          <div className="footer-image-box">
            <video
              aria-label="Interior blinds and shutters showcase"
              className="footer-image footer-video-media"
              data-viewport-autoplay
              loop
              muted
              playsInline
              preload="none"
            >
              <source src="/assets/footer-showcase.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="footer-bottom-box">
        <div className="footer-bottom-content">
          © 2026 Interior Blinds &amp; Shutters. All rights reserved.
        </div>
      </div>
    </section>
  );
}
