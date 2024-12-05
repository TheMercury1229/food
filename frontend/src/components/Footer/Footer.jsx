import React from "react";
import "./Footer.scss";
import { assets } from "../../assets/assets";
const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="Logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit
            esse quasi minima velit eos deleniti, reiciendis enim rem!
          </p>
          <ul className="social-links">
            <li>
              <img src={assets.facebook_icon} alt="facebook" />
            </li>
            <li>
              <img src={assets.linkedin_icon} alt="linkedin" />
            </li>
            <li>
              <img src={assets.twitter_icon} alt="twitter" />
            </li>
          </ul>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+120-1354-2531</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p>Copyright {new Date().getFullYear()} &copy; Tomato.com - All Rights Reserved </p>
    </footer>
  );
};

export default Footer;
