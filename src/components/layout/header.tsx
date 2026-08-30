// Nuvora template — shared site header (navbar, cart drawer, full-screen menu).
// Markup mirrors the original design; styling comes from /assets/css/styles.css.
"use client";

import { usePathname } from "next/navigation";


export function Header() {
  // The adaptive logo: the dark home hero keeps the white logo (.v1); every other
  // (light-background) page adds `nav-on-light` so the black logo (.v2) shows.
  const pathname = usePathname();
  const navbarClass = pathname === "/" ? "navbar" : "navbar nav-on-light";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <div className="header">
      <div className={navbarClass}>
        <div className="wf-layout-blockcontainer container">
          <div className="navbar-wrapper">
            <div className="nav-content-wrap">
              <a aria-current="page" className="nav-logo-wrap inline-block" href="/">
                <span className="site-brand header-site-brand">
                  <img alt="" className="site-brand-image" decoding="async" height="36" src="/assets/logo-96.webp" width="36" />
                  <span className="site-brand-text">Interior Blinds &amp; Shutters</span>
                </span>
              </a>
              <div className="nav-item-wrap">
                <div className="nav-main-menu-wrap">
                  <a aria-current={isActive("/") ? "page" : undefined} className="menu-link" href="/">
                    Home
                  </a>
                  <a aria-current={isActive("/about") ? "page" : undefined} className="menu-link" href="/about">
                    About
                  </a>
                  <a aria-current={isActive("/products") ? "page" : undefined} className="menu-link" href="/products">
                    Products
                  </a>
                  <a aria-current={isActive("/project") ? "page" : undefined} className="menu-link" href="/project">
                    Projects
                  </a>
                  <a aria-current={isActive("/blog") ? "page" : undefined} className="menu-link" href="/blog">
                    Guides
                  </a>
                  <a aria-current={isActive("/contact") ? "page" : undefined} className="menu-link" href="/contact">
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="nav-flex">
              <details className="header-phone">
                <summary className="header-phone-trigger" aria-label="Show phone number">
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </summary>
                <div className="header-phone-dropdown">
                  <span>CALL US TODAY</span>
                  <a href="tel:+61458822281">+61 458 822 281</a>
                </div>
              </details>
              <div className="hamburger-menu open">
                <div className="hamburger-text">
                  Menu
                </div>
                <img alt="Hamburger Icon" className="hamburger-icon v1" loading="lazy" src="/assets/images/black-menu.svg" />
                <img alt="Hamburger Icon" className="hamburger-icon v2" loading="lazy" src="/assets/images/Hamburger.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="open-menu">
        <div className="nav-menu-wrapper">
          <div className="close-menu-wrap">
            <div className="nav-menu-logo-box">
              <span className="site-brand menu-site-brand">
                <img alt="" className="site-brand-image" decoding="async" height="42" src="/assets/logo-96.webp" width="42" />
                <span className="site-brand-text">Interior Blinds &amp; Shutters</span>
              </span>
            </div>
            <div className="hamburger-menu close">
              <div className="hamburger-text-two">
                &#123;CLOSE&#125;
              </div>
            </div>
          </div>
          <div className="nav-menu-all-wrap">
            <div className="nav-menu-wrap">
              <div className="single-nav-menu">
                <a aria-current={isActive("/") ? "page" : undefined} className="nav-link-wrap inline-block" href="/">
                  <div className="nav-link-texts">
                    <div className="nav-link-text">
                      HOME
                    </div>
                    <div className="nav-link-text">
                      HOME
                    </div>
                  </div>
                </a>
                <div className="nav-border">
                  <div className="blog-card-divider">
                  </div>
                  <div className="blog-card-divider-hover">
                  </div>
                </div>
              </div>
              <div className="single-nav-menu">
                <a aria-current={isActive("/about") ? "page" : undefined} className="nav-link-wrap inline-block" href="/about">
                  <div className="nav-link-texts">
                    <div className="nav-link-text">ABOUT</div>
                    <div className="nav-link-text">ABOUT</div>
                  </div>
                </a>
                <div className="nav-border">
                  <div className="blog-card-divider" />
                  <div className="blog-card-divider-hover" />
                </div>
              </div>
              <div className="single-nav-menu">
                <a aria-current={isActive("/products") ? "page" : undefined} className="nav-link-wrap inline-block" href="/products">
                  <div className="nav-link-texts">
                    <div className="nav-link-text">PRODUCTS</div>
                    <div className="nav-link-text">PRODUCTS</div>
                  </div>
                </a>
                <div className="nav-border">
                  <div className="blog-card-divider" />
                  <div className="blog-card-divider-hover" />
                </div>
              </div>
              <div className="single-nav-menu">
                <a aria-current={isActive("/project") ? "page" : undefined} className="nav-link-wrap inline-block" href="/project">
                  <div className="nav-link-texts">
                    <div className="nav-link-text">PROJECTS</div>
                    <div className="nav-link-text">PROJECTS</div>
                  </div>
                </a>
                <div className="nav-border">
                  <div className="blog-card-divider" />
                  <div className="blog-card-divider-hover" />
                </div>
              </div>
              <div className="single-nav-menu">
                <a aria-current={isActive("/blog") ? "page" : undefined} className="nav-link-wrap inline-block" href="/blog">
                  <div className="nav-link-texts">
                    <div className="nav-link-text">GUIDES</div>
                    <div className="nav-link-text">GUIDES</div>
                  </div>
                </a>
                <div className="nav-border">
                  <div className="blog-card-divider" />
                  <div className="blog-card-divider-hover" />
                </div>
              </div>
              <div className="single-nav-menu">
                <a aria-current={isActive("/contact") ? "page" : undefined} className="nav-link-wrap inline-block" href="/contact">
                  <div className="nav-link-texts">
                    <div className="nav-link-text">
                      CONTACT
                    </div>
                    <div className="nav-link-text">
                      CONTACT
                    </div>
                  </div>
                </a>
                <div className="nav-border">
                  <div className="blog-card-divider">
                  </div>
                  <div className="blog-card-divider-hover">
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-image-wrap">
              <div className="nav-social-wrap">
                <div className="small-text">
                  Interior Blinds &amp; Shutters.
                </div>
                <div className="nav-social-icon-wrap">
                  <a aria-label="Instagram" className="nav-social-icon-box inline-block" href="https://www.instagram.com/interiorblindsandshutters?utm_source=qr" rel="noopener noreferrer" target="_blank">
                    <img alt="" className="nav-social-icon" loading="lazy" src="/assets/images/iconoir_instagram.svg" />
                  </a>
                  <a aria-label="Facebook" className="nav-social-icon-box inline-block" href="https://www.facebook.com/profile.php?id=100092455395096&amp;mibextid=LQQJ4d" rel="noopener noreferrer" target="_blank">
                    <img alt="" className="nav-social-icon" loading="lazy" src="/assets/images/facebook.svg" />
                  </a>
                  <a aria-label="TikTok" className="nav-social-icon-box inline-block" href="https://www.tiktok.com/@interiorblindsandshutter?_t=8cHVXSJBb1N&amp;_r=1" rel="noopener noreferrer" target="_blank">
                    <img alt="" className="nav-social-icon" loading="lazy" src="/assets/images/tiktok.svg" />
                  </a>
                </div>
              </div>
              <div className="nav-image-box">
                <img alt="Modern two-story house with large glass windows, flat roofs, and a spacious green lawn with stepping stones." className="nav-image" loading="lazy" sizes="(max-width: 1140px) 100vw, 1140px, 100vw" src="/assets/images/nav-img.webp" srcSet="/assets/images/nav-img-p-500.webp 500w, /assets/images/nav-img-p-800.webp 800w, /assets/images/nav-img-p-1080.webp 1080w, /assets/images/nav-img.webp 1140w" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
