import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import DarkModeAndLightMode from "../components/DarkModeAndLightMode.jsx";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import ContinueWithGoogle from "../components/ContinueWithGoogle.jsx";
const Login = () => {
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleLogin(formData.email, formData.password);
  };

  const inputClass =
    "w-full px-4 py-3 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-[#353535] rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 border-b-2 focus:border-black dark:focus:border-white transition-all duration-200 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <div className="min-h-screen flex text-gray-900 dark:text-gray-100 bg-[#f8f9fa] dark:bg-[#131313] transition-colors duration-300">

      {/* Left Pane — Editorial Image (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-200 dark:bg-[#1b1b1b] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop"
          alt="Fashion Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-60"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-black/70 dark:from-[#131313]/80 dark:to-[#131313]/90" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-widest text-white uppercase font-serif">
            SNITCH
          </h1>
          <div className="mb-12">
            <h2 className="text-4xl xl:text-6xl font-light leading-tight text-white mb-6">
              Welcome <br />
              <span className="font-semibold text-white">Back.</span>
            </h2>
            <p className="text-base xl:text-lg text-gray-200 max-w-md font-light leading-relaxed">
              Your style, your story. Sign back in to explore the latest
              collections curated just for you.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane — Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-12 px-6 sm:px-12 md:px-20 lg:px-16 xl:px-32 relative bg-[#f8f9fa] dark:bg-[#131313]">

        {/* Dark mode toggle */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
          <DarkModeAndLightMode />
        </div>

        <div className="max-w-md w-full">

          {/* Mobile-only Logo */}
          <div className="lg:hidden mb-8 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold tracking-widest text-gray-900 dark:text-white uppercase font-serif">
              SNITCH
            </h1>
          </div>

          <header className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-sm text-gray-500 dark:text-[#c6c6c6] mt-2">
              Welcome back — enter your credentials to continue.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
              required
              autoComplete="email"
            />

            {/* Password with show/hide toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`${inputClass} pr-12`}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs font-medium tracking-wide uppercase"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
              </button>
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs text-gray-500 dark:text-[#c6c6c6] hover:text-black dark:hover:text-white underline underline-offset-4 decoration-1 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-md hover:opacity-90 active:scale-[0.98] transition-all duration-300 text-sm tracking-wide shadow-md"
              >
                SIGN IN
              </button>
            </div>
            <ContinueWithGoogle />
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <span className="flex-1 h-px bg-gray-200 dark:bg-[#353535]" />
            <span className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest">
              or
            </span>
            <span className="flex-1 h-px bg-gray-200 dark:bg-[#353535]" />
          </div>

          {/* Register link */}
          <footer className="text-center text-sm text-gray-600 dark:text-[#c6c6c6]">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/register"
              className="font-semibold text-black dark:text-white hover:underline underline-offset-4 decoration-1 transition-all"
            >
              Create one
            </NavLink>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Login;
