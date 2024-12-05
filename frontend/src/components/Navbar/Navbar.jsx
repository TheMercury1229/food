import React, { useContext, useState } from "react";
import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../../Context/storeContext";
const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const navLinks = ["Home", "Menu", "Mobile App", "Contact Us"];
  const links = ["#", "#explore-menu", "#app-download", "#footer"];
  const [navActive, setNavActive] = useState("Home");
  const { getTotalAmount, token, setToken } = useContext(storeContext);
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>

      <ul className="nav-menu">
        {navLinks.map((navLink, i) => (
          <li
            key={i}
            className={navLink === navActive ? "active" : ""}
            onClick={() => setNavActive(navLink)}
          >
            <a
              href={links[i]}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {navLink}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-cart">
          <Link to={"/cart"}>
            {" "}
            <img src={assets.basket_icon} alt="Add to Cart" />
          </Link>
          {getTotalAmount() > 0 ? <div className="dot"></div> : <></>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="nav-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/my-orders")}>
                <img src={assets.bag_icon} alt="cart" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
