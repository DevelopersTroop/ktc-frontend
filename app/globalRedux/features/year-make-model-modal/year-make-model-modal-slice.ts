"use client";
import {createSlice} from "@reduxjs/toolkit";

const yearMakeModelModalSlice = createSlice({
    name: "yearMakeModelModal",
    initialState: {
        isOpen: false,
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
});

export default yearMakeModelModalSlice.reducer;
export const {openModal, closeModal} = yearMakeModelModalSlice.actions;