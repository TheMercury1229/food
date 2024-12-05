import React from "react";
import "./Sidebar.scss";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-options">
        <NavLink to="/add">
          <li className="sidebar-option">
            <img src={assets.add_icon} alt="add-item" />
            <p>Add Items</p>
          </li>
        </NavLink>
        <NavLink to="/list-items">
          <li className="sidebar-option">
            <img src={assets.order_icon} alt="order-item" />
            <p>List Items</p>
          </li>
        </NavLink>
        <NavLink to="/orders">
          <li className="sidebar-option">
            <img src={assets.order_icon} alt="parcel" />
            <p>Orders</p>
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
