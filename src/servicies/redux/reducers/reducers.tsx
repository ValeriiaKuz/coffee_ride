import { cityReducer } from "../slices/citySlice";
import { combineReducers } from "@reduxjs/toolkit";
import { coffeePointsReducer } from "@/src/servicies/redux/slices/coffeepoints";
export const rootReducer = combineReducers({
  chosenCity: cityReducer,
  coffeePoints: coffeePointsReducer,
});
