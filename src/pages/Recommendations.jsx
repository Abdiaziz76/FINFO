import React, { useState, useEffect } from 'react';
import { useFinancialRecommendations } from '../context/recommendationsContext';
import HomePage from '../layouts/HomePage';
import ChatHeader from './ChatHeader';
import FinancialProfileWizard from './FinancialProfile/FinancialProfileWizard.jsx';
import html2pdf from 'html2pdf.js';
import Button from '../components/Button';
import { FaDownload } from 'react-icons/fa';
import { FcExpand, FcCollapse } from 'react-icons/fc';

const Recommendations = () => {
  const { recommendations } = useFinancialRecommendations();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(prefersDarkMode.matches);
  }, []);

  const downloadRecommendationsAsPDF = () => {
    
    // Create a PDF from the recommendations content

    const element = document.getElementById('recommendations-content');
  
let opt = {
  margin:       1,
  filename:     'myrecommendations.pdf',
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
    html2pdf()
      .from(element)
      .set(opt)
      .save();
  };

  return (
    <div className="dark:text-slate-200 h-full">
      {/* <ChatHeader /> */}
      <div className="flex mt-8 flex-col  p-4 h-full">
        {recommendations ? (
          // If recommendations exist in the context, display them in an expandable card
          <div>
            
            <div
              className={` flex flex-col rounded-md shadow-md border dark:border-slate-700 p-4 ${isExpanded ? 'mb-4' : 'mb-8'}`}
            >
              <h1 className="text-2xl font-semibold mb-4 cursor-pointer" onClick={toggleExpand}>
                {!isExpanded ? <span ><FcExpand /> Click Here to view</span> : <FcCollapse /> }  Your Financial Recommendations 
              </h1>
              {isExpanded && (
              <div className="self-end"><Button onClick={downloadRecommendationsAsPDF} label={'Download Plan'} icon={<FaDownload />} /></div>
            )}
              {isExpanded && (
                <div
                  id="recommendations-content"
                  className={`text-left dark:bg-slate-800`}
                  dangerouslySetInnerHTML={{ __html: recommendations }}
                />
              )}
            </div>
          
          </div>
        ) : (
          // If recommendations do not exist, display the FinancialProfileWizard
          <FinancialProfileWizard />
        )}
      </div>
    </div>
  );
};

export default HomePage(Recommendations);
