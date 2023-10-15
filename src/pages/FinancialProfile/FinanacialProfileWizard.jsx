import React, { useState } from 'react';
import { FinancialIncome, FinancialExpenses, FinancialSavings, FinancialGoals } from '../../components/FinancialProfileComponents.jsx';
import Button from '../../components/Button.jsx';
import { FaArrowLeft } from 'react-icons/fa';

const FinancialProfileWizard = () => {
  const [financialData, setFinancialData] = useState({
    income: '',
    expenses: '',
    savings: '',
    goals: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Process or submit the financial data as needed
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
      default:
        return null;
    }
  };

  return (
    <div className="dark:text-white p-4 rounded-lg mt-4 h-full w-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Financial Profile Wizard</h2>
      {renderStepContent()}
      {currentStep === 5 && (
        <div className="flex flex-col gap-3 w-full">
          {/* display profile content for confirmation */}
          <div className="flex flex-col gap-2 self-start w-full">
            <div className="flex gap-2 w-full ">
              <h3 className="text-md w-1/6 text-right">Income</h3>
              <p className='text-left '>{financialData.income}</p>
            </div>
            <div className="flex gap-2 w-full ">
              <h3 className="text-md w-1/6 text-right">Expenses</h3>
              <p className='text-left '>{financialData.expenses}</p>
            </div>
            <div className="flex gap-2 w-full ">
              <h3 className="text-md w-1/6 text-right">Savings</h3>
              <p className='text-left '>{financialData.savings}</p>
            </div>
            <div className="flex gap-2 w-full ">
              <h3 className="text-md w-1/6 text-right">Goals</h3>
              <p className='text-left '>{financialData.goals}</p>
            </div>
          </div>
          <div className="flex flex-row gap-3 self-end">
            <Button
              onClick={handlePrev}
              label={'Back'}
              icon= {<FaArrowLeft/>}
              className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
            />
            <Button
              onClick={handleSubmit}
              label={'Submit'}
              className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
            />
          </div>
          {/* <button
            onClick={handleSubmit}
            className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-5 py-3 self-end rounded-md text-white font-semibold"
          >
            Submit
          </button> */}
        </div>
      )}
    </div>
  );
};

export default FinancialProfileWizard;
