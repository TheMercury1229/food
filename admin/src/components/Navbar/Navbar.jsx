import React from "react";
import "./Navbar.scss";
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <img src={assets.profile_image} alt="" className="profile-img" />
    </nav>
  );
};

export default Navbar;
