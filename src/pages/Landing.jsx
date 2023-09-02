import React from "react";
import DarkModeSwitcher from "../components/DarkModeSwitch";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="dark:bg-slate-800 dark:text-white  w-full">
      {/* Navbar */}
      <nav className="bg-blue-500 dark:bg-black py-4 px-2">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-2xl">FINFO</div>
            <div className="flex items-center justify-between gap-4">
              <DarkModeSwitcher />
              <ul className="hidden md:flex space-x-6">
                {" "}
                {/* Hide on screens smaller than medium (md) */}

                <li className="text-white hover:text-gray-300 cursor-pointer">
                  Home
                </li>
                <li className="text-white hover:text-gray-300 cursor-pointer">
                  About
                </li>
                <li className="text-white hover:text-gray-300 cursor-pointer">
                  Services
                </li>
                <li className="text-white hover:text-gray-300 cursor-pointer">
                  Contact
                </li>
                
              </ul>
              <div className="flex items-center gap-2">
                  <button className="text-white    dark:bg-blue-500 hover:text-blue-200 border border-black dark:border-white bg-black  p-1">
                    <Link to="/signup">Sign Up</Link>
                  </button>
                  <button className="text-white dark:hover:text-blue-300 p-1 border ">
                    <Link to="/signin">Sign In</Link>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-slate-600 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Your Trusted Financial Advisor
          </h1>
          <p className="text-gray-600 dark:text-slate-200 mb-6">
            Get personalized financial advice and make informed decisions.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            About Us
          </h2>
          <p className="text-gray-600 dark:text-slate-200 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut
            nunc eu ligula lacinia vehicula.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 dark:bg-slate-600 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-slate-200 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut
            nunc eu ligula lacinia vehicula.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-slate-200 mb-6">
            Have questions? We're here to help. Contact our team anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 dark:bg-black py-4">
        <div className="container mx-auto text-center text-white">
          &copy; 2023 Financial Advice Platform
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
