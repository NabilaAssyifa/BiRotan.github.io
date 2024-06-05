import React, { useState } from "react";

function TransactionList({
  gudang,
  transactions,
  updateTransactionStatus, // 1. Tambahkan prop untuk menerima fungsi updateTransactionStatus
  sendToSupplier,
  sendToCustomer,
  receiveStock,
  data
}) {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  
  const handleAcceptPayment = (transaction) => {
    setSelectedTransaction(transaction);
    setPrice("");
    setShowPopup(true);
  };

  const sendDataToCustomer = () => {
    if (!price) {
      console.log("Price is required.");
      return;
    }
  
    const updatedTransaction = {
      ...selectedTransaction,
      status: "Waiting for Payment",
      price: parseFloat(price) - discount,
      // CustomerName dan customerAddress tidak diatur kembali ke string kosong setelah pengiriman data
    };
    updateTransactionStatus(updatedTransaction);
    sendToCustomer(updatedTransaction);
    setSelectedTransaction(null);
    setPrice("");
    setDiscount(0); // Reset discount setelah mengirim transaksi
    setShowPopup(false);
  };

  const handleSendToSupplier = (transaction) => {
    if (gudang) {
      const selectedItemDetails = gudang.find(
        (item) => item.name === transaction.itemName
      );
  
      if (
        selectedItemDetails &&
        selectedItemDetails.quantity >= transaction.quantity
      ) {
        const updatedTransaction = {
          ...transaction,
          status: "valid", // Perbarui status menjadi valid
          quantity: selectedItemDetails.quantity, // Menambahkan quantity dari gudang ke dalam transaksi
        };
        updateTransactionStatus(updatedTransaction); // Memanggil fungsi updateTransactionStatus dengan transaksi yang diperbarui
      } else {
        console.log("Stok tidak mencukupi untuk transaksi ini.");
      }
  
      sendToSupplier(transaction);
    } else {
      console.error("Gudang is undefined or null.");
    }
  };
  
  return (
    <div className="transaction-list-container p-4 bg-gray-100 mt-20 rounded-lg shadow-md pr-10 pl-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Transaction List
      </h2>
      <table className="transaction-table w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Customer Name</th>
            <th className="px-4 py-2 text-left">Customer Address</th>
            <th className="px-4 py-2 text-left">Item Name</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{transaction.id}</td>
              <td className="px-4 py-2">{transaction.customerName}</td>
              <td className="px-4 py-2">{transaction.customerAddress}</td>
              <td className="px-4 py-2">{transaction.itemName}</td>
              <td className="px-4 py-2">{transaction.quantity}</td>
              <td className="px-4 py-2">{transaction.category}</td>
              <td
                className={`border px-4 py-2 ${
                  transaction.status === "valid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.status}
              </td>
              <td className="px-4 py-2">
                {transaction.status === "invalid" && (
                  <button
                    onClick={() => handleSendToSupplier(transaction)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Send to Supplier
                  </button>
                )}

                {transaction.status === "valid" && (
                  <button
                    onClick={() => handleAcceptPayment(transaction)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Accept Payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Enter Price</h2>
            Rp <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <h2>Discount (Optional)</h2>
            Rp <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
            <button onClick={sendDataToCustomer}>Send Data</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;