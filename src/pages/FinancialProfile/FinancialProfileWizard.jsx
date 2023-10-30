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
import usePost from "../../hooks/usePost.js";
import usePatch from "../../hooks/usePatch.js";
import { useFinancialProfileData } from "../../hooks/useFinancialProfileData.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";




const FinancialProfileWizard = ({ onProfile }) => {
  const {auth} = useAuth()
  const uid = auth.user_id
const axiosPrivate = useAxiosPrivate();

const incomeUrl = "api/api/income/"
const expensesUrl = "api/api/expenses/"
const savingsUrl = "api/api/savings/"
const goalsUrl = "api/api/goals/"



const incomePost = usePost(incomeUrl);
const expensesPost = usePost(expensesUrl);
const savingsPost = usePost(savingsUrl);
const goalsPost = usePost(goalsUrl);



const { financialData, setFinancialData } = useFinancialProfileData();

  console.log("financialData", financialData);
  // console.log("financialData", financialData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitFinancialProfile = async () => {
    // Process or submit the financial data as needed
    console.log("financialData", financialData);
    // destructuring the financialData object
    let { income, expenses, savings, goals } = financialData;
    //append user_id to each object
    income.forEach((income) => {
      income.user = uid;
    });
    expenses.forEach((expense) => {
      expense.user = uid;
    });
    savings.forEach((saving) => {
      saving.user = uid;
    });
    goals.forEach((goal) => {
      goal.user = uid;
    });

    


    console.log("income", income, "/n expenses", expenses, "savings", savings, "goals", goals);

    for (const item of income) {
      if (item.id) {
        // If an 'id' exists, it's an existing item, so send a patch request
        await axiosPrivate.patch(`api/api/income/${item.id}/`, item);
      } else {
        // If no 'id' exists, it's a new item, so send a post request
        const response = await axiosPrivate.post('api/api/income/', item);
        console.log('response', response)

      }
    }

    for (const item of expenses) {
      if (item.id) {
        await axiosPrivate.patch(`api/api/expenses/${item.id}/`, item);
      } else {
        const response = await axiosPrivate.post('api/api/expenses/', item);
        console.log('response', response)
       
      }
    }

    for (const item of savings) {
      if (item.id) {
        await axiosPrivate.patch(`api/api/savings/${item.id}/`, item);
      } else {
        const response = await axiosPrivate.post('api/api/savings/', item);
       console.log('response', response)
     
      }
    }

    for (const item of goals) {
      if (item.id) {
        await axiosPrivate.patch(`api/api/goals/${item.id}/`, item);
      } else {
        const response = await axiosPrivate.post('api/api/goals/', item);
       console.log('response', response)
      }
    }
    


  };

  const FinancialDataCard = ({ title, items }) => (
    <div className="rounded-lg shadow-md p-4 bg-white dark:bg-slate-800">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="mb-2 dark:text-slate-400">
          {Object.keys(item)
            .filter((key) => key !== "user") // Exclude "user" key
            .map((key) => (
              <p key={key} className="dark:text-slate-300">
                <span className="font-semibold">
                  {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                </span>
                <span className="ml-2">{item[key]}</span>
              </p>
            ))}
        </div>
      ))}
    </div>
  );
  
  

  
  

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
          <div className='flex flex-col md:flex-row flex-wrap gap-4 mt-3 w-full'>
        {/* Render the financial data in tabular form */}
        <table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Income</h4>

  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Source</th>
    <th className="p-2">Amount</th>
    <th className="p-2">Frequency</th>
  </tr>
  {financialData.income.map((incomeItem) => (
    <tr key={incomeItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{incomeItem.source}</td>
      <td className="p-2">{incomeItem.amount}</td>
      <td className="p-2">{incomeItem.frequency}</td>
    </tr>
  ))}
</table>

<table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Expenses</h4>
  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Category</th>
    <th className="p-2">Amount</th>
  </tr>
  {financialData.expenses.map((expenseItem) => (
    <tr key={expenseItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{expenseItem.category}</td>
      <td className="p-2">{expenseItem.amount}</td>
    </tr>
  ))}
</table>

<table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Savings</h4>

  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Type</th>
    <th className="p-2">Amount</th>
  </tr>
  {financialData.savings.map((savingsItem) => (
    <tr key={savingsItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{savingsItem.type}</td>
      <td className="p-2">{savingsItem.amount}</td>
    </tr>
  ))}
</table>

<table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Goals</h4>

  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Description</th>
    <th className="p-2">Target</th>
  </tr>
  {financialData.goals.map((goalItem) => (
    <tr key={goalItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{goalItem.description}</td>
      <td className="p-2">{goalItem.target}</td>
    </tr>
  ))}
</table>


        {/* Edit button to toggle the wizard */}
        {/* <Button onClick={toggleEditMode} label={'Edit'} /> */}
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
