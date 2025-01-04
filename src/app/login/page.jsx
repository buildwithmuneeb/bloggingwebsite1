"use client"; // Make this component a client component in Next.js

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const router = useRouter(); // Use Next.js router for navigation


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Check for valid credentials
    // if (username === "admin" && password === "admin123") {
    //   router.push("/admin"); // Redirect to the /admin page on success
    // } else {
    //   setError("Invalid username or password.");
    // }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      })     
      
      if(!res){
        alert("Failed SignIn")
        return
      }
      router.push("/admin")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Login</h2>

        {/* Error Message */}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center">
              <input type="checkbox" className="text-red-600 focus:ring-red-600 focus:ring-offset-gray-800" />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="text-red-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <div> 
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 rounded-lg font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Divider */}
        {/* <div className="mt-6 text-center text-gray-400">
          <span>or continue with</span>
        </div> */}

        {/* Social Login Buttons */}
        {/* <div className="flex justify-center mt-4 space-x-4">
          <button className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700">
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700">
            <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700">
            <img src="/github-icon.svg" alt="GitHub" className="w-6 h-6" />
          </button>
        </div> */}

        {/* Register Link */}
        {/* <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-red-600 hover:underline">
            Register
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
