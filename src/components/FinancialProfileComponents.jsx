import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from './Button.jsx';
import InputField from './InputField.jsx';


const FinancialIncome = ({ financialData, setFinancialData, onNext }) => {
  const handleNext = () => {
    // Perform any data validation or processing if needed
    onNext();
  };

  return (
    <div className='p-4 flex flex-col justify-start gap-4 h-full'>
      <label htmlFor="income" className="dark:text-white self-start font-semibold text-md">
        Income:
      </label>
      <InputField
        type="text"
        id="income"
        value={financialData.income}
        onChange={(e) => setFinancialData({ ...financialData, income: e.target.value })}
        placeholder='Enter your monthly income'
      />
      <Button onClick={handleNext} label="Next" icon={<FaArrowRight />} />
    </div>
  );
};

const FinancialExpenses = ({ financialData, setFinancialData, onPrev, onNext }) => {
  const handleNext = () => {
    // Perform any data validation or processing if needed
    onNext();
  };

  return (
    <div className='p-4 flex flex-col justify-start gap-4 h-full'>
      <label htmlFor="expenses" className="dark:text-white self-start font-semibold text-md">
        Expenses:
      </label>
      <InputField
        type="textarea"
        id="expenses"
        value={financialData.expenses}
        onChange={(e) => setFinancialData({ ...financialData, expenses: e.target.value })}
        placeholder='Enter your monthly expenses'
      />
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

  return (
    <div className='p-4 flex flex-col justify-start gap-4'>
      <label htmlFor="savings" className="dark:text-white self-start font-semibold text-md">
        Savings:
      </label>
      <InputField
        type="textarea"
        id="savings"
        value={financialData.savings}
        onChange={(e) => setFinancialData({ ...financialData, savings: e.target.value })}
        placeholder='Enter your current savings'
      />
      <div className="flex gap-3 self-end">
        <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
        <Button onClick={handleNext} label="Next" icon={<FaArrowRight />} />
      </div>
    </div>
  );
};

const FinancialGoals = ({ financialData, setFinancialData, onPrev, onNext }) => {
  const handleNext = () => {
    // Perform any data validation or processing if needed
    onNext();
  };

  return (
    <div className='p-4 flex flex-col justify-start  gap-4'>
      <label htmlFor="goals" className="dark:text-white self-start font-semibold text-md">
        Financial Goals:
      </label>
      <InputField
        type="textarea"
        id="goals"
        value={financialData.goals}
        onChange={(e) => setFinancialData({ ...financialData, goals: e.target.value })}
        placeholder='Enter your financial goals'
      />
      <div className="flex gap-3 self-end">
        <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
        <Button onClick={handleNext} label="Next" icon={<FaArrowRight />} />
      </div>
    </div>
  );
};

export { FinancialIncome, FinancialExpenses, FinancialSavings, FinancialGoals };
