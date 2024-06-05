import React from "react";

const Gudang = ({ gudang, onDelete, onEdit, onAdd }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Data Gudang</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onAdd}
        >
          Add Item
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-white">
                Id
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white">
                Nama Barang
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white">
                Kuantitas
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white">
                Kategori
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {gudang.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {item.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="border border-blue-500 text-blue-500 hover:bg-gray-100 hover:text-blue font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gudang;