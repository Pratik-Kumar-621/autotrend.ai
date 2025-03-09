import { TableProps } from "@mui/material";
import React from "react";

const Table = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No items in the list",
}: TableProps<T>) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p className="text-gray-500 text-center py-8">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`} className="px-4 py-2">
                  {column.render
                    ? column.render(item[column.accessor], item)
                    : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
