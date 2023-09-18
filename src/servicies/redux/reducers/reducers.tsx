import { cityReducer } from "../slices/city";
import { combineReducers } from "@reduxjs/toolkit";
import { coffeePointsReducer } from "@/src/servicies/redux/slices/coffeepoints";
import { userReducer } from "../slices/user";
export const rootReducer = combineReducers({
  chosenCity: cityReducer,
  coffeePoints: coffeePointsReducer,
  user: userReducer,
});
