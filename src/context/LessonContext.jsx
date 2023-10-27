// FinancialLessonsContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const FinancialLessonsContext = createContext();

export const FinancialLessonsProvider = ({ children }) => {
  const [lessons, setLessons] = useState("");

  useEffect(() => {
    // Load Lessons from local storage when the component mounts
    const storedLessons = localStorage.getItem('financialLessons') || "";
    setLessons(storedLessons);
  }, []);

  // Save Lessons to local storage whenever Lessons change
  useEffect(() => {
    localStorage.setItem('financialLessons', lessons);
  }, [lessons]);

  const updateLessons = (newLessons) => {
    setLessons(newLessons);
  };

  const clearLessons = () => {
    setLessons("");
  };

  return (
    <FinancialLessonsContext.Provider value={{ lessons, updateLessons, clearLessons }}>
      {children}
    </FinancialLessonsContext.Provider>
  );
};

export const useFinancialLessons = () => {
  return useContext(FinancialLessonsContext);
};
