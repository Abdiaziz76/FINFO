import React, { useState } from 'react';
import { FaMoneyBill, FaShieldAlt, FaChartBar, FaArrowLeft } from 'react-icons/fa';
import HomePage from '../layouts/HomePage';

const userCountry = "Kenya";

const LessonsCatalog = () => {
  const [lessonsData, setLessonsData] = useState([
    {
      icon: <FaMoneyBill />,
      title: 'Introduction to Budgeting',
      placeholder: 'Learn how to create a budget and manage your money',
      content: '',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Fraud Prevention',
      placeholder: 'Learn how to protect yourself from fraud and scams',
      content: '',
    },
    {
      icon: <FaChartBar />,
      title: 'Investing Strategies',
      placeholder: 'Discover various investment strategies and how to make informed investment decisions',
      content: '',
    },
  ]);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchLessonContent(lessonTitle) {
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    const systemMessage = [
      {
        role: 'system',
        content: `Explain ${lessonTitle} like you're talking to a novice in ${userCountry}. present the information in a way that is easy to understand. present the information in a readable manner, use titles and subtitles, and lists where necessary. Explain ${lessonTitle} as if you're creating a structured document for someone in ${userCountry}. Provide clear html tagged headings, use paragraphs, lists, and formatting for better readability. return rich text with html tags so as it is displayed properly to the user. strictly return HTML5 formatted text which contains only the body tag. you can add tailwind styles to the html tags to make the content more readable.`,
      },
    ];

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: systemMessage,
    };

    try {
      setIsLoading(true);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      return content;
    } catch (error) {
      console.error('Error fetching content:', error);
      return '';
    } finally {
      setIsLoading(false);
    }
  }

  const handleLessonClick = async (index) => {
    const lesson = lessonsData[index];
    if (!lesson.content) {
      const content = await fetchLessonContent(lesson.title);
      lesson.content = content;
      setSelectedLesson(index);
      const updatedLessonsData = [...lessonsData];
      setLessonsData(updatedLessonsData);
    } else {
      setSelectedLesson(index);
    }
  };

  const handleBackToCatalog = () => {
    setSelectedLesson(null);
  };

  return (
    <div className="container mx-auto py-8 overflow-y-auto">
      {isLoading ? (
        <div className="text-center dark:text-white text-xl">
          <p>Lesson is Loading...
           This might take upto 30 secs</p>
        </div>
      ) : selectedLesson !== null ? (
        <div className="bg-slate-100 dark:bg-slate-600 p-4 rounded-lg shadow-sm transition duration-500">
          <span
            onClick={handleBackToCatalog}
            className="cursor-pointer text-blue-400 hover:text-blue-600 text-xl mr-2"
          >
            <FaArrowLeft />
          </span>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            {lessonsData[selectedLesson].title}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: lessonsData[selectedLesson].content }} />
        </div>
      ) : (
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
                <span className="self-center flex items-center justify-center text-5xl text-blue-400">
                  {lesson.icon}{' '}
                </span>
                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {lesson.placeholder.slice(0, 151)}
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
          <CreateLessonWizard />
        </div>
      )}
    </div>
  );
};

export default HomePage(LessonsCatalog);


const CreateLessonWizard = () => {
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    tags: [],
    hasQuestions: false,
    questions: [],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Send the lessonData to your backend for lesson creation.
    // Implement the logic for creating a lesson.
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <label htmlFor="title" className="dark:text-white">
              Lesson Title:
            </label>
            <input
              type="text"
              id="title"
              value={lessonData.title}
              onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
              className="dark:bg-gray-700"
            />
            <button onClick={handleNext} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
              Next
            </button>
          </div>
        );

      case 2:
        return (
          <div>
            <label htmlFor="description" className="dark:text-white">
              Lesson Description:
            </label>
            <textarea
              id="description"
              value={lessonData.description}
              onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
              className="dark:bg-gray-700"
            />
            <button onClick={handlePrev} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
              Previous
            </button>
            <button onClick={handleNext} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
              Next
            </button>
          </div>
        );

      case 3:
        return (
          <div>
            <label className="dark:text-white">
              Does this lesson include questions?
            </label>
            <div>
              <input
                type="radio"
                id="hasQuestionsYes"
                name="hasQuestions"
                value="yes"
                checked={lessonData.hasQuestions}
                onChange={() => setLessonData({ ...lessonData, hasQuestions: true })}
              />
              <label htmlFor="hasQuestionsYes" className="dark:text-white">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="hasQuestionsNo"
                name="hasQuestions"
                value="no"
                checked={!lessonData.hasQuestions}
                onChange={() => setLessonData({ ...lessonData, hasQuestions: false })}
              />
              <label htmlFor="hasQuestionsNo" className="dark:text-white">No</label>
            </div>
            <button onClick={handlePrev} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
              Previous
            </button>
            <button onClick={handleNext} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
              Next
            </button>
          </div>
        );

      case 4:
        return (
          <div>
            {/* Include questions input fields here if hasQuestions is true */}
            <button onClick={handlePrev} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
              Previous
            </button>
            <button onClick={handleSubmit} className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
              Create Lesson
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create a New Lesson</h2>
      {renderStepContent()}
    </div>
  );
};

// export default CreateLessonWizard;
