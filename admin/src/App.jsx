import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddItem from "./pages/AddItem/AddItem";
import ListItem from "./pages/ListItem/ListItem";
import Order from "./pages/Order/Order";

const App = () => {
  const url = "http://localhost:3000";
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <main className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddItem url={url} />} />
          <Route path="/list-items" element={<ListItem url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
