import React, { useState, useEffect } from "react";
import History from "./history";
import data from "../../data/data.json";
import Gudang from "../gudang/gudang";

function User({ gudang, categories }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const handlePayment = (transaction) => {
    setShowPayment(true);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity("");
  };

  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setQuantity(qty);
  };

  const handleBuy = (e) => {
    e.preventDefault();
    if (selectedItem && quantity) {
      const isValid = selectedItem.quantity >= quantity;
      const transactionData = {
        id: transactions.length + 1,
        itemName: selectedItem.name,
        quantity: parseInt(quantity),
        category: selectedItem.category,
        status: isValid ? "valid" : "invalid",
        customerName: customerName,
        customerAddress: customerAddress
      };
      addTransaction(transactionData);
      setSelectedItem(null);
      setQuantity("");
      alert("Berhasil Melakukan pemesanan");
    } else {
      alert("Please select an item and fill in quantity");
    }
  };

  const addTransaction = (transactionData) => {
    const updatedTransactions = [...transactions, transactionData];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="user-container mx-auto mt-16 pl-10 pr-10">
      <h2 className="text-2xl font-semibold mb-10 text-center">List Barang</h2>
      <div className="grid grid-cols-3 gap-5 mb-10">
        {gudang.map((item) => (
          <div key={item.id} className="border p-4 rounded-md cursor-pointer hover:bg-gray-100" onClick={() => handleSelectItem(item)}>
            <h3 className="font-bold mb-2">{item.name}</h3>
            <p className="text-gray-600">Category: {item.category}</p>
          </div>
        ))}
      </div>
      {selectedItem && (
        <form onSubmit={handleBuy} className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-gray-700 font-bold mb-2">
              Customer Name:
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerAddress" className="block text-gray-700 font-bold mb-2">
              Customer Address:
            </label>
            <input
              type="text"
              id="customerAddress"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Buy
          </button>
        </form>
      )}
      <History transactions={transactions} categories={categories} onPayment={handlePayment} />
    </div>
  );
}

export default User;