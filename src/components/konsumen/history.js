import React, { useState, useEffect } from "react";

function History({ transactions: propsTransactions, onPayment }) {
  const [transactions, setTransactions] = useState(propsTransactions || []);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, [propsTransactions]); // Add propsTransactions as a dependency
  
  // Function to handle payment for a transaction
  const handlePayment = (transactionId) => {
    onPayment(transactionId); // Pass the transaction ID
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === transactionId
        ? { ...transaction, status: "Paid" }
        : transaction
    );
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions)); // Store updated transactions in local storage
  };
  

  return (
    <div className="mt-16 pl-20 pr-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Transaction History
      </h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-white">Item Name</th>
            <th className="px-4 py-2 text-white">Quantity</th>
            <th className="px-4 py-2 text-white">Category</th>
            {transactions.some(transaction => transaction.price) && <th className="px-4 py-2">Price</th>}
            <th className="px-4 py-2 text-white">Status</th> 
            <th className="px-4 py-2 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.itemName}</td>
              <td className="border px-4 py-2">{transaction.quantity}</td>
              <td className="border px-4 py-2">{transaction.category}</td>
              {transaction.price && <td className="border px-4 py-2">{transaction.price}</td>}
              <td className="border px-4 py-2">{transaction.status}</td>
              {transaction.status === "Waiting for Payment" && (
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={() => handlePayment(transaction.id)}
                  >
                    Pay
                  </button>
                </td>
              )}
              {transaction.status === "Paid" && (
                <td className="border px-4 py-2">Paid</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;