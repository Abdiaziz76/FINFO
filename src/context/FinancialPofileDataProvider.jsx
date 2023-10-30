import { createContext, useContext, useState } from "react";

export const FinancialProfileDataContext = createContext();

export function FinancialProfileDataProvider({ children }) {
  const [financialData, setFinancialData] = useState({
    income: [
      {
        source: "",
        amount: "",
        frequency: "",
      },
    ],
    expenses: [
      {
        category: "",
        amount: "",
      },
    ],
    savings: [
      {
        type: "",
        amount: "",
      },
    ],
    goals: [
      {
        description: "",
        target: "",
      },
    ],
  });

  return (
    <FinancialProfileDataContext.Provider
      value={{ financialData, setFinancialData }}
    >
      {children}
    </FinancialProfileDataContext.Provider>
  );
}
