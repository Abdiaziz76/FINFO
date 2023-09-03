// import { Route, Routes } from 'react-router-dom'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";
import HomePage from "./layouts/HomePage";
import { AuthProvider } from "./context/AuthProvider";
import AiChat from "./pages/AiChat";
import Recommendations from "./components/homePage/Recommendations";
import LessonsCatalog from "./components/homePage/Lessons";
import UserProfile from "./components/homePage/UserProfile";
import History from "./components/homePage/History";


function App() {
  return (
    <div className="w-full h-full">

      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/chat" element={<AiChat />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/lessons" element={<LessonsCatalog />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<History />} />

      </Routes>
      </AuthProvider>
     
    </div>
  );
}

export default App;
