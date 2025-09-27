import data from "./../movie/data.json";
import { createSlice } from "@reduxjs/toolkit";

// Thêm thuộc tính daChon cho từng ghế
const newData = data.map((row) => ({
  ...row,
  danhSachGhe: row.danhSachGhe.map((seat) => ({
    ...seat,
    daChon: false,
  })),
}));

const initialState = {
  isLogin: false,
  dataMapSeat: newData,
  listUser: [],
  userInfo: {
    name: "",
    numberOfSeats: 0,
  },
};

const findIndex = (soGhe, list) => {
  for (let rowIndex = 0; rowIndex < list.length; rowIndex++) {
    const row = list[rowIndex];
    for (let seatIndex = 0; seatIndex < row.danhSachGhe.length; seatIndex++) {
      if (row.danhSachGhe[seatIndex].soGhe == soGhe) {
        return [rowIndex, seatIndex];
      }
    }
  }
  return [-1, -1]; // Không tìm thấy
};

const calcSeat = (list) => {
  let num = 0;
  for (let rowIndex = 0; rowIndex < list.length; rowIndex++) {
    const row = list[rowIndex];
    for (let seatIndex = 0; seatIndex < row.danhSachGhe.length; seatIndex++) {
      if (row.danhSachGhe[seatIndex].daChon == true) {
        num++;
      }
    }
  }
  return num;
};

const movieReducer = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    getInformation: (state, action) => {
      const { name, numberOfSeats } = action.payload;
      state.userInfo.name = name;
      state.userInfo.numberOfSeats = numberOfSeats;
      state.isLogin = true;
      console.log(state.userInfo);
    },

    updateSeats: (state, action) => {
      const { soGhe } = action.payload;
      const [rowIndex, seatIndex] = findIndex(soGhe, state.dataMapSeat);
      if (rowIndex !== -1 && seatIndex !== -1) {
        const seat = state.dataMapSeat[rowIndex].danhSachGhe[seatIndex];
        // Nếu ghế chưa chọn và chưa vượt quá số lượng cho phép thì mới cho chọn
        if (
          !seat.daChon &&
          calcSeat(state.dataMapSeat) < state.userInfo.numberOfSeats
        ) {
          seat.daChon = true;
        }
        // Nếu ghế đã chọn thì cho bỏ chọn
        else if (seat.daChon) {
          seat.daChon = false;
        }
        // Nếu vượt quá số lượng thì không làm gì
      }
    },

    addUser: (state, action) => {
      const list = state.dataMapSeat;
      if (calcSeat(list) < state.userInfo.numberOfSeats) {
        alert("Bạn chưa chọn đủ số lượng vé. Hãy chọn thêm!");
      } else {
        const newUser = {
          name: state.userInfo.name,
          numberOfSeats: state.userInfo.numberOfSeats,
          seats: [],
        };
        for (let rowIndex = 0; rowIndex < list.length; rowIndex++) {
          const row = list[rowIndex];
          for (
            let seatIndex = 0;
            seatIndex < row.danhSachGhe.length;
            seatIndex++
          ) {
            if (row.danhSachGhe[seatIndex].daChon == true) {
              row.danhSachGhe[seatIndex].daDat = true;
              row.danhSachGhe[seatIndex].daChon = false;
              newUser.seats.push(row.danhSachGhe[seatIndex].soGhe);
            }
          }
        }
        state.listUser.push(newUser);
        alert("Chúc mừng bạn đã đặt vé thành công!");
        state.isLogin = false;
      }
    },
  },
});

export const { getInformation, updateSeats, addUser } = movieReducer.actions;
export default movieReducer.reducer;
