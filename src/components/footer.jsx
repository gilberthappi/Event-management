import React from "react";
import footerBgImg from "../assets/footer-back.jpg";

function footer() {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .95)), url(${footerBgImg})`, 
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <footer className="footer" style={backgroundStyle}>
      <div className="footer-container">
        <div className="footer-bottom">
          <div className="row">
            <div className="two-col copyright">
              <p className="copyright-text">
                Copyright &copy; 2024{" "}
                <a href="#">Happi</a>. All
                Rights Reserved.
              </p>
            </div>
            <div className="two-col copyright-link">
              <ul>
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
                <li className="side-border">
                  <a href="/">Terms of Use</a>
                </li>
                <li>
                  <a href="/">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default footer;
