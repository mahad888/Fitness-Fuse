// CategoryContext.js
import React, { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('beginner');

  const value = {
    selectedCategory,
    setSelectedCategory,
  };

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
