import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";

const initialData = [
  {
    id: 1,
    name: "John Doe",
    bookings: 34,
    revenue: 3400,
    phoneNumber: "123-456-7890",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    bookings: 29,
    revenue: 2900,
    phoneNumber: "987-654-3210",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    bookings: 12,
    revenue: 1200,
    phoneNumber: "456-789-0123",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    bookings: 45,
    revenue: 4500,
    phoneNumber: "789-012-3456",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Green",
    bookings: 8,
    revenue: 800,
    phoneNumber: "012-345-6789",
    status: "Inactive",
  },
];

const Attendants = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bookings: "",
    status: "",
  });
  const [modalData, setModalData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: "Attendant Name",
        accessor: "name",
        Cell: ({ row }) => (
          <button
            onClick={() => handleModalOpen(row.original)}
            className="text-blue-500 hover:underline"
          >
            {row.original.name}
          </button>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => (
          <span
            className={value === "Active" ? "text-green-600" : "text-red-600"}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button
            onClick={() => handleEdit(row.original)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleEdit = (attendant) => {
    setEditingId(attendant.id);
    setFormData(attendant);
  };

  const handleSave = () => {
    setData(data.map((att) => (att.id === editingId ? formData : att)));
    setEditingId(null);
    setFormData({ name: "", bookings: "", status: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalOpen = (attendant) => {
    setModalData(attendant);
  };

  const handleModalClose = () => {
    setModalData(null);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl mb-4 font-bold">Attendants</h2>
      <div className="overflow-x-auto mb-4 shadow-lg">
        <table
          {...getTableProps()}
          className="min-w-full bg-white text-lg rounded-lg"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-green-600 text-white"
              >
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`p-4 border-b border-green-600 text-left ${
                      index === 0 ? "rounded-tl-lg" : ""
                    } ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-tr-lg"
                        : ""
                    }`}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`border-b border-green-200 font-semibold ${
                    rowIndex === rows.length - 1 ? "font-medium" : ""
                  }`}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className={`p-4 no-underline ${
                        rowIndex === 0 && cellIndex === 0 ? "rounded-tl-lg" : ""
                      } ${
                        rowIndex === 0 && cellIndex === row.cells.length - 1
                          ? "rounded-tr-lg"
                          : ""
                      } ${
                        rowIndex === rows.length - 1 && cellIndex === 0
                          ? "rounded-bl-lg"
                          : ""
                      } ${
                        rowIndex === rows.length - 1 &&
                        cellIndex === row.cells.length - 1
                          ? "rounded-br-lg"
                          : ""
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h3 className="text-xl mb-4 font-bold">Edit Attendant</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Bookings Made</label>
              <input
                type="number"
                name="bookings"
                value={formData.bookings}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Status</label>
              <div>
                <label className="mr-2">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === "Inactive"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Inactive
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10">
            <h3 className="text-xl mb-4">Attendant Details</h3>
            <p>
              <strong>Name:</strong> {modalData.name}
            </p>
            <p>
              <strong>Bookings Made:</strong> {modalData.bookings}
            </p>
            <p>
              <strong>Revenue Collected:</strong> ${modalData.revenue}
            </p>
            <p>
              <strong>Phone Number:</strong> {modalData.phoneNumber}
            </p>
            <button
              onClick={handleModalClose}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendants;
