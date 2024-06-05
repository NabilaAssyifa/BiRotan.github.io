import React from "react";

const DeleteGudang = ({ item, deleteGudang, onCancel }) => {
  if (!item) {
    return <div>No warehouse data available</div>;
  }

  const handleDelete = () => {
    deleteGudang(item.id);
    const gudangList = JSON.parse(localStorage.getItem("gudangList")) || [];
    const updatedGudangList = gudangList.filter((gudang) => gudang.id !== item.id);
    localStorage.setItem("gudangList", JSON.stringify(updatedGudangList));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Delete Warehouse</h2>
      <p className="text-gray-600 mb-6 text-center">Are you sure you want to delete {item.name}?</p>
      <div className="flex justify-center space-x-4">
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
  );
};

export default DeleteGudang;
