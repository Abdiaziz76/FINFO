import React, { useState } from "react";
import {
  FinancialIncome,
  FinancialExpenses,
  FinancialSavings,
  FinancialGoals,
  FinancialRecommendations,
} from "../../components/FinancialProfileComponents.jsx";
import Button from "../../components/Button.jsx";
import { FaArrowLeft } from "react-icons/fa";
import useAuth from "../../hooks/useAuth.js";

const FinancialProfileWizard = ({ onProfile }) => {
  const {auth} = useAuth()
  const uid = auth.user_id

  const [financialData, setFinancialData] = useState({
    income: [{ income: "" }],
    expenses: [{ expenses: "" }],
    savings: [{ savings: "" }],
    goals: [{ goals: "" }],
  });

  // console.log("financialData", financialData);
  // console.log("financialData", financialData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitFinancialProfile = () => {
    // Process or submit the financial data as needed
    console.log("financialData", financialData);
    // destructuring the financialData object
    const { income, expenses, savings, goals } = financialData;
    console.log("income", income, "/n expenses", expenses, "savings", savings, "goals", goals);
  //  const incomeUrl = "http://localhost:5000/api/v1/financial/income"
  //   const expensesUrl = "http://localhost:5000/api/v1/financial/expenses"
  //   const savingsUrl = "http://localhost:5000/api/v1/financial/savings"
  //   const goalsUrl = "http://localhost:5000/api/v1/financial/goals"

  //   usePost(incomeUrl, income, uid)
  //   usePost(expensesUrl, expenses, uid)
  //   usePost(savingsUrl, savings, uid)
  //   usePost(goalsUrl, goals, uid)

  
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FinancialIncome
            financialData={financialData}
            setFinancialData={setFinancialData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <FinancialExpenses
            financialData={financialData}
            setFinancialData={setFinancialData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <FinancialSavings
            financialData={financialData}
            setFinancialData={setFinancialData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <FinancialGoals
            financialData={financialData}
            setFinancialData={setFinancialData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 6:
        return (
          <FinancialRecommendations
            financialData={financialData}
            setFinancialData={setFinancialData}
            onPrev={handlePrev}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark:text-white p-4 rounded-lg mt-4 h-full w-full flex flex-col">
      <h2 className="text-2xl text-slate-700 dark:text-slate-300 font-semibold mb-4">
        Get personalized Recommendations by building your financial profile
      </h2>
      {renderStepContent()}
      {currentStep === 5 && (
        <div className="flex flex-col gap-3 w-full">
          {/* Display profile content for confirmation */}
          <h4 className="font-semibold">Confirm Financial details</h4>
          <div className="flex flex-col gap-2 self-start w-full">
            <div className="flex gap-2 w-full">
              <h3 className="text-md w-1/6 text-right">Income</h3>
              <div className="text-left">
                {financialData.income.map((incomeData, index) => (
                  <div key={index}>
                    <p>{`Source: ${incomeData.source}`}</p>
                    <p>{`Amount: ${incomeData.amount}`}</p>
                    <p>{`Frequency: ${incomeData.frequency}`}</p>
                    <hr className="text-slate-900" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <h3 className="text-md w-1/6 text-right">Expenses</h3>
              <div className="text-left">
                {financialData.expenses.map((expenseData, index) => (
                  <div key={index}>
                    <p>{`Category: ${expenseData.category}`}</p>
                    <p>{`Amount: ${expenseData.amount}`}</p>
                    <hr className="text-slate-900" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <h3 className="text-md w-1/6 text-right">Savings</h3>
              <div className="text-left">
                {financialData.savings.map((savingsData, index) => (
                  <div key={index}>
                    <p>{`Type: ${savingsData.type}`}</p>
                    <p>{`Amount: ${savingsData.amount}`}</p>
                    <hr className="text-slate-900" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <h3 className="text-md w-1/6 text-right">Goals</h3>
              <div className="text-left">
                {financialData.goals.map((goalData, index) => (
                  <div key={index}>
                    <p>{`Description: ${goalData.description}`}</p>
                    <p>{`Target: ${goalData.target}`}</p>
                    <hr className="text-slate-900" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 self-end">
            <Button
              onClick={handlePrev}
              label={"Back"}
              icon={<FaArrowLeft />}
              className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
            />
            {onProfile ? (
              <Button
                onClick={handleSubmitFinancialProfile}
                label={"Submit"}
                className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
              />
            ) : (
              <Button
                onClick={handleNext}
                label={"Generate"}
                className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialProfileWizard;
