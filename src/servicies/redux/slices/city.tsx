import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type cityType = {
  chosenCity: string | null;
};
const initialState = {
  chosenCity: null,
} as cityType;

const city = createSlice({
  name: "citySlice",
  initialState,
  reducers: {
    setChosenCity(state: cityType, action: PayloadAction<string>) {
      state.chosenCity = action.payload;
    },
  },
});

export const { setChosenCity } = city.actions;
export const cityReducer = city.reducer;
