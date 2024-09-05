import React, { useState, createContext } from 'react';
import axios from 'axios';

export const BooksContext = createContext();
export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:5000/books");
      setBooks(response.data);
    } catch (error) {
      if (!error.response) {
        console.log('Network error:', error);
      } else {
        console.error('Error response:', error.response);
      }
    }
  };

  const addBook = async (newBook) => {
    try {
      const response = await axios.post("http://10.0.2.2:5000/books", newBook);
      setBooks([...books, response.data]);
    } catch (error) {
      console.log("Error in BooksProvider.addBook:", error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      const response = await axios.put(`http://10.0.2.2:5000/books/${id}`, updatedBook);
      const updatedBooks = books.map(book => book.id === id ? response.data : book);
      setBooks(updatedBooks);
    } catch (error) {
      console.log("Error in BooksProvider.updateBook:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:5000/books/${id}`);
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.log("Error in BooksProvider.deleteBook:", error);
    }
  };

  if (books.length === 0) {
    getBooks();
  }

  return (
    <BooksContext.Provider value={{ books, setBooks, getBooks, addBook, updateBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
};
