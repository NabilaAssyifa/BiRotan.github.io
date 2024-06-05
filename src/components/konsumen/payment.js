import React, { useState } from "react";

function Payment({ transaction, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(""); // State for payment details

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement payment logic here, e.g., send payment details to a backend API
    console.log("Payment submitted:", paymentMethod, paymentDetails);

    // Update transaction status to "paid" in your application state 
    // and close the Payment form:
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Payment</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="card">Credit Card</option>
              <option value="banktransfer">Bank Transfer</option>
              {/* Add more payment methods as needed */}
            </select>
          </div>

          {/* Render specific payment details based on the selected method */}
          {paymentMethod === "card" && (
            <div className="mb-4">
              <label htmlFor="cardDetails">Card Details:</label>
              <input
                type="text"
                id="cardDetails"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              />
            </div>
          )}

          {paymentMethod === "banktransfer" && (
            <div className="mb-4">
              <label htmlFor="bankDetails">Bank Details:</label>
              <input
                type="text"
                id="bankDetails"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Pay Now
          </button>

          {/* Button to close the payment form */}
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;