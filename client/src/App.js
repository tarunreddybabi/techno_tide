import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './component/ItemForm';
import ItemList from './component/ItemList';

const App = () => {
  const [items, setItems] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/items')
      .then(response => setItems(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <ItemForm currentId={currentId} setCurrentId={setCurrentId} items={items} setItems={setItems} />
      <ItemList items={items} setItems={setItems} setCurrentId={setCurrentId} />
    </div>
  );
};

export default App;
