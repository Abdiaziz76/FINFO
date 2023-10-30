import { createContext, useContext, useState } from "react";

export const FinancialProfileDataContext = createContext();

export function FinancialProfileDataProvider({ children }) {
  const [financialData, setFinancialData] = useState({
    "income": [
    
    ],
    "expenses": [
  
    ],
    "savings": [
  
    ],
    "goals": [
 
    ]
  });

  return (
    <FinancialProfileDataContext.Provider value={{ financialData, setFinancialData }}>
      {children}
    </FinancialProfileDataContext.Provider>
  );
}
