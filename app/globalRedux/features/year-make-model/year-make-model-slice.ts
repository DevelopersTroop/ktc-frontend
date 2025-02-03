"use client";
import {createSlice} from "@reduxjs/toolkit";

const yearMakeModelSlice = createSlice({
    name: "yearMakeModel",
    initialState: {
        year: "",
        make: "",
        model: ""
    },
    reducers: {
        setYearMakeModel: (state, action) => {
            state.year = action.payload.year;
            state.make = action.payload.make;
            state.model = action.payload.model;
        },
        clearYearMakeModel: (state) => {
            state.year = "";
            state.make = "";
            state.model = "";
        }
    }
});

export default yearMakeModelSlice.reducer;
export const {setYearMakeModel, clearYearMakeModel} = yearMakeModelSlice.actions;