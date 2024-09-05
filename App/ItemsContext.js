import React, { createContext, useState } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, cart, addToCart }}>
      {children}
    </ItemsContext.Provider>
  );
};
