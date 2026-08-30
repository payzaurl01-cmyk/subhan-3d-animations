// Nuvora template — this page's markup mirrors the original design; styling comes
// from /assets/css/styles.css. Edit copy and image sources directly below.
export default function Page404Page() {
  return (
    <>
      <div className="utility-page-wrap">
            <div className="utility-page-content">
              <img alt="" className="error-image" src="/assets/images/404.svg" />
              <h1 className="error-title">
                This template didn’t load!
              </h1>
              <p className="error-description">
                The page you are looking seems deleted or doesn’t exit anymore
              </p>
              <div className="error-button-wrap">
                <a className="primary-button inline-block" href="/">
                  <div className="primary-button-text-wrap">
                    <div className="primary-button-text">
                      BACK TO HOME
                    </div>
                    <div className="primary-button-hover-text">
                      BACK TO HOME
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
    </>
  );
}
