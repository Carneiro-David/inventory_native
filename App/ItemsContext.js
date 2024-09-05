import React, { useState, createContext } from 'react';
import axios from 'axios';

export const ItemsContext = createContext();
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:5000/items");
      setItems(response.data);
    } catch (error) {
      if (!error.response) {
        console.log('Network error:', error);
      } else {
        console.error('Error response:', error.response);
      }
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await axios.post("http://10.0.2.2:5000/items", newItem);
      setItems([...items, response.data]);
    } catch (error) {
      console.log("Error in ItemsProvider.addItem:", error);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      const response = await axios.put(`http://10.0.2.2:5000/items/${id}`, updatedItem);
      const updatedItems = items.map(item => item.id === id ? response.data : item);
      setItems(updatedItems);
    } catch (error) {
      console.log("Error in ItemsProvider.updateItem:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:5000/items/${id}`);
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.log("Error in ItemsProvider.deleteItem:", error);
    }
  };

  if (items.length === 0) {
    getItems();
  }

  return (
    <ItemsContext.Provider value={{ items, setItems, getItems, addItem, updateItem, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  );
};
