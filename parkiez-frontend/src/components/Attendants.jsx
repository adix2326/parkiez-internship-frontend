import React, { useState, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

const initialData = [
  { id: 1, name: 'John Doe', bookings: 34, status: 'Active' },
  { id: 2, name: 'Jane Smith', bookings: 29, status: 'Active' },
  { id: 3, name: 'Bob Johnson', bookings: 12, status: 'Inactive' },
  { id: 4, name: 'Alice Brown', bookings: 45, status: 'Active' },
  { id: 5, name: 'Charlie Green', bookings: 8, status: 'Inactive' },
];

const Attendants = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', bookings: '', status: '' });

  const columns = useMemo(
    () => [
      {
        Header: 'Attendant Name',
        accessor: 'name',
      },
      {
        Header: 'Bookings Made',
        accessor: 'bookings',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Actions',
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const handleEdit = (attendant) => {
    setEditingId(attendant.id);
    setFormData(attendant);
  };

  const handleSave = () => {
    setData(data.map(att => (att.id === editingId ? formData : att)));
    setEditingId(null);
    setFormData({ name: '', bookings: '', status: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Attendants</h2>
      <div className="overflow-x-auto mb-4">
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-green-600 text-white">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-2 border-b border-green-600 text-left"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b border-green-200">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="p-2">
                      {cell.render('Cell')}
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
          <h3 className="text-xl mb-4">Edit Attendant</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Bookings Made</label>
              <input
                type="number"
                name="bookings"
                value={formData.bookings}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
    </div>
  );
};

export default Attendants;
