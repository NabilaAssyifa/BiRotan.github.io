import React from "react";
import History from "../konsumen/history";

const PlayerList = ({ players, onDelete, onEdit, onAdd, onViewGudang }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">Data User</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Username</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Password</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Role</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {players.map((player) => (
              <tr key={player.username} className="bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:shadow-md">
                <td className="py-4 px-6">{player.username}</td>
                <td className="py-4 px-6">{player.password}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    player.role === "admin" ? "bg-blue-500 text-white" : "bg-blue-100 text-white"
                  }`}>
                    {player.role}
                  </span>
                </td>
                <td className="py-4 px-6 flex gap-2 justify-center">
                <button
                    className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => onEdit(player.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => onDelete(player.role)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-6 flex justify-center gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={onAdd}
        >
          + Add New Player
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={onViewGudang}
        >
          👁  View Gudang Stock
        </button>
      </div>
      <hr className="my-8 border-gray-300" /> {/* Divider */}
      <History />
    </div>
  );
};

export default PlayerList;
