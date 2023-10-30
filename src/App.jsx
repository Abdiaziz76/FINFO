// import { Route, Routes } from 'react-router-dom'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";
import HomePage from "./layouts/HomePage";
import { AuthProvider } from "./context/AuthProvider";
import AiChat from "./pages/AiChat";
import Recommendations from "./pages/Recommendations";
import LessonsCatalog from "./pages/lessons/LessonsCatalogue";
import UserProfile from "./pages/UserProfile";
import History from "./pages/History";
import PersistLogin from "./pages/Authentication/PersistLogin"
import RequireAuth from "./pages/Authentication/RequireAuth"
import { BrowserRouter as Router } from 'react-router-dom'
import GptChat from "./pages/GptChat";
import Lessons from "./pages/lessons/Lessons";


function App() {
  
  return (
    <div className="w-full h-full">

<Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[]} />}>
       
        <Route path="/chat" element={<AiChat />}></Route>
        <Route path="/recommendations" element={<Recommendations />}></Route>
        <Route path="/lessons" element={<Lessons/>}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/gptchat" element={<GptChat />}></Route>
        </Route>
        </Route>

      </Routes>
      </Router>
     
    </div>
  );
}

export default App;
