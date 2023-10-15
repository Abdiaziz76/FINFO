import React, { useState } from 'react';
import {
  LessonTitleStep,
  LessonDescriptionStep,
  LessonQuestionsStep,
  LessonConfirmationStep
} from '../../components/LessonWizard.jsx'

const CreateLessonWizard = () => {
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    tags: [],
    hasQuestions: false,
    questions: [
      {
        question: '',
      }
    ],
  });

  console.log('lessons', lessonData)

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
          <LessonTitleStep
            lessonData={lessonData}
            setLessonData={setLessonData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <LessonDescriptionStep
            lessonData={lessonData}
            setLessonData={setLessonData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <LessonQuestionsStep
            lessonData={lessonData}
            setLessonData={setLessonData}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <LessonConfirmationStep  lessonData={lessonData} onPrev={handlePrev} onSubmit={handleSubmit} />
        );
      default:
        return null;
    }
  };

  return (
    <div className=" dark:text-white p-4 rounded-lg  mt-4 h-full ">
      <h2 className="text-2xl font-semibold mb-4">Create a New Lesson</h2>
      {renderStepContent()}
    </div>
  );
};

export default CreateLessonWizard;
