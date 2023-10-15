import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from './Button.jsx';
import InputField from './InputField.jsx';



const LessonTitleStep = ({ lessonData, setLessonData, onNext }) => (
  <div className='p-4 flex flex-col justify-start gap-4 h-full'>
    <label htmlFor="title" className="dark:text-white self-start font-semibold text-md">
      Lesson Title:
    </label>
    <InputField
      type="text"
      id="title"
      value={lessonData.title}
      onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
      placeholder='lesson title here'
    />
    <Button onClick={onNext} label="Next" icon={<FaArrowRight />} />
  </div>
);

const LessonDescriptionStep = ({ lessonData, setLessonData, onPrev, onNext }) => (
  <div className='p-4 flex flex-col justify-start gap-4 h-full'>
    <label htmlFor="description" className="dark:text-white self-start font-semibold text-md">
      Lesson Description:
    </label>
    <InputField
      type="textarea"
      id="description"
      value={lessonData.description}
      onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
      placeholder='lesson description here'
    />
    <div className="flex gap-3 self-end">
      <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
      <Button onClick={onNext} label="Next" icon={<FaArrowRight />} />
    </div>
  </div>
);

const LessonQuestionsStep = ({ lessonData, setLessonData, onPrev, onNext }) => {
  const handleAddQuestion = () => {
    const updatedQuestions = [...lessonData.questions, { question: '' }];
    setLessonData({ ...lessonData, questions: updatedQuestions });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...lessonData.questions];
    updatedQuestions.splice(index, 1);
    setLessonData({ ...lessonData, questions: updatedQuestions });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...lessonData.questions];
    updatedQuestions[index].question = value;
    setLessonData({ ...lessonData, questions: updatedQuestions });
  };

  return (
    <div className='p-4 flex flex-col justify-start gap-4'>
      <h1 className='font-semibold'>Lesson Questions</h1>
      {lessonData.questions.map((question, index) => (
        <div key={index} className="flex gap-2 justify-between items-center">
          <InputField
            type="text"
            placeholder="Enter your question"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />
          <Button
            onClick={() => handleRemoveQuestion(index)}
            label="Remove"
            icon={<FaTimes />}
          />
        </div>
      ))}
      <Button
        onClick={handleAddQuestion}
        label="Add Question"
        icon={<FaPlus />}
      />
      <div className="flex gap-3 self-end">
        <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
        <Button onClick={onNext} label="Next" icon={<FaArrowRight />} />
      </div>
    </div>
  );
};


const LessonConfirmationStep = ({ lessonData, onPrev, onSubmit }) => (
  <div className="flex flex-col justify-between">
    <div className="flex flex-col self-start gap-2">
      <h1 className='font-semibold self-start'>Confirm Lesson Details</h1>
      <p className='text-md text-start'>
        <span className='font-semibold'>Lesson Title :</span> {lessonData.title}
      </p>
      <p className='text-md text-start'>
        <span className='font-semibold'>Lesson Description : </span> {lessonData.description}
      </p>
      <p className='text-md text-start flex flex-col'>
        <span className='font-semibold'>Lesson Questions : </span> {lessonData.questions.map((question) => <span className='ml-2'>{question.question}</span>)}
      </p>
    </div>
    <div className='flex gap-3 self-end'>
      <Button onClick={onPrev} label="Previous" icon={<FaArrowLeft />} />
      <Button onClick={onSubmit} label="Create Lesson" icon={null} />
    </div>
  </div>
);

export { LessonTitleStep, LessonDescriptionStep, LessonQuestionsStep, LessonConfirmationStep, Button, InputField };
