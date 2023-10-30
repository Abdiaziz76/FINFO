import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from './Button.jsx';
import InputField from './InputField.jsx';
import { useFinancialRecommendations } from '../context/recommendationsContext.jsx';


const FinancialIncome = ({ financialData, setFinancialData, onNext }) => {
  const handleNext = () => {
    // Perform any data validation or processing if needed
    onNext();
  };

  const handleAddIncome = () => {
    //if financialdatta income is 
    const updatedIncome = [...financialData.income, { source: '', amount: 0, frequency: '' }];
    setFinancialData({ ...financialData, income: updatedIncome });
  };

  const handleRemoveIncome = (index) => {
    const updatedIncome = [...financialData.income];
    updatedIncome.splice(index, 1);
    setFinancialData({ ...financialData, income: updatedIncome });
  };

  return (
    <div className='p-4 flex flex-col justify-start gap-4 h-full'>
      <label htmlFor="income" className="dark:text-white self-start font-semibold text-md">
        Income:
      </label>
      {financialData.income.map((income, index) => (
        <div key={index} className="flex flex-col-reverse sm:flex-row border rounded-lg dark:border-slate-400 sm:border-none p-2 sm:p-0 gap-4">
          <InputField
            type="text"
            placeholder='Income source'
            value={income.source}
            onChange={(e) => {
              const updatedIncome = [...financialData.income];
              updatedIncome[index].source = e.target.value;
              setFinancialData({ ...financialData, income: updatedIncome });
            }}
          />
          <InputField
            type="text"
            placeholder='Amount'
            value={income.amount}
            onChange={(e) => {
              const updatedIncome = [...financialData.income];
              updatedIncome[index].amount = e.target.value;
              setFinancialData({ ...financialData, income: updatedIncome });
            }}
          />
          <InputField
            type="text"
            placeholder='Frequency'
            value={income.frequency}
            onChange={(e) => {
              const updatedIncome = [...financialData.income];
              updatedIncome[index].frequency = e.target.value;
              setFinancialData({ ...financialData, income: updatedIncome });
            }}
          />
          <Button
            onClick={() => handleRemoveIncome(index)}
            label="Remove"
            icon={<FaTimes />}
          />
        </div>
      ))}
      <Button onClick={handleAddIncome} label="Add Income" icon={<FaPlus />} />
      <Button onClick={handleNext} label="Next" icon={<FaArrowRight />} />
    </div>
  );
};


const FinancialExpenses = ({ financialData, setFinancialData, onPrev, onNext }) => {
  const handleNext = () => {
    // Perform any data validation or processing if needed
    onNext();
  };

  const handleAddExpense = () => {
    const updatedExpenses = [...financialData.expenses, { category: '', amount: 0 }];
    setFinancialData({ ...financialData, expenses: updatedExpenses });
  };

  const handleRemoveExpense = (index) => {
    const updatedExpenses = [...financialData.expenses];
    updatedExpenses.splice(index, 1);
    setFinancialData({ ...financialData, expenses: updatedExpenses });
  };

  return (
    <div className='p-4 flex flex-col justify-start gap-4 h-full'>
      <label htmlFor="expenses" className="dark:text-white self-start font-semibold text-md">
        Expenses:
      </label>
      {financialData.expenses.map((expense, index) => (
        <div key={index} className="flex flex-col-reverse sm:flex-row border rounded-lg dark:border-slate-400 sm:border-none p-2 sm:p-0 gap-4">
          <InputField
            type="text"
            placeholder='Expense category'
            value={expense.category}
            onChange={(e) => {
              const updatedExpenses = [...financialData.expenses];
              updatedExpenses[index].category = e.target.value;
              setFinancialData({ ...financialData, expenses: updatedExpenses });
            }}
          />
          <InputField
            type="text"
            placeholder='Amount'
            value={expense.amount}
            onChange={(e) => {
              const updatedExpenses = [...financialData.expenses];
              updatedExpenses[index].amount = e.target.value;
              setFinancialData({ ...financialData, expenses: updatedExpenses });
            }}
          />
          <Button
            onClick={() => handleRemoveExpense(index)}
            label="Remove"
            icon={<FaTimes />}
          />
        </div>
      ))}
      <Button onClick={handleAddExpense} label="Add Expense" icon={<FaPlus />} />
      <div className="flex gap-3 self-end">
        <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
        <Button onClick={handleNext} label="Next" icon={<FaArrowRight />} />
      </div>
    </div>
  );
};

const FinancialSavings = ({ financialData, setFinancialData, onPrev, onNext }) => {
  const handleNext = () => {
    // Perform any data validation or processing if needed
    onNext();
  };

  const handleAddSavings = () => {
    const updatedSavings = [...financialData.savings, { type: '', amount: 0 }];
    setFinancialData({ ...financialData, savings: updatedSavings });
  };

  const handleRemoveSavings = (index) => {
    const updatedSavings = [...financialData.savings];
    updatedSavings.splice(index, 1);
    setFinancialData({ ...financialData, savings: updatedSavings });
  };

  return (
    <div className='p-4 flex flex-col justify-start gap-4'>
      <label htmlFor="savings" className="dark:text-white self-start font-semibold text-md">
        Savings:
      </label>
      {financialData.savings.map((savings, index) => (
        <div key={index} className="flex flex-col-reverse sm:flex-row border rounded-lg dark:border-slate-400 sm:border-none p-2 sm:p-0 gap-4">
          <InputField
            type="text"
            placeholder='Savings type'
            value={savings.type}
            onChange={(e) => {
              const updatedSavings = [...financialData.savings];
              updatedSavings[index].type = e.target.value;
              setFinancialData({ ...financialData, savings: updatedSavings });
            }}
          />
          <InputField
            type="text"
            placeholder='Amount'
            value={savings.amount}
            onChange={(e) => {
              const updatedSavings = [...financialData.savings];
              updatedSavings[index].amount = e.target.value;
              setFinancialData({ ...financialData, savings: updatedSavings });
            }}
          />
          <Button
            onClick={() => handleRemoveSavings(index)}
            label="Remove"
            icon={<FaTimes />}
          />
        </div>
      ))}
      <Button onClick={handleAddSavings} label="Add Savings" icon={<FaPlus />} />
      <div className="flex gap-3 self-end">
        <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
        <Button onClick={handleNext} label="Next" icon={<FaArrowRight />} />
      </div>
    </div>
  );
};


const FinancialRecommendations = ({ financialData, onPrev, onNext }) => {
  const { recommendations, updateRecommendations, clearRecommendations } = useFinancialRecommendations();
  // const [recommendations, setRecommendations] = useState("");
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Your OpenAI API key
  const userCountry = "Kenya"; // TODO: Get my country from the user profile
  const [isLoading, setIsLoading] = useState(false);

    const generateRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await fetchRecommendations(apiKey, financialData);

        // Set the generated recommendations in the state
        updateRecommendations(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error generating recommendations: ", error);
      }
    };
const handleSubmit = () => {
  generateRecommendations();
}
 

  const fetchRecommendations = async (apiKey, financialData) => {
    const systemMessage = [
      {
        role: "system",
        content: `
        This is a financial recommendation system. Please provide detailed financial advice based on my data, which includes income, expenses, savings, and goals. my country is ${userCountry}.
      
        <div class="dark:text-white">
          <h2 class="text-2xl font-semibold mb-4">Financial Recommendations</h2>
      
          <h3 class="text-lg font-semibold mb-2">Financial Data</h3>
      
          <h4 class="text-lg font-semibold mb-2">Income</h4>
          <table class="w-full mb-4">
            <tr class="border border-slate-500 dark:border-slate-200 ">
              <th class="p-2">Source</th>
              <th class="p-2">Amount</th>
              <th class="p-2">Frequency</th>
            </tr>
            ${financialData.income.map((incomeItem) => (
              `<tr class="border border-slate-500 dark:border-slate-200 ">
                <td class="p-2">${incomeItem.source}</td>
                <td class="p-2">${incomeItem.amount}</td>
                <td class="p-2">${incomeItem.frequency}</td>
              </tr>`
            )).join('')}
          </table>
      
          <h4 class="text-lg font-semibold mb-2">Expenses</h4>
          <table class="w-full mb-4">
            <tr class="border border-slate-500 dark:border-slate-200 ">
              <th class="p-2">Category</th>
              <th class="p-2">Amount</th>
            </tr>
            ${financialData.expenses.map((expenseItem) => (
              `<tr class="border border-slate-500 dark:border-slate-200 ">
                <td class="p-2">${expenseItem.category}</td>
                <td class="p-2">${expenseItem.amount}</td>
              </tr>`
            )).join('')}
          </table>
      
          <h4 class="text-lg font-semibold mb-2">Savings</h4>
          <table class="w-full mb-4">
            <tr class="border border-slate-500 dark:border-slate-200 ">
              <th class="p-2">Type</th>
              <th class="p-2">Amount</th>
            </tr>
            ${financialData.savings.map((savingsItem) => (
              `<tr class="border border-slate-500 dark:border-slate-200 ">
                <td class="p-2">${savingsItem.type}</td>
                <td class="p-2">${savingsItem.amount}</td>
              </tr>`
            )).join('')}
          </table>
      
          <h4 class="text-lg font-semibold mb-2">Goals</h4>
          <table class="w-full mb-4">
            <tr class="border border-slate-500 dark:border-slate-200 ">
              <th class="p-2">Description</th>
              <th class="p-2">Target</th>
            </tr>
            ${financialData.goals.map((goalItem) => (
              `<tr class="border border-slate-500 dark:border-slate-200 ">
                <td class="p-2">${goalItem.description}</td>
                <td class="p-2">${goalItem.target}</td>
              </tr>`
            )).join('')}
          </table>
          in the response kindly use tables to display data. 
    <h3 class="text-lg font-semibold mb-2">Budget</h3>
    <p class="mb-4">
      To create a budget tailored to my financial situation, consider their income, expenses, savings, and goals. Suggest an optimal budgeting plan that helps them manage their finances effectively.
    </p>

    <h3 class="text-lg font-semibold mb-2">Savings</h3>
    <p class="mb-4">
      Provide recommendations on how the user can enhance their savings strategy. Suggest savings goals and tips to achieve them.
    </p>

    <h3 class="text-lg font-semibold mb-2">Investments</h3>
    <p class="mb-4">
      Recommend investment strategies based on my financial goals. Suggest investment options, risk assessment, and potential returns.
    </p>

    <h3 class="text-lg font-semibold mb-2">Debt Management</h3>
    <p class="mb-4">
      Advise the user on how to manage debt effectively. Recommend strategies for paying off existing debts and avoiding new ones.
    </p>

    <h3 class="text-lg font-semibold mb-2">Financial Goals</h3>
    <p class="mb-4">
      Based on my financial goals, provide a plan to achieve them. Suggest timeframes, savings strategies, and milestones.
    </p>
        </div>
      `,
      

      
      },
    ];

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: systemMessage,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching content:', error);
      return '';
    }
  };

  return (
    <div className="dark:text-white p-4 rounded-lg mt-4 h-full w-full flex flex-col">
      {isLoading ? (<div className="flex flex-col justify-center items-center h-full">
        <h2 className="text-xl text-slate-600 dark:text-slate-300 font-semibold mb-4">
          Generating Recommendations for you...This might take a while
        </h2>
        <div className="animate-spin dark:text-white dark:border-white rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>)
      :(<div>
        <h2 className="text-2xl text-slate-600 dark:text-slate-300 font-semibold mb-4">
          AI-Generated Financial Recommendations
        </h2>
        <div className="text-left mb-4" dangerouslySetInnerHTML={{ __html: recommendations }} />
      </div>)}
      <div className="flex flex-row gap-3 self-end">
       
        <Button
          onClick={handleSubmit}
          label={"Generate"}
          disabled = {isLoading}
          className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
        />
         <Button
          onClick={onPrev}
          label={"Back"}
          icon={<FaArrowLeft />}
          className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
        />
      </div>
    </div>
  );
};

export default FinancialRecommendations;



const FinancialGoals = ({ financialData, setFinancialData, onPrev, onNext }) => {
  const handleNext = () => {
    // Perform any data validation or processing if needed
    onNext();
  };

  const handleAddGoal = () => {
    const updatedGoals = [...financialData.goals, { description: '', target: 0 }];
    setFinancialData({ ...financialData, goals: updatedGoals });
  };

  const handleRemoveGoal = (index) => {
    const updatedGoals = [...financialData.goals];
    updatedGoals.splice(index, 1);
    setFinancialData({ ...financialData, goals: updatedGoals });
  };

  return (
    <div className='p-4 flex flex-col justify-start gap-4'>
      <label htmlFor="goals" className="dark:text-white self-start font-semibold text-md">
        Financial Goals:
      </label>
      {financialData.goals.map((goal, index) => (
        <div key={index} className="flex flex-col-reverse sm:flex-row border rounded-lg dark:border-slate-400 sm:border-none p-2 sm:p-0 gap-4">
          <InputField
            type="text"
            placeholder='Goal description'
            value={goal.description}
            onChange={(e) => {
              const updatedGoals = [...financialData.goals];
              updatedGoals[index].description = e.target.value;
              setFinancialData({ ...financialData, goals: updatedGoals });
            }}
          />
          <InputField
            type="text"
            placeholder='Target amount'
            value={goal.target}
            onChange={(e) => {
              const updatedGoals = [...financialData.goals];
              updatedGoals[index].target = e.target.value;
              setFinancialData({ ...financialData, goals: updatedGoals });
            }}
          />
          <Button
            onClick={() => handleRemoveGoal(index)}
            label="Remove"
            icon={<FaTimes />}
          />
        </div>
      ))}
      <Button onClick={handleAddGoal} label="Add Goal" icon={<FaPlus />} />
      <div className="flex gap-3 self-end">
        <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
        <Button onClick={handleNext} label="Next" icon={<FaArrowRight />} />
      </div>
    </div>
  );
};


export { FinancialIncome, FinancialExpenses, FinancialSavings, FinancialGoals, FinancialRecommendations };
