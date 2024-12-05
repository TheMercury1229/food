import React from "react";
import "./Explore.scss";
import { menu_list } from "../../assets/assets";
const Explore = ({ category, setCategory }) => {
  return (
    <section className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p>
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience
        ,one delicious meal at a time.
      </p>
      <ul className="menu-list">
        {menu_list.map((item, i) => (
          <li
            className={`menu-item `}
            key={i}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              src={item.menu_image}
              alt="menu-image"
              className={category === item.menu_name ? "active" : ""}
            />
            {item.menu_name}
          </li>
        ))}
      </ul>
      <hr />
    </section>
  );
};

export default Explore;
