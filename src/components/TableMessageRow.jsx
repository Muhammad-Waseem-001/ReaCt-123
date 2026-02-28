import React from "react";

export default function TableMessageRow({ colSpan, message }) {
  return (
    <tr>
      <td className="table-message" colSpan={colSpan}>
        {message}
      </td>
    </tr>
  );
}
