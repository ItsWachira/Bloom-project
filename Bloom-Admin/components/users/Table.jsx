import { formatDistance, format } from "date-fns";
import React from "react";

export default function Table({ data, handleDelete, loading }) {
  const rows = data.map((i, j) => {
    return (
      <tr key={j}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img src={i?.avatar || "/avatar.svg"} alt="user avatar" />
              </div>
            </div>
            <div>
              <div className="font-bold">{i?.name}</div>
              <div className="flex flex-col text-sm opacity-70">
                <p className="text-yellow-400">@{i?.username}</p>
                <p className="">{i?.email}</p>
              </div>
            </div>
          </div>
        </td>
        
        {/* <td className="flex flex-col justify-center gap-y-4">
          {i?.verified ? (
            <p className="font-bold text-green-500">verified</p>
          ) : (
            <p>unverified</p>
          )}
          <span
            className={`badge badge-sm ${
              i?.role > 0 ? "badge-success" : "badge-ghost"
            }`}
          >
            {i?.role > 0 ? "admin" : "user"}
          </span>
        </td> */}
        <th>
          <button
            onClick={() => handleDelete(i._id)}
            className="btn btn-error btn-xs"
          >
            delete
          </button>
        </th>
      </tr>
    );
  });

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              {/* <th>Role</th>
              <th>Verification</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
}