import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListItem.scss";
import axios from "axios";
const ListItem = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const removeFoodItem = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: id });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <section className="list add flex-col">
      <p className="heading">All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <div>
            <strong>Image</strong>
          </div>
          <div>
            <strong>Name</strong>
          </div>
          <div>
            <strong>Category</strong>
          </div>
          <div>
            <strong>Price</strong>
          </div>
          <div>
            <strong>Action</strong>
          </div>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <div>
              <img src={`${url}/images/${item.image}`} alt="food-item" />
            </div>
            <div>
              <p>{item.name}</p>
            </div>
            <div>
              <p>{item.category}</p>
            </div>
            <div>
              <p>{item.price}</p>
            </div>
            <div>
              <p className="cursor" onClick={() => removeFoodItem(item._id)}>
                X
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListItem;
