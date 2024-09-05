import React, { useState, createContext } from 'react';

export const BooksContext = createContext();
export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([
    { id: '1', title: 'React Native', author: 'John Doe', year: 2021, cover: 'https://via.placeholder.com/150' },
    { id: '2', title: 'JavaScript Basics', author: 'Jane Smith', year: 2020, cover: 'https://via.placeholder.com/150' },
  ]);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <BooksContext.Provider value={{ books, setBooks, addBook }}>
      {children}
    </BooksContext.Provider>
  );
};
