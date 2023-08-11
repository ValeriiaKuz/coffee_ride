import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type cityType = {
  chosenCity: string | null;
};
const initialState = {
  chosenCity: null,
} as cityType;

const citySlice = createSlice({
  name: "citySlice",
  initialState,
  reducers: {
    setChosenCity(state: cityType, action: PayloadAction<string>) {
      state.chosenCity = action.payload;
    },
  },
});

export const { setChosenCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;
