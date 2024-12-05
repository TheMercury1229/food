import React from "react";
import "./Header.scss";
const Header = () => {
  return (
    <header className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise . Our
          mission is to satisfy your cravings and elevate your dining experience
          ,one delicious meal at a time.
        </p>
        <button className="btn">View Menu</button>
      </div>
    </header>
  );
};

export default Header;
