
import React, { createContext, useContext, useState } from 'react';

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [selectedDiet, setSelectedDiet] = useState('basic');

  const chooseDiet = (dietType) => {
    setSelectedDiet(dietType);
  };

  return (
    <DietContext.Provider value={{ selectedDiet, chooseDiet }}>
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => {
  const context = useContext(DietContext);
  if (!context) {
    throw new Error('useDiet must be used within a DietProvider');
  }
  return context;
};
