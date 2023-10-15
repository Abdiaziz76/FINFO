import React, { useState } from 'react';
import { FinancialIncome, FinancialExpenses, FinancialSavings, FinancialGoals } from './FinancialSteps';

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
    <div className="dark:text-white p-4 rounded-lg mt-4 h-full">
      <h2 className="text-2xl font-semibold mb-4">Financial Profile Wizard</h2>
      {renderStepContent()}
      {currentStep === 4 && (
        <div className="flex gap-3 self-end">
          <button
            onClick={handlePrev}
            className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-6 py-4 self-end rounded-md text-white font-semibold"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white bg-blue-500 px-10 py-4 self-end rounded-md text-white font-semibold"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FinancialProfileWizard;
