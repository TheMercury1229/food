import { useContext, useEffect } from "react";
import "./Verify.scss";
import { storeContext } from "../../Context/storeContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const Verify = () => {
  const [searchParamsm, setSearchParams] = useSearchParams();
  const { url } = useContext(storeContext);
  const success = searchParamsm.get("success");
  const orderId = searchParamsm.get("order");
  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/order/verify`, {
      orderId,
      success,
    });
    if (response.data.success) {
      navigate("/my-orders");
    } else {
      navigate("/");
    }
  };
useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
