import React, { useState } from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import Explore from "../../components/Explore/Explore";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <main>
      {/* Header(Navbar) */}
      <Header />
      {/* Explore Component */}
      <Explore category={category} setCategory={setCategory} />
      {/* Food Display  */}
      <FoodDisplay category={category} />
      {/* App Download */}
      <AppDownload />
    </main>
  );
};

export default Home;
