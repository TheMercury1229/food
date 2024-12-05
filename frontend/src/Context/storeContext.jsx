import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [cartitemCount, setCartItemCount] = useState(0);
  const [token, setToken] = useState("");
  const url = VITE_BACKEND_URL;
  const addToCart = async (itemId) => {
    if (!cartitemCount[itemId]) {
      setCartItemCount((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItemCount((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItemCount((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        {
          headers: { token },
        }
      );
    }
  };
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (let item in cartitemCount) {
      if (cartitemCount[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartitemCount[item];
      }
    }
    return totalAmount;
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await localCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const localCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItemCount(response.data.cartData);
  };
  const fetchFoodList = async () => {
    const response = axios.get(url + "/api/food/list");
    setFoodList((await response).data.data);
  };
  const contextValue = {
    foodList,
    cartitemCount,
    setCartItemCount,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
  };
  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};
export default StoreContextProvider;
