import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        isMenuLock: false
    },
    reducers: {
        unlockMenu: (state) => {
            state.isMenuLock = false;
        },
        lockMenu: (state) => {
            state.isMenuLock = true;
        }
    }
});
export default menuSlice.reducer;
export const {unlockMenu, lockMenu} = menuSlice.actions;