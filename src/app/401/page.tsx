// Nuvora template — this page's markup mirrors the original design; styling comes
// from /assets/css/styles.css. Edit copy and image sources directly below.
export default function Page401Page() {
  return (
    <>
      <section className="section ulility-hero">
            <div className="style-container">
              <div className="style-title-box-wrapper password">
                <div className="uttlity-title-box">
                  <div className="title-box margin-none">
                    <div className="animation-content-wrap">
                      <div className="animation-content">
                        <div className="title-flex">
                          <h1 className="utlitty-inner-title">
                            Password Protected
                          </h1>
                          <p className="style-details">
                            At Nuvora, we prioritize safeguarding your personal data and protecting your privacy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="utility-lock-page-wrap">
            <div className="utility-lock-page-content reveal">
              <form className="utility-lock-page-form" data-demo-form="1" data-name="Email Form" id="email-form" name="email-form">
                <div className="lock-box reveal">
                  <img alt="" className="lock-icon" src="/assets/images/key-01.svg" />
                </div>
                <h2 className="lock-title reveal">
                  Protected Page
                </h2>
                <p className="description-regular reveal">
                  This page is secured with a password. If you're the website administrator or have access, please enter your password below.
                </p>
                <label className="display-none" htmlFor="pass">
                  Password
                </label>
                <div className="lock-field-wrap reveal">
                  <input autoFocus className="lock-field wf-input" data-name="field" id="pass" maxLength={256} name="pass" placeholder="Enter your password" type="password" />
                  <input className="lock-button wf-button" type="submit" value="Submit Now" />
                </div>
                <div className="wf-form-fail" data-form-fail="1" hidden>
                  <div>
                    Incorrect password. Please try again.
                  </div>
                </div>
                <div className="is-hidden">
                  <input name="path" type="hidden" value="&lt;%WF_FORM_VALUE_PATH%&gt;" />
                  <input name="page" type="hidden" value="&lt;%WF_FORM_VALUE_PAGE%&gt;" />
                </div>
                <div className="is-hidden">
                </div>
              </form>
            </div>
          </div>
    </>
  );
}
