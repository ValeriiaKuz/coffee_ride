import { cityReducer } from "../slices/city";
import { combineReducers } from "@reduxjs/toolkit";
import { coffeePointsReducer } from "@/src/servicies/redux/slices/coffeepoints";
import { userReducer } from "../slices/user";
import { cookiesReducer } from "@/src/servicies/redux/slices/accepted-cookies";
export const rootReducer = combineReducers({
  chosenCity: cityReducer,
  coffeePoints: coffeePointsReducer,
  user: userReducer,
  acceptedCookies: cookiesReducer,
});
