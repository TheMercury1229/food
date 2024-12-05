import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.scss";
import { storeContext } from "../../Context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets";
const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(storeContext);
  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/order/userorders`, {
      headers: { token },
    });
    const orders = await response.data.orders;
    setData(orders);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, []);
  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, i) => {
          return (
            <div key={i} className="order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, i) => {
                  if (i === order.items.length - 1) {
                    return item.name + "X" + item.quantity;
                  } else {
                    return item.name + "X" + item.quantity + ",";
                  }
                })}
              </p>
              <p>{order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <strong>{order.status}</strong>
              </p>
              <button onClick={()=>fetchOrders()}>
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
