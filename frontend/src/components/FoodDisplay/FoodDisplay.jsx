import React, { useContext } from "react";
import "./FoodDisplay.scss";
import { storeContext } from "../../Context/storeContext";
import FoodCard from "../FoodCard/FoodCard";
const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(storeContext);
  return (
    <section className="food-display" id="foodDisplay">
      <h2>Top Dishes Near You</h2>
      <ul className="food-display-list">
        {foodList &&
          foodList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <li key={index}>
                  <FoodCard
                    id={item._id}
                    name={item.name}
                    desc={item.description}
                    price={item.price}
                    img={item.image}
                  />
                </li>
              );
            }
          })}
      </ul>
    </section>
  );
};

export default FoodDisplay;
