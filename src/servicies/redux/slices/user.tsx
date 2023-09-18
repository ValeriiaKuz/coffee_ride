import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
type UserStateType = {
  email: string | null;
  name: string | null;
  uid: string;
};
const initialState: UserStateType = {
  email: null,
  name: null,
  uid: "",
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state: UserStateType, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.name = action.payload.displayName;
      state.uid = action.payload.uid;
    },
  },
});
export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
