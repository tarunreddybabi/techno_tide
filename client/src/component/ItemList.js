import React from 'react';
import axios from 'axios';

const ItemList = ({ items, setItems, setCurrentId }) => {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/items/${id}`)
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button onClick={() => setCurrentId(item._id)} style={{marginRight:"2px"}}>Edit</button>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
