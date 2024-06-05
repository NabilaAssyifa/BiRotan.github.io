import React, { useState } from "react";

const EditPlayer = ({ player, editPlayer, onCancel }) => {
  const [username, setUsername] = useState(player.username);
  const [password, setPassword] = useState(player.password);
  const [role, setRole] = useState(player.role);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlayer = {
      ...player,
      username,
      password,
      role,
    };
    editPlayer(updatedPlayer);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt">
      <h2 className="text-3xl font-bold mb-6 text-left text-gray-800">Edit Player</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 ">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="mt-2 px-3 h-10 focus:ring-indigo-500 focus:border-indigo-500 rounded-full border border-gray-200 block w-full :text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-2 px-3 h-10 focus:ring-indigo-500 focus:border-indigo-500 rounded-full border border-gray-200 block w-full :text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="mt-2 px-3 h-10 focus:ring-indigo-500 focus:border-indigo-500 rounded-full border border-gray-200 block w-full :text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
          <button type="button" onClick={onCancel} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlayer;
