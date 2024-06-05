import React from "react";

const DeletePlayer = ({ player, deletePlayer, onCancel }) => {
  if (!player) {
    return <div>No player data available</div>;
  }

  const handleDelete = () => {
    deletePlayer(player.role);
  };

  return (
    <div className="flex justify-center items-center h-screen"> {/* Modified justify-center and items-center */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 ml-8">Delete Player</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete {player.role}?</p>
        <div className="flex justify-center space-x-4"> {/* Modified justify-center */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlayer;
