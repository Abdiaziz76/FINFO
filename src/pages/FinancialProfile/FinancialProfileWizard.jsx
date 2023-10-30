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




const FinancialProfileWizard = ({ onProfile }) => {
  const {auth} = useAuth()
  const uid = auth.user_id

  const incomeUrl = "api/api/income/"
const expensesUrl = "api/api/expenses/"
const savingsUrl = "api/api/savings/"
const goalsUrl = "api/api/goals/"


const incomePost = usePost(incomeUrl);
const expensesPost = usePost(expensesUrl);
const savingsPost = usePost(savingsUrl);
const goalsPost = usePost(goalsUrl);

  const [financialData, setFinancialData] = useState({
    "income": [
        {
            "source": "dsjvsdkj",
            "amount": "kjnkjnk",
            "frequency": "jkhjkh",
            "user": "836aea3052e74f8290b6b5b4c7752b9d"
        }
    ],
    "expenses": [
        {
            "category": "kbjbkjb",
            "amount": "9876986",
            "user": "836aea3052e74f8290b6b5b4c7752b9d"
        },
        {
            "category": "jbkjbkj",
            "amount": "98798798",
            "user": "836aea3052e74f8290b6b5b4c7752b9d"
        }
    ],
    "savings": [
        {
            "type": "jbkjbkj",
            "amount": "87987987",
            "user": "836aea3052e74f8290b6b5b4c7752b9d"
        }
    ],
    "goals": [
        {
            "description": "jhgihgig",
            "target": "89798798",
            "user": "836aea3052e74f8290b6b5b4c7752b9d"
        },
        {
            "description": "kjbkjblj",
            "target": "87987987",
            "user": "836aea3052e74f8290b6b5b4c7752b9d"
        }
    ]
});

  console.log("financialData", financialData);
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


    incomePost.postData(...income);
    expensesPost.postData(...expenses);
    savingsPost.postData(...savings);
    goalsPost.postData(...goals);
    

  
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
          <div className="flex flex-col md:flex-row gap-4">
      <FinancialDataCard title="Income" items={financialData.income} />
      <FinancialDataCard title="Expenses" items={financialData.expenses} />
      <FinancialDataCard title="Savings" items={financialData.savings} />
      <FinancialDataCard title="Goals" items={financialData.goals} />
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
