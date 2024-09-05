import React, { createContext, useState } from 'react';

// Créer le contexte des produits
export const ItemsContext = createContext();

// Créer le fournisseur du contexte
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]); // Liste des produits
  const [cart, setCart] = useState([]); // Panier d'achat

  // Ajouter un produit au catalogue
  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // Ajouter un produit au panier
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, cart, addToCart }}>
      {children}
    </ItemsContext.Provider>
  );
};
