// import { Route, Routes } from 'react-router-dom'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="w-full h-full">

      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      </AuthProvider>
     
    </div>
  );
}

export default App;
