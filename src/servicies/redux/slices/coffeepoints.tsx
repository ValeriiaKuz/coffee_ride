import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type CoffeePointType = {
  address: string;
  city: string;
  id: string;
  name: string;
  previews: string[];
  rating: number;
  rating_google?: number;
  rating_ta?: number;
  geopoint: { latitude: number; longitude: number };
};

type coffeePointsType = { coffeePoints: CoffeePointType[] };

const initialState: coffeePointsType = {
  coffeePoints: [],
};

const coffeePointsSlice = createSlice({
  name: "coffeePointsSlice",
  initialState,
  reducers: {
    setCoffeePoints(
      state: coffeePointsType,
      action: PayloadAction<CoffeePointType[]>,
    ) {
      state.coffeePoints = action.payload;
    },
  },
});

export const { setCoffeePoints } = coffeePointsSlice.actions;
export const coffeePointsReducer = coffeePointsSlice.reducer;
