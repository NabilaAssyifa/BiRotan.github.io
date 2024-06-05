import React, { useState, useEffect } from "react";
import PlayerList from "./components/admin/PlayerList";
import EditPlayer from "./components/admin/EditPlayer";
import AddPlayer from "./components/admin/AddPlayer";
import DeletePlayer from "./components/admin/DeletePlayer";
import Gudang from "./components/gudang/gudang";
import AddGudang from "./components/gudang/AddGudang";
import EditGudang from "./components/gudang/EditGudang";
import DeleteGudang from "./components/gudang/DeleteGudang";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import data from "././data/data.json";
import User from "./components/konsumen/user";
import TransactionList from "./components/kasir/kasir";
import "./App.css"; // Pastikan file CSS diimport
import Supplier from "./components/supplier/supplier";
import Payment from "./components/konsumen/payment";
import History from "./components/konsumen/history";

function App() {
  const [players, setPlayers] = useState(data.players);
  const [gudang, setGudang] = useState(data.gudang);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentGudang, setCurrentGudang] = useState(null);
  const [showEditPlayer, setShowEditPlayer] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showDeletePlayer, setShowDeletePlayer] = useState(false);
  const [showEditGudang, setShowEditGudang] = useState(false);
  const [showAddGudang, setShowAddGudang] = useState(false);
  const [showDeleteGudang, setShowDeleteGudang] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [gudangToDelete, setGudangToDelete] = useState(null);
  const [showGudangTable, setShowGudangTable] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false); // Mengatur halaman pengguna sebagai halaman utama
  const [showLoginPage, setShowLoginPage] = useState(true); // State untuk menampilkan halaman login
  const [showRegisterPage, setShowRegisterPage] = useState(false); // State untuk menampilkan halaman register
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [supplierData, setSupplierData] = useState([]);
  const handleUpdateGudang = (updatedGudangData) => {
    setGudang(updatedGudangData);
  };

  useEffect(() => {
    const storedGudang = localStorage.getItem("gudang");
    if (storedGudang) {
      setGudang(JSON.parse(storedGudang));
    } else {
      // Tambahkan 5 data utama dari data.json ke localStorage
      const initialData = data.gudang.slice(0, 3);
      localStorage.setItem("gudang", JSON.stringify(initialData));
      setGudang(initialData);
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("gudangData", JSON.stringify(gudang));
  }, [gudang]);
  const handleReceiveStock = (transaction) => {
    // Implement the logic for receiving stock here
    // For example, you can update the gudang state with the new transaction data
    // or perform any other necessary actions.
  };

  const sendToCustomer = (transaction) => {
    // Implement the logic for sending transaction data to the customer
    // For example, you can update the transaction status or perform any other necessary actions.
  };

  const receiveStock = (newSupplier) => {
    setSupplierData([...supplierData, newSupplier]);
  };

  const handleViewHistory = () => {
    // Implement logic to handle viewing transaction history
  };
  
  const handleViewSupplier = () => {
    // Implement logic to handle viewing supplier
  };
  

  const addTransactionToHistory = (transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  const updateTransactionStatus = (itemName, status) => {
    // Lakukan pembaruan status transaksi sesuai kebutuhan
    console.log(`Updating transaction status for item ${itemName} to ${status}`);
  };

  const handlePayment = (transactionId) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === transactionId
        ? { ...transaction, status: "Paid" }
        : transaction
    );
    setTransactions(updatedTransactions);
  };

  const handleAcceptRequest = (transaction) => {
    const updatedTransaction = {
      ...transaction,
      status: "Waiting for Payment",
    };
    updateTransactionStatus(updatedTransaction); // Panggil fungsi untuk memperbarui status transaksi di komponen induk
    addTransactionToHistory(updatedTransaction); // Tambahkan transaksi ke riwayat
  };

  const sendToSupplier = (transaction) => {
    // Mengupdate state supplierData dengan menambahkan data transaksi baru
    setSupplierData((prevData) => [...prevData, transaction]);
    alert("Berhasil Mengirim ke Supplier.");

    // Simpan data supplier ke local storage
    localStorage.setItem(
      "supplierData",
      JSON.stringify([...supplierData, transaction])
    );
  };

  useEffect(() => {
    localStorage.setItem("gudangData", JSON.stringify(gudang));
  }, [gudang]);

  useEffect(() => {
    const storedSupplierData = localStorage.getItem("supplierData");
    if (storedSupplierData) {
      setSupplierData(JSON.parse(storedSupplierData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("supplierData", JSON.stringify(supplierData));
  }, [supplierData]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransactionToKasir = (transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  const login = (username, password) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = data.players.find(
        (u) => u.username === username && u.password === password
      );
      setIsLoading(false);
      if (user) {
        // Check for a successful match
        localStorage.setItem("user", JSON.stringify(user));
        setUser(username);
        setRole(user.role);
        setIsLogin(true);
        if (user.role === "user") {
          setShowUserPage(true);
        }
        setShowLoginPage(false);
      } else {
        localStorage.setItem("user", null); // Set user to null for invalid login
        alert("Invalid username or password");
      }
    }, 1000);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser.username);
      setRole(parsedUser.role);
      setIsLogin(true);
      if (parsedUser.role === "user") {
        setShowUserPage(true);
      }
      setShowLoginPage(false);
    }
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  let lastTransactionId = 0;

  const handleBuy = ({ itemName, quantity, category }) => {
    const selectedItem = gudang.find(
      (item) => item.name === itemName && item.category === category
    );

    // Check if the selected item exists and the category matches
    if (selectedItem && selectedItem.quantity >= quantity) {
      const newTransaction = {
        id: ++lastTransactionId, // Gunakan ID transaksi terakhir ditambah 1 sebagai ID baru
        itemName,
        quantity,
        category,
        price: selectedItem.price,
        status: "valid", // Set status to valid if the item matches
      };
      addTransactionToKasir(newTransaction);
      alert("Request Sent");
    } else {
      const status = selectedItem ? "insufficient_stock" : "item_not_found";
      const newTransaction = {
        id: ++lastTransactionId, // Gunakan ID transaksi terakhir ditambah 1 sebagai ID baru
        itemName,
        quantity,
        category,
        price: selectedItem ? selectedItem.price : 0, // Set price to 0 or default
        status: "invalid", // Set status to invalid if the item does not match
      };
      addTransactionToKasir(newTransaction);
      if (status === "item_not_found") {
        alert("Request Not Found");
      } else {
        alert("Stock is not sufficient. Requesting supplier for restock.");
      }
    }
  };


  // Handler functions
  const handlePlayerDelete = (role) => {
    setPlayerToDelete(role);
    setShowDeletePlayer(true);
  };

  const handleLogout = () => {
    // Reset all necessary states to their initial values
    setIsLogin(false);
    setUser("");
    setRole("");
    setShowUserPage(false);
    setShowLoginPage(true);
  };

  const handleGudangDelete = (id) => {
    setGudangToDelete(id);
    setShowDeleteGudang(true);
  };

  const deletePlayer = (role) => {
    const updatedPlayers = players.filter((player) => player.role !== role);
    setPlayers(updatedPlayers);
    setShowDeletePlayer(false);
  };

  const deleteGudang = (id) => {
    const updatedGudang = gudang.filter((item) => item.id !== id);
    setGudang(updatedGudang);
    setShowDeleteGudang(false);
  
    // Simpan data ke localStorage
    localStorage.setItem("gudang", JSON.stringify(updatedGudang));
  };
  

  const handleCancelDelete = () => {
    setShowDeletePlayer(false);
    setShowDeleteGudang(false);
  };

  const handlePlayerEdit = (id) => {
    const player = players.find((player) => player.id === id);
    setCurrentPlayer(player);
    setShowEditPlayer(true);
  };

  const handleGudangEdit = (item) => {
    setCurrentGudang(item);
    setShowEditGudang(true);
  };

  const editPlayer = (updatedPlayer) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === updatedPlayer.id) {
        // If username matches, return the updated player object
        return updatedPlayer;
      } else {
        // Otherwise, return the original player object
        return player;
      }
    });
    setPlayers(updatedPlayers); // Update the players state with the new array
    setCurrentPlayer(null);
    setShowEditPlayer(false);
  };

  const editGudang = (updatedItem) => {
    const updatedGudang = gudang.map((item) => {
      if (item.id === updatedItem.id) {
        // Jika ID cocok, kembalikan objek baru dengan nilai yang diperbarui
        return { ...item, ...updatedItem };
      } else {
        return item;
      }
    });
    setGudang(updatedGudang); // Perbarui state gudang dengan array baru
    setCurrentGudang(null);
    setShowEditGudang(false);
  
    // Simpan data ke localStorage
    localStorage.setItem("gudang", JSON.stringify(updatedGudang));
  };
  

  const handlePlayerCancelEdit = () => {
    setCurrentPlayer(null);
    setShowEditPlayer(false);
  };

  const handleGudangCancelEdit = () => {
    setCurrentGudang(null);
    setShowEditGudang(false);
  };

  const handlePlayerAdd = () => {
    setShowAddPlayer(true);
  };

  const handleGudangAdd = () => {
    setShowAddGudang(true);
  };

  const addPlayer = (player) => {
    const newPlayer = {
      id: Math.floor(Math.random() * 1000),
      ...player,
    };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    setShowAddPlayer(false);
  };

  const addGudang = (item) => {
    setGudang([...gudang, item]);
    setShowAddGudang(false);
    const updatedData = [...gudang, item];
    localStorage.setItem("gudang", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const storedGudang = localStorage.getItem("gudang");
    if (storedGudang) {
      setGudang(JSON.parse(storedGudang));
    } else {
      const initialData = data.gudang.slice(0, 5);
      localStorage.setItem("gudang", JSON.stringify(initialData));
      setGudang(initialData);
    }
  }, []);
  

  const handlePlayerCancelAdd = () => {
    setShowAddPlayer(false);
  };

  const handleGudangCancelAdd = () => {
    setShowAddGudang(false);
  };

  const handleLogin = () => {
    setIsLogin(true);
    setShowLoginPage(true);
    setShowRegisterPage(false);
  };

  const handleRegister = () => {
    setShowRegisterPage(true); // Tampilkan halaman register
    setShowLoginPage(false);
    setShowUserPage(false); // Sembunyikan halaman pengguna
  };

  const register = (username, password) => {
    // Implementasi logika pendaftaran di sini
    setIsLogin(true); // Setelah pendaftaran berhasil, atur status login menjadi true
    setUser(username);
    alert(`User ${username} registered successfully!`);
    // Anda bisa menambahkan logika lainnya jika diperlukan
  };

  const handleViewGudang = () => {
    setShowGudangTable(true);
  };

  return (
    <div className="App">
      <button
        onClick={toggleSidebar}
        className="sidebar-toggle inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">BiRotan</span>
              </a>
            </li>
            <li>
              {isLogin ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 100 20A10 10 0 0010 0zM8.707 13.293l-3-3a1 1 0 011.414-1.414L8 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0z" />
                  </svg>
                  <span className="ms-3">Logout</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 100 20A10 10 0 0010 0zM8.707 13.293l-3-3a1 1 0 011.414-1.414L8 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0z" />
                    </svg>
                    <span className="ms-3">Login</span>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 100 20A10 10 0 0010 0zM8.707 13.293l-3-3a1 1 0 011.414-1.414L8 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0z" />
                    </svg>
                    <span className="ms-3">Register</span>
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64">
        {showLoginPage ? (
          <Login
            login={login}
            isLoading={isLoading}
            setShowRegister={setShowRegisterPage}
          />
        ) : isLogin && role === "gudang" ? (
          <>
            <Gudang
              gudang={gudang}
              onEdit={handleGudangEdit}
              onDelete={handleGudangDelete}
              onAdd={handleGudangAdd}
            />
            {showAddGudang && (
              <AddGudang
                addGudang={addGudang}
                onCancel={handleGudangCancelAdd}
              />
            )}
            {showEditGudang && (
              <EditGudang
                item={currentGudang}
                editGudang={editGudang}
                onCancel={handleGudangCancelEdit}
              />
            )}
            {showDeleteGudang && (
              <DeleteGudang
                item={gudang.find((item) => item.id === gudangToDelete)}
                deleteGudang={deleteGudang}
                onCancel={handleCancelDelete}
              />
            )}
          </>
        ) : isLogin && showDeletePlayer ? (
          <DeletePlayer
            player={players.find((player) => player.role === playerToDelete)}
            deletePlayer={deletePlayer}
            onCancel={handleCancelDelete}
          />
        ) : isLogin && showEditPlayer ? (
          <EditPlayer
            player={currentPlayer}
            editPlayer={editPlayer}
            onCancel={handlePlayerCancelEdit}
          />
        ) : isLogin && showAddPlayer ? (
          <AddPlayer addPlayer={addPlayer} onCancel={handlePlayerCancelAdd} />
        ) : isLogin && role === "admin" ? (
          <>
            {showGudangTable ? (
              <>
                <Gudang
                  gudang={gudang}
                  onUpdateGudang={handleUpdateGudang}
                  onEdit={handleGudangEdit}
                  onDelete={handleGudangDelete}
                  onAdd={handleGudangAdd}
                  onLogout={handleLogout}
                />
                {showAddGudang && (
                  <AddGudang
                    addGudang={addGudang}
                    onCancel={handleGudangCancelAdd}
                  />
                )}
                {showEditGudang && (
                  <EditGudang
                    item={currentGudang}
                    editGudang={editGudang}
                    onCancel={handleGudangCancelEdit}
                  />
                )}
                {showDeleteGudang && (
                  <DeleteGudang
                    item={gudang.find((item) => item.id === gudangToDelete)}
                    deleteGudang={deleteGudang}
                    onCancel={handleCancelDelete}
                  />
                )}
              </>
            ) : (
              <PlayerList
                players={players}
                onDelete={handlePlayerDelete}
                onEdit={handlePlayerEdit}
                onAdd={handlePlayerAdd}
                onViewGudang={handleViewGudang}
                onViewHistory={handleViewHistory} // Menambahkan fungsi handleViewHistory sebagai prop onViewHistory
                onViewSupplier={handleViewSupplier} // Menambahkan prop onViewGudang
                setIsLogin={setIsLogin}
                onLogout={handleLogout}
                user={user}
              />
            )}
            {showAddPlayer && (
              <AddPlayer
                addPlayer={addPlayer}
                onCancel={handlePlayerCancelAdd}
              />
            )}
          </>
        ) : showUserPage ? ( // Tampilkan halaman pengguna sebagai halaman utama
          <User
            gudang={gudang}
            onBuy={(transactionData) => {
              handleBuy(transactionData);
              addTransactionToKasir(transactionData);
            }}
            onLogout={handleLogout}
            isLoading={isLoading}
          />
        ) : (
          <></>
        )}
        {showRegisterPage && (
          <Register
            isLoading={isLoading}
            login={isLogin}
            onRegister={register}
          />
        )}
        {isLogin && role === "kasir" ? (
          <TransactionList
            gudang={gudang}
            transactions={transactions}
            updateTransactionStatus={updateTransactionStatus}
            sendToSupplier={sendToSupplier}
            sendToCustomer={sendToCustomer} // Make sure to pass the sendToCustomer function
            receiveStock={receiveStock}
            data={data}
          />
        ) : (
          <div className="sm:ml-64">
            {/* Tempatkan komponen-komponen lainnya di sini */}
          </div>
        )}
        {isLogin && role === "supplier" ? (
          <Supplier
            supplierData={supplierData}
            onUpdateGudang={handleUpdateGudang}
            receiveStock={handleReceiveStock}
          />
        ) : (
          <></>
        )}
        {showHistory && (
          <History
            transactions={transactions}
            onPayment={handlePayment}
            setShowHistory={false}
          />
        )}
      </div>
    </div>
  );
}

export default App;