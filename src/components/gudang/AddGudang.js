import React from "react";
import data from "../../data/data.json"; // Import data.json

const AddGudang = ({ addGudang, onCancel }) => {
  const [id, setid] = React.useState("");
  const [name, setname] = React.useState("");
  const [quantity, setquantity] = React.useState("");
  const [category, setCategory] = React.useState(""); // State untuk kategori

  const handlenameChange = (e) => setname(e.target.value);
  const handlequantityChange = (e) => setquantity(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleIdChange = (e) => setid(e.target.value); // Handler perubahan id

  const handleSubmit = (e) => {
    e.preventDefault();
    addGudang({ id, name, quantity, category });

    const newData = { id, name, quantity, category };
    data.gudang.push(newData);

    localStorage.setItem("data", JSON.stringify(data));

    setid("");
    setname("");
    setquantity("");
    setCategory("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={id}
            onChange={handleIdChange} // Menggunakan handler perubahan id
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={name}
            onChange={handlenameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={quantity}
            onChange={handlequantityChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="Baju">Baju</option>
            <option value="Celana">Celana</option>
            <option value="Aksesoris">Aksesoris</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGudang;