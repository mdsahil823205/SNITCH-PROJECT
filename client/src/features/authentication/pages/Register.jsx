import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import DarkModeAndLightMode from "../components/DarkModeAndLightMode.jsx";
import { NavLink } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const { handleRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleRegister(
      formData.email,
      formData.password,
      formData.fullName,
      formData.contact,
    );
  };

  return (
    <div className="min-h-screen flex text-gray-900 dark:text-gray-100 bg-[#f8f9fa] dark:bg-[#131313] transition-colors duration-300">
      
      {/* Left Pane - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-200 dark:bg-[#1b1b1b] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2574&auto=format&fit=crop"
          alt="Fashion Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/60 dark:from-[#131313]/80 dark:to-[#131313]/90"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-widest text-white uppercase font-serif">SNITCH</h1>
          <div className="mb-12">
            <h2 className="text-4xl xl:text-6xl font-light leading-tight text-white mb-6">
              Redefining <br /><span className="font-semibold text-white">Modern Elegance.</span>
            </h2>
            <p className="text-base xl:text-lg text-gray-200 max-w-md font-light leading-relaxed">
              Join our exclusive atelier. Get early access to limited collections and personalized style curations.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-12 px-6 sm:px-12 md:px-20 lg:px-16 xl:px-32 relative">
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
          <DarkModeAndLightMode />
        </div>

        <div className="max-w-md w-full">
          <div className="lg:hidden mb-8 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold tracking-widest text-gray-900 dark:text-white uppercase font-serif">SNITCH</h1>
          </div>

          <header className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Create an Account</h2>
            <p className="text-sm text-gray-500 dark:text-[#c6c6c6] mt-2">Enter your details below to join the atelier.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              value={formData.fullName}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none border-b-2 focus:border-black dark:focus:border-white transition-all text-sm"
              required
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              className="w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none border-b-2 focus:border-black dark:focus:border-white transition-all text-sm"
              required
            />
            <input
              type="tel"
              name="contact"
              onChange={handleChange}
              value={formData.contact}
              placeholder="Contact"
              className="w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none border-b-2 focus:border-black dark:focus:border-white transition-all text-sm"
              required
            />
            
            {/* Password Container Fixed */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none border-b-2 focus:border-black dark:focus:border-white transition-all text-sm"
                required
              />
              <button 
                type="button" // Prevents form submission
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
              </button>
            </div>

            <div className="pt-2">
              <a href="/api/auth/google" className="underline">continue with google</a>
              <button
                type="submit"
                className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-md hover:opacity-90 active:scale-[0.98] transition-all text-sm tracking-wide shadow-md"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>

          <footer className="mt-8 text-center text-sm text-gray-600 dark:text-[#c6c6c6]">
            Already have an account?{' '}
            <NavLink to="/login" className="font-semibold text-black dark:text-white hover:underline transition-all">
              Log in
            </NavLink>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Register;
