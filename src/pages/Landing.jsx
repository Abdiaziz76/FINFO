import React from "react";
import DarkModeSwitcher from "../components/DarkModeSwitch";
import { Link } from "react-router-dom";
import {HeroImage} from "../assets/images"; // Import a futuristic hero image

const LandingPage = () => {
  const services = [
    ['Financial Advice', 'Get expert financial advice to make informed decisions.'],
    ['Personalized Recommendations', 'Receive tailored recommendations based on your financial needs.'],
    ['Financial Education', 'Access educational resources for financial empowerment.'],
    ['Live Chat Support', 'Chat with our experts to navigate your financial challenges.'],
  ];

  return (
    <div className="dark:bg-slate-800 dark:text-white w-full">
      {/* Navbar */}
      <nav className="bg-blue-500 dark:bg-black py-4 px-2 fixed z-20 w-full opacity-90">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">FININFO</div>
          <div className="flex items-center gap-4">
            <DarkModeSwitcher />
            <ul className="hidden md:flex space-x-6">
              <li className="text-white hover:text-gray-300 cursor-pointer">Home</li>
              <li className="text-white hover:text-gray-300 cursor-pointer">About</li>
              <li className="text-white hover:text-gray-300 cursor-pointer">Services</li>
              <li className="text-white hover:text-gray-300 cursor-pointer">Contact</li>
            </ul>
            <div className="flex items-center gap-2">
              <button className="text-white dark:bg-blue-500 hover:text-blue-200 border border-black dark:border-white bg-black p-1">
                <Link to="/signup">Sign Up</Link>
              </button>
              <button className="text-white dark:hover:text-blue-300 p-1 border">
                <Link to="/signin">Sign In</Link>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black relative py-16 h-screen">
        <img src={HeroImage} alt="Hero" className="absolute inset-0 object-cover w-full h-full opacity-30" />
        <div className="container flex flex-col justify-center items-center mx-auto text-center relative z-10 h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Your Trusted Financial Advisor
          </h1>
          <p className="text-gray-200 text-whit mb-6">
            Get personalized financial advice and make informed decisions.
          </p>
          <Link to="/signup">
            <button className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 rounded-full transition-all duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-start md:text-center">
            About Us
          </h2>
          <p className="text-gray-600 dark:text-slate-200 mb-6 text-start md:text-center">
            FINFO is your trusted financial companion. We provide expert advice and personalized recommendations to help you make informed decisions.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-blue-500 dark:bg-black py-16 px-8 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-start md:text-center text-white">
            Our Services
          </h2>
          <p className="text-gray-200 text-start md:text-center">
            With you at every financial step you want to take
          </p>
          <div className="flex justify-between gap-8 items-center flex-wrap dark:border-white py-8 px-8 md:px-16">
            {services.map(([name, description]) => (
              <div key={name} className="max-w-md w-full text-white">
                <h3 className="font-medium text-2xl text-start md:text-center capitalize">{name}</h3>
                <p className="text-start md:text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:px-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 dark:text-white">
            Contact Us
          </h2>
          <p className="dark:text-white my-2">
            Have questions? We're here to help. Contact our team anytime.
          </p>
          {/* Contact us form */}
          <div className="flex justify-center items-center">
            <form onSubmit={() => {}} className="w-80 p-6 rounded-lg border dark:border-white">
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value=""
                  onChange={() => {}}
                  placeholder="Email"
                  className="w-full px-4 py-2 border dark:bg-transparent dark:border-white rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <textarea
                  type="text"
                  name="message"
                  value=""
                  onChange={() => {}}
                  placeholder="Message"
                  className="w-full px-4 py-2 border dark:bg-transparent dark:border-white rounded pr-10 focus:outline-none"
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 dark:bg-black py-4">
        <div className="container mx-auto text-center text-white">
          &copy; {new Date().getFullYear()} FININFO
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
