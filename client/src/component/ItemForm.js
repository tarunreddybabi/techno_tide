import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemForm = ({ currentId, setCurrentId, items, setItems }) => {
  const [item, setItem] = useState({ name: "", description: "" });

  useEffect(() => {
    if (currentId) {
      axios
        .get(`http://localhost:8080/api/items/${currentId}`)
        .then((response) => setItem(response.data))
        .catch((err) => console.log(err));
    }
  }, [currentId]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      axios
        .put(`http://localhost:8080/api/items/${currentId}`, item)
        .then(() => {
          setItems(items.map((i) => (i._id === currentId ? item : i)));
          setItem({ name: "", description: "" });
          setCurrentId(null);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:8080/api/items", item)
        .then((response) => {
          setItems([...items, response.data]);
          setItem({ name: "", description: "" });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex",justifyContent:"center",alignContent:"center" }}
    >
      <div style={{marginRight:"2px"}}>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div style={{marginRight:"2px"}}>
        <input
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div>
        <button type="submit">{currentId ? "Update" : "Add"}</button>
      </div>
    </form>
  );
};

export default ItemForm;
