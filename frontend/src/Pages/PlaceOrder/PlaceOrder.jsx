import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeContext } from "../../Context/storeContext";
const PlaceOrder = () => {
  const { getTotalAmount, token, foodList, cartitemCount, url } =
    useContext(storeContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async function (e) {
    e.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartitemCount[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartitemCount[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 20,
    };
    const response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error in placing order");
    }
  };
  useEffect(()=>{
if(!token){
  navigate("/cart")
}else if(getTotalAmount()===0){
  navigate("/cart")
}
  },[token])
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="First name"
            value={data.firstName}
            name="firstName"
            onChange={onChangeHandler}
          />
          <input
            required
            type="text"
            placeholder="Last name"
            value={data.lastName}
            name="lastName"
            onChange={onChangeHandler}
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email Address"
          value={data.email}
          name="email"
          onChange={onChangeHandler}
        />
        <input
          required
          type="text"
          placeholder="Street"
          value={data.street}
          name="street"
          onChange={onChangeHandler}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            value={data.city}
            name="city"
            onChange={onChangeHandler}
          />
          <input
            required
            type="text"
            placeholder="State"
            value={data.state}
            name="state"
            onChange={onChangeHandler}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="Zip Code"
            value={data.zipcode}
            name="zipcode"
            onChange={onChangeHandler}
          />
          <input
            required
            type="text"
            placeholder="Country"
            value={data.country}
            name="country"
            onChange={onChangeHandler}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Phone"
          value={data.phone}
          name="phone"
          onChange={onChangeHandler}
        />
      </div>
      <div className="right">
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
      </div>
    </form>
  );
};

export default PlaceOrder;
