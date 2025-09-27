import { useSelector, useDispatch } from "react-redux";
import { addUser, updateSeats } from "../store/movieReducer";
import { useState } from "react";
import ListUser from "./listUser";

export default function MapSeat() {
  const dataMapSeat = useSelector(
    (state) => state.movieReducer.dataMapSeat || []
  );

  const seatLabel = (soGhe) => {
    const m = String(soGhe).match(/(\d+)$/);
    return m ? m[1] : soGhe;
  };

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.movieReducer.isLogin);

  

  const renderMapSeat = () => {
    return dataMapSeat
      .filter((r) => r.hang !== "")
      .map((row, rowIndex) => {
        return (
          <div
            key={row.hang || rowIndex}
            className="flex items-center justify-center mb-2"
          >
            {/* Row label */}
            <div className="w-8 mr-4 text-white font-semibold">{row.hang}</div>

            {/* Seats */}
            <div className="flex">
              {row.danhSachGhe.map((seat, seatIndex) => (
                <div key={seat.soGhe} className="flex items-center">
                  {seatIndex === 5 && <div className="w-6" />}
                  <button
                    aria-label={`Seat ${seat.soGhe}`}
                    onClick={() => dispatch(updateSeats({ soGhe: seat.soGhe }))}
                    disabled={seat.daDat}
                    className={`w-10 h-10 mx-1 my-2 rounded-sm transition-all duration-150 flex items-center justify-center border-2
                      ${
                        seat.daDat
                          ? "bg-red-500 border-red-600 text-white cursor-not-allowed"
                          : seat.daChon
                          ? "bg-yellow-500 border-yellow-500"
                          : "bg-white border-yellow-500"
                      }
                      hover:${seat.daDat ? "" : "bg-yellow-500"}
                    `}
                  >
                    <span className="text-xs select-none text-black">
                      {seatLabel(seat.soGhe)}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl">
        {isLogin && <p className="text-white font-bold mb-4 text-yellow-500 text-center">
          Please select your seats
        </p>}

        <div className="bg-gray-700 p-5 rounded">
          <div className="flex justify-center gap-6 mb-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
              <span className="text-white">Selected Seat</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
              <span className="text-white">Reserved Seat</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white rounded-sm mr-2 border border-yellow-500"></div>
              <span className="text-white">Empty Seat</span>
            </div>
          </div>

          {renderMapSeat()}

          {/* screen */}
          <div className="mt-6 flex justify-center">
            <div className="bg-amber-500 text-black font-bold py-4 px-8 rounded-md w-full text-center max-w-2xl">
              SCREEN THIS WAY
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => dispatch(addUser())}
          >
            Confirm Selection
          </button>
        </div>
      </div>

      <ListUser/>
    </div>
  );
}
