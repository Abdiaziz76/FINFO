import { FinancialProfileDataContext } from "../context/FinancialPofileDataProvider";
import { useContext } from "react";

export function useFinancialProfileData() {
    return useContext(FinancialProfileDataContext);
  }
  