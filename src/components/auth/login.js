import React, { useState } from "react";
import data from "../../data/data.json"; // Import data JSON


const Login = ({ login, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State untuk menyimpan pesan error

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Cari data login yang cocok dengan username
    const foundUser = data.players.find((user) => user.username === username);

    if (foundUser) {
      // Jika username ditemukan, periksa password
      if (foundUser.password === password) {
        login(username, password); // Login berhasil

        // Redirect user to homepage after successful login
      } else {
        setError("Incorrect password"); // Password salah
      }
    } else {
      setError("User not found"); // Username tidak ditemukan
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
<div className="w-1/2 bg-gradient-to-br from-blue-300 to-purple-300 p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
        <form onSubmit={handleLogin}> {/* Add onSubmit handler */}
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
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
          <button
            type="submit" 
            className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;