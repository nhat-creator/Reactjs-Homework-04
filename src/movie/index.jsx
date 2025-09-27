import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapSeat from "./mapSeat";
import { getInformation } from "../store/movieReducer";

export default function Movie() {
  const [name, setName] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.movieReducer.isLogin);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 bg-opacity-95 rounded-lg p-6 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-orange-400 mb-2">
                MOVIE SEAT SELECTION
              </h1>
            </div>
            <p className="text-white font-bold my-2 text-yellow-500">
              Fill the required details below and select your seats
            </p>
            {/* Form */}
            <form className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 placeholder-gray-400"
                  placeholder="nhat"
                  required
                  disabled={isLogin}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Number of Seats <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 placeholder-gray-400"
                  placeholder="34"
                  required
                  disabled={isLogin}
                  onChange={(event) =>
                    setNumberOfSeats(Number(event.target.value))
                  }
                />
              </div>
            </form>

            {/* Start Selecting Button */}
            <button
              className="w-full mb-6 text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
              onClick={() =>
                dispatch(
                  getInformation({ name: name, numberOfSeats: numberOfSeats })
                )
              }
            >
              Start Selecting
            </button>

            {/* Seat Map */}
            <MapSeat />
          </div>
        </div>
      </div>
    </div>
  );
}
