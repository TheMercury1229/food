import React, { useContext, useState } from "react";
import "./FoodCard.scss";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/storeContext";
const FoodCard = ({ id, name, price, desc, img }) => {
  const { cartitemCount, addToCart, removeFromCart, url } =
    useContext(storeContext);
  return (
    <div className="food-card" id={id}>
      <div className="img-container">
        <img src={url + "/images/" + img} alt={name} className="img" />
        {!cartitemCount[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="counter">
            <img
              src={assets.remove_icon_red}
              alt="remove-item"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartitemCount[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-info">
        <div className="name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Ratings" />
        </div>
        <p className="food-desc">{desc}</p>
        <p className="price">$ {price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
