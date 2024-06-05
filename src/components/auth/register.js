// Register.js

import React, { useState } from "react";

const Register = ({ onRegister, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Panggil fungsi onRegister dan kirim username dan password
    onRegister(username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
<div className="w-1/2 bg-gradient-to-br from-blue-300 to-purple-300 p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full bg-black hover:bg-gray-900 text-purple-900 font-bold py-2 px-4 rounded-md"
          onClick={handleRegister}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Register;
