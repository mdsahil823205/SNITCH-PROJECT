import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import DarkModeAndLightMode from "../components/DarkModeAndLightMode.jsx";

const Register = () => {
  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    // Crucial fix: e.target.name must match the keys in formData state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Order must match useAuth: (email, password, fullName, contact)
    handleRegister(
      formData.email,
      formData.password,
      formData.fullName,
      formData.contact,
    );
  };

  return (
    <div className="min-h-screen flex text-gray-900 dark:text-gray-100 bg-[#f8f9fa] dark:bg-[#131313] transition-colors duration-300">
      {/* Left Pane - Image stays exactly as you wanted */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-200 dark:bg-[#1b1b1b] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2574&auto=format&fit=crop"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/60 dark:from-[#131313]/80 dark:to-[#131313]/90"></div>

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <h1 className="text-4xl font-extrabold tracking-widest text-white uppercase font-serif">
            SNITCH
          </h1>
          <div className="mb-12">
            <h2 className="text-5xl font-light leading-tight text-white mb-6">
              Redefining <br />
              <span className="font-semibold text-white">Modern Elegance.</span>
            </h2>
            <p className="text-lg text-gray-200 max-w-md font-light">
              Join our exclusive atelier. Get early access to limited
              collections and personalized style curations.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative bg-[#f8f9fa] dark:bg-[#131313]">
        {/* Theme Toggle Component */}
        <div className="absolute top-8 right-8">
          <DarkModeAndLightMode />
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="lg:hidden mb-12">
            <h1 className="text-3xl font-extrabold tracking-widest text-gray-900 dark:text-white uppercase font-serif">
              SNITCH
            </h1>
          </div>
          <h2 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white tracking-tight">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#c6c6c6] mb-8">
            Enter your details below to join the atelier.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="fullName" // Added name attribute
              onChange={handleChange}
              value={formData.fullName}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-colors duration-200 text-sm"
              required
            />
            <input
              type="email"
              name="email" // Added name attribute
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              className="w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-colors duration-200 text-sm"
              required
            />
            <input
              type="tel"
              name="contact" // Added name attribute
              onChange={handleChange}
              value={formData.contact}
              placeholder="Contact"
              className="w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-colors duration-200 text-sm"
              required
            />
            <input
              type="password"
              name="password" // Added name attribute
              onChange={handleChange}
              value={formData.password}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-colors duration-200 text-sm"
              required
            />
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300 text-sm tracking-wide"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>

          {/* Footer / Login Link */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-[#c6c6c6]">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-black dark:text-white hover:underline transition-all">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
