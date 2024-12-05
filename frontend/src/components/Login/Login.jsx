import React, { useContext, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/storeContext";
const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const { url, setToken } = useContext(storeContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      setErr(response.data.message);
    }
  };
  return (
    <div className="login">
      <form className="login-container" onSubmit={onLogin}>
        <div className="title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
        </div>
        <div className="input">
          {currentState === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              required
              name="name"
              onChange={onChangeHandler}
              value={data.name}
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="btn" type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Log In"}
        </button>
        <div className="condition">
          <input type="checkbox" required />
          <p className="text">
            By Continuing, I agree to the terms and conditions
          </p>
        </div>
        {currentState === "Log In" ? (
          <p className="bottom">
            Create a new Account ?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="bottom">
            Already have an Account ?
            <span onClick={() => setCurrentState("Log In")}> Click Here</span>
          </p>
        )}
      {err ? <p className="error">{err}</p> : <></>}
      </form>
    </div>
  );
};

export default Login;
