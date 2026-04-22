import React from 'react'
import { FcGoogle } from "react-icons/fc";
const ContinueWithGoogle = () => {

  const handleGoogleLogin = () => {
    console.log("Google Login clicked!");
   window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <button 
      type="button"
      onClick={handleGoogleLogin}
      
      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded border border-[#dadce0] dark:border-[#8e918f] bg-white dark:bg-[#131314] hover:bg-[#f8f9fa] dark:hover:bg-[#202124] transition-colors focus:ring-2 focus:ring-[#4285f4] dark:focus:ring-offset-[#131313] focus:outline-none cursor-pointer active:scale-[0.98]"
    >
      <FcGoogle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium text-[#3c4043] dark:text-[#e3e3e3] tracking-wide" style={{ fontFamily: 'Roboto, arial, sans-serif' }}>
        Continue with Google
      </span>
    </button>
  )
}

export default ContinueWithGoogle;
