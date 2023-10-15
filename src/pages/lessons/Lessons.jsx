import React, { useState } from 'react';
import LessonsCatalogue from './LessonsCatalogue';
import CreateLessonWizard from './LessonWizard';
import HomePage from '../../layouts/HomePage';
import { Button } from '../../components/Wizard.jsx';
import { FaPlus } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';

function Lessons() {
  const [showCatalogue, setShowCatalogue] = useState(true);

  const toggleView = () => {
    setShowCatalogue(!showCatalogue);
  };

  return (
    <div>
      <div className="flex justify w-full justify-between items-center flex-col sm:flex-row">
      <h1 className='sm:text-2xl font-semibold text-slate-400 text-start'>Browse Our popular lessons or create your own</h1>

        <Button
          onClick={toggleView}
          label={showCatalogue ? 'Create Your Lesson' : 'Browse Lessons'}
          icon={showCatalogue ? <FaPlus /> : <FaBookOpen />}
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full self-end"
        />
         
       
      </div>
      {showCatalogue ? <LessonsCatalogue /> : <CreateLessonWizard />}
    </div>
  );
}

export default HomePage(Lessons);
