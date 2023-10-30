import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const fetchAndFilterData = async (endpoint, userId) => {
const {axiosPrivate} = useAxiosPrivate();

    try {
      const response = await axiosPrivate.get(endpoint);
      const data = response.data;
  
      // Filter the data to get the profile data for the specific user
      const filteredData = data.filter((item) => item.user === userId);
  
      return filteredData;
    } catch (error) {
      throw new Error(`Failed to fetch data from ${endpoint}.`);
    }
  };


const UseFetchFinancialProfile = () => {
  const [financialData, setFinancialData] = useState({
    income: [],
    expenses: [],
    savings: [],
    goals: [],
  });
const {auth} = useAuth();

    const userId = auth.user_id;

    // Fetch and update income data for the user
    const fetchIncomeData = async () => {
      try {
        const incomeData = await fetchAndFilterData(incomeUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          income: incomeData,
        }));
      } catch (error) {
        console.error("Failed to fetch income data: ", error);
      }
    };

    // Fetch and update expenses data for the user
    const fetchExpensesData = async () => {
      try {
        const expensesData = await fetchAndFilterData(expensesUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          expenses: expensesData,
        }));
      } catch (error) {
        console.error("Failed to fetch expenses data: ", error);
      }
    };

    // Fetch and update savings data for the user
    const fetchSavingsData = async () => {
      try {
        const savingsData = await fetchAndFilterData(savingsUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          savings: savingsData,
        }));
      } catch (error) {
        console.error("Failed to fetch savings data: ", error);
      }
    };

    // Fetch and update goals data for the user
    const fetchGoalsData = async () => {
      try {
        const goalsData = await fetchAndFilterData(goalsUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          goals: goalsData,
        }));
      } catch (error) {
        console.error("Failed to fetch goals data: ", error);
      }
    };

    // Fetch data only once, after the initial render
    fetchIncomeData();
    fetchExpensesData();
    fetchSavingsData();
    fetchGoalsData();


 return { financialData };
};

export default UseFetchFinancialProfile;
