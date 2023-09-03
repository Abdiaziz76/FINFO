import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBill, FaShieldAlt, FaChartBar, FaRetweet, FaCreditCard, FaDollarSign, FaChartPie, FaHome, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import HomePage from '../../layouts/HomePage';

const LessonsCatalog = () => {
    const lessonsData = [
        {   icon: <FaMoneyBill />,
            title: 'Introduction to Budgeting',
            content:
              'In this comprehensive lesson, you will delve deep into the fundamentals of budgeting and financial planning. You will learn how to create a budget plan that aligns with your financial goals and objectives. Discover the importance of tracking expenses, setting savings goals, and making informed financial decisions. By the end of this lesson, you will have the knowledge and skills to take control of your finances and achieve financial stability.',
            
          },
        // Add more lessons here
        {
            icon: <FaShieldAlt />,
          title: 'Fraud Prevention',
          content: 'In this lesson, you will learn the basics of fraud prevention and how to create a budget plan',
        },
        {
            icon: <FaChartBar />,
          title: 'Investing Strategies',
          content: 'Discover various investment strategies and how to make informed investment decisions',
        },
        {
            icon: <FaRetweet />,
          title: 'Retirement Planning',
          content: 'Learn how to plan for a secure and comfortable retirement',
        },
        {
            icon: <FaCreditCard />,
            title: "Understanding Credit Cards",
            content: "Explore the world of credit cards, their benefits, risks, and how to use them wisely to build good credit."
          },
          {
            icon: <FaDollarSign />,
            title: "Mastering Tax Planning",
            content: "Learn the fundamentals of tax planning, deductions, credits, and strategies to optimize your tax return."
          },
          {
            icon: <FaChartPie />,
            title: "Diversifying Your Investments",
            content: "Discover the importance of diversifying your investment portfolio to manage risk and achieve your financial goals."
          },
          {
            icon: <FaHome />,
            title: "Real Estate Investing Basics",
            content: "Dive into the world of real estate investment, including buying, renting, and managing properties for financial gain."
          },
          {
            icon: <FaExclamationTriangle />,
            title: "Creating a Financial Safety Net",
            content: "Learn how to build and maintain an emergency fund to protect yourself from unexpected financial setbacks."
          }

        ];

  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonClick = (index) => {
    setSelectedLesson(index);
  };

  const handleBackToCatalog = () => {
    setSelectedLesson(null);
  };

  return (
    <div className="container mx-auto py-8 overflow-y-auto">
    
      {selectedLesson !== null ? (
        // Display a single lesson when a lesson is selected
        <div className="bg-slate-100 dark:bg-slate-600 p-4 rounded-lg shadow-sm transition duration-500">
              <span
              onClick={handleBackToCatalog}
              className="cursor-pointer text-blue-400 hover:text-blue-600 text-xl mr-2"
            >
              <FaArrowLeft /> {/* Arrow icon for back */}
            </span>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            {lessonsData[selectedLesson].title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {lessonsData[selectedLesson].content}
          </p>
         
        </div>
      ) : (
        // Display the lessons catalog when no lesson is selected
       
      
        <div>
             <h1 className="text-2xl font-semibold mb-4 dark:text-white">
        Lessons Catalog
      </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {lessonsData.map((lesson, index) => (
              <div
                key={index}
                className="bg-slate-200 flex flex-col justify-between dark:bg-slate-600 p-4 rounded-lg shadow-md transition duration-500"
              >
                  <span className="self-center flex items-center justify-center text-5xl text-blue-400">{lesson.icon} </span>
                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {lesson.content.slice(0, 151)}... {/* Truncate content to 150 characters */}
                </p>
                <button
                  onClick={() => handleLessonClick(index)}
                  className="text-blue-500 hover:underline dark:text-blue-400 "
                >
                  Learn More
                </button>
              </div>
            ))}
                  </div>
        </div>
      
      )}
    </div>
  );
};

export default HomePage(LessonsCatalog);
