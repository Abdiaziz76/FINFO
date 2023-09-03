// import React from "react";
import DarkModeSwitcher from "../components/DarkModeSwitch";
import { Link } from "react-router-dom";

const LandingPage = () => {

  const services = [
    ['financial advice', 'Not sure where to start on a particular financial issue? Make use of our service, especially the chat feature to get a good grasp of what the challenge is and what options you could explore'],
    ['recommendations', 'Get recommendations tailored to you based on your needs as informed by your interaction with our services. Ask for recommendations and comparison between different services and even institutions to make informed decisions'],
    ['financial education', 'Looking to educate yourself on financial and financial institution matters? Look no more, we are here to provide you with tailored educational resources'],
    ['just chat', 'Have no idea where to begin? Just chat and figure it out along the way...'],
  ]
  return (
    <div className="dark:bg-slate-800 dark:text-white  w-full">
      {/* Navbar */}
      <nav className="bg-blue-500 dark:bg-black py-4 px-2">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-2xl">FININFO</div>
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
          <Link to='/signup'>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 border px-8 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-start md:text-center">
            About Us
          </h2>
          <p className="text-gray-600 dark:text-slate-200 mb-6 text-start md:text-center">         
            FINFO is an all matters finance platform. Whether you are looking for advice on choosing a banking partner, where to get a particular service or what service best fits your needs, FINFO is here to help. In just a matter of seconds, you can get all the information you need to make the right (informed) decision.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 dark:bg-slate-600 py-16 px-8 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-start md:text-center">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-slate-200 mb-6 text-start md:text-center">
            With you at every financial step you want to take
          </p>
          <div className="flex justify-between gap-8 items-center flex-wrap md:border py-8 px-8 md:px-16">
            {/* service */}
            {
              services?.map(([name, description]) =>
              <div key={name} className="flex flex-col gap-2 md:max-w-[400px] w-full">
                <span className="font-medium text-2xl text-start md:text-center capitalize">{name}</span>
                <span className="text-start md:text-center">{description}</span>
              </div>
              )
            }
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:px-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-slate-200 mb-6">
            Have questions? We're here to help. Contact our team anytime.
          </p>
          {/* Contact us form */}
          <div className="flex justify-center items-center">
            <form onSubmit={() => {}} className="w-80 p-6 rounded-lg border">
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value=''
                  onChange={() => {}}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <textarea
                  type='text'
                  name="message"
                  value=''
                  onChange={() => {}}
                  placeholder="Message"
                  className="w-full px-4 py-2 border rounded pr-10 focus:outline-none"
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
          &copy; 2023 FININFO
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
