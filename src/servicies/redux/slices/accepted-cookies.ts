import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CookiesStateType = {
  isAccepted: boolean | null;
};
const initialState: CookiesStateType = {
  isAccepted: null,
};
const cookiesSlice = createSlice({
  name: "cookiesSlice",
  initialState,
  reducers: {
    setAcceptedCookies(
      state: CookiesStateType,
      action: PayloadAction<boolean>,
    ) {
      state.isAccepted = action.payload;
    },
  },
});
export const { setAcceptedCookies } = cookiesSlice.actions;
export const cookiesReducer = cookiesSlice.reducer;
