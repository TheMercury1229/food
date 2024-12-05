import React, { useContext } from "react";
import "./Cart.scss";
import { storeContext } from "../../Context/storeContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartitemCount, foodList, removeFromCart, getTotalAmount, url } =
    useContext(storeContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <section className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, i) => {
          if (cartitemCount[item._id] > 0) {
            return (
              <>
                <div className="cart-item-title cart-items-item" key={i}>
                  <img
                    src={url + "/images/" + item.image}
                    alt=""
                    className="product-image"
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartitemCount[item._id]}</p>
                  <p style={{ fontWeight: "600" }}>
                    {item.price * cartitemCount[item._id]}
                  </p>
                  <p>
                    <img
                      src={assets.cross_icon}
                      alt="Remove"
                      onClick={() => removeFromCart(item._id)}
                    />
                  </p>
                </div>
                <hr  />
              </>
            );
          }
        })}
      </section>
      <section className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>$ {getTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {getTotalAmount() === 0 ? 0 : 20}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>$ {getTotalAmount() === 0 ? 0 : getTotalAmount() + 20}</p>
          </div>
          <button className="btn" onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code , Enter it here.</p>
            <div className="input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
