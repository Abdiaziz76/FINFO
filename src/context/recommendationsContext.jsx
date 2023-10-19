// FinancialRecommendationsContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const FinancialRecommendationsContext = createContext();

export const FinancialRecommendationsProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState("");

  useEffect(() => {
    // Load recommendations from local storage when the component mounts
    const storedRecommendations = localStorage.getItem('financialRecommendations') || "";
    setRecommendations(storedRecommendations);
  }, []);

  // Save recommendations to local storage whenever recommendations change
  useEffect(() => {
    localStorage.setItem('financialRecommendations', recommendations);
  }, [recommendations]);

  const updateRecommendations = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  const clearRecommendations = () => {
    setRecommendations("");
  };

  return (
    <FinancialRecommendationsContext.Provider value={{ recommendations, updateRecommendations, clearRecommendations }}>
      {children}
    </FinancialRecommendationsContext.Provider>
  );
};

export const useFinancialRecommendations = () => {
  return useContext(FinancialRecommendationsContext);
};
