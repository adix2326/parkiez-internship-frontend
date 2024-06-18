import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import 'tailwindcss/tailwind.css';

const DailyReport = () => {
  const data = useMemo(
    () => [
      { name: 'John Doe', bookings: 34, status: 'Active' },
      { name: 'Jane Smith', bookings: 29, status: 'Active' },
      { name: 'Bob Johnson', bookings: 12, status: 'Inactive' },
      { name: 'Alice Brown', bookings: 45, status: 'Active' },
      { name: 'Charlie Green', bookings: 8, status: 'Inactive' },
    ],
    []
  );

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

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Daily Report</h2>
      <div className="overflow-x-auto">
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
    </div>
  );
};

export default DailyReport;
