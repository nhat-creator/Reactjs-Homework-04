import React from "react";
import { useSelector } from "react-redux";

export default function ListUser() {

  const listUser = useSelector((state) => state.movieReducer.listUser) || [];

  const renderListUser = () => {
    return listUser?.map((user) => {
      return (
        <tr
          key={user.name}
          className="text-center bg-gray-800 border-b border-amber-500 text-white hover:bg-amber-100 hover:text-black transition-all duration-200"
        >
          <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
            {user.name}
          </th>
          <td className="px-6 py-4">{user.numberOfSeats}</td>
          <td className="px-6 py-4">{user.seats.join(", ")}</td>
        </tr>
      );
    })
  }

  return (
    <div className="mt-10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rounded-xl shadow-xl overflow-hidden border border-amber-500">
          <thead className="text-xs uppercase bg-gray-900 text-yellow-400 border-b-2 border-amber-500">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3 font-bold">
                <span>Name</span>
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                <span>Number of seats</span>
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                <span>Seats</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderListUser()}</tbody>
        </table>
      </div>
    </div>
  );
}
