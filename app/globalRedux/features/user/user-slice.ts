import { clearSession, setTrackingEmail } from "@/lib/tracker";
import { TUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  accessToken: string | null;
  refreshToken: string | null;
  userDetails: TUser | null;
} = {
  accessToken: null,
  refreshToken: null,
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
    },
    setUserDetails: (state, action) => {
      setTrackingEmail(action.payload.userDetails.email);
      state.userDetails = action.payload.userDetails;
    },
    removeUser: (state) => {
      clearSession();
      state.accessToken = null;
      state.refreshToken = null;
      state.userDetails = null;
    },
  },
});
export default userSlice.reducer;
export const { setAccessToken, setRefreshToken, setUserDetails, removeUser } =
  userSlice.actions;
