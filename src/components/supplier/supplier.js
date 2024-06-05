import React, { useState, useEffect } from "react";
import data from "../../data/data.json";
import Gudang from "../gudang/gudang";

function Supplier({
  supplierData,
  onUpdateGudang,
  receiveStock,
  onUpdateTransactionStatus,
}) {
  const [quantity, setQuantity] = useState(""); // Menggunakan state untuk menyimpan nilai quantity
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [gudang, setGudang] = useState(data.gudang);
  const [requestedQuantity, setRequestedQuantity] = useState(0);

  useEffect(() => {
    const categories = Array.from(
      new Set(data.gudang.map((item) => item.category))
    );
    setCategories(categories);
  }, []);

  const handleAddSupplier = (e) => {
    e.preventDefault();
  
    // Fetch selected item details
    const selectedItemDetails = data.gudang.find(
      (item) => item.name === selectedItem
    );
  
    // Create new supplier entry
    const newSupplier = {
      id: supplierData.length + 1,
      itemName: selectedItem,
      quantity,
      category: selectedCategory,
      price: selectedItemDetails.price,
    };
  
    // Call receiveStock function to add stock
    receiveStock(newSupplier);
  
    // Update Gudang stock
    const updatedGudang = data.gudang.map((item) => {
      if (item.name === selectedItem) {
        return {
          ...item,
          quantity: item.quantity + parseInt(quantity), // Add the entered quantity to the existing stock
        };
      }
      return item;
    });
  
    onUpdateGudang(updatedGudang); // Update warehouse stock
  
    // Update transaction status
    onUpdateTransactionStatus(newSupplier.itemName, "valid"); // Set status menjadi valid
  
    // Reset form fields
    setQuantity(""); // Set kembali nilai quantity ke kosong setelah ditambahkan
    setSelectedItem("");
    setSelectedCategory("");
    alert("Stock Successfully Added");
  };
  

  // Mengatur nilai default quantity menjadi quantity yang diminta oleh kasir ditambah 1
  useEffect(() => {
    if (supplierData.length > 0) {
      const requestedQuantity = supplierData.reduce(
        (total, current) => total + current.quantity,
        0
      );
      setQuantity(requestedQuantity + 1); // Set nilai default quantity
    }
  }, [supplierData]);

  return (
    <div>
      <div className="supplier-list-container p-4 bg-gray-100 mt-20 rounded-lg shadow-md pr-10 pl-10">
        <h2 className="text-2xl font-bold mb-4 text-white-700">
          Supplier Request
        </h2>
        <table className="supplier-table w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-white">ID</th>
              <th className="px-4 py-2 text-left text-white">Item Name</th>
              <th className="px-4 py-2 text-left text-white">Quantity</th>
              <th className="px-4 py-2 text-left text-white">Category</th>
            </tr>
          </thead>
          <tbody>
            {supplierData.map((data) => (
              <tr key={data.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{data.id}</td>
                <td className="px-4 py-2">{data.itemName}</td>
                <td className="px-4 py-2">{data.quantity}</td>
                <td className="px-4 py-2">{data.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="supplier-list-container p-4 bg-gray-100 mt-20 rounded-lg shadow-md pr-10 pl-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Stock</h2>
        <form onSubmit={handleAddSupplier}>
          <div className="mb-4">
            <label
              htmlFor="itemName"
              className="block text-gray-700 font-bold mb-2"
            >
              Item Name
            </label>
            <select
              id="itemName"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Item</option>
              {data.gudang.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-bold mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min={requestedQuantity + 1} // Menetapkan nilai minimum
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
}

export default Supplier;