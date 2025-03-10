import { TableProps } from "../../adminTypes";
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
          <tr className="bg-[#716f6f]">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 max-w-[400px] ${
                  column.header === "Actions" ? "text-center" : "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .sort((a, b) => a.sequence - b.sequence)
            .map((item, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`px-4 py-2 max-w-[400px] ${
                      column.header === "Actions" ? "text-center" : "text-left"
                    }`}
                  >
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
