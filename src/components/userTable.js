// src/components/UserTable.js
import React from "react";
import { useTable } from "react-table";
import UserRow from "./userRow";
import './userTable.css'
const UserTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // The name field from the user data
      },
      {
        Header: "Email",
        accessor: "email", // The email field from the user data
      },
      {
        Header: "Phone",
        accessor: "phone", // The phone field from the user data
      },
      {
        Header: "Action",
        accessor: "", // The phone field from the user data
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="user-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return <UserRow user={row.original} />;
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
