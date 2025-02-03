"use client";
import {createSlice} from "@reduxjs/toolkit";

const filterHeightSlice = createSlice({
    name: "yearMakeModel",
    initialState: {
        inStockWheelForgingExtend: false,
        inStockWheelModelExtend: false,
        inStockWheelDiameterExtend: false,
        inStockWheelWidthExtend: false,
        inStockWheelDesignExtend: false,
        inStockWheelFinishExtend: false,
        customWheelStyleExtend: false,
        customWheelForgingExtend: false,
    },
    reducers: {
        toggleInStockWheelForgingHeight: (state) => {
            state.inStockWheelForgingExtend = !state.inStockWheelForgingExtend;
        },
        toggleInStockWheelModelHeight: (state) => {
            state.inStockWheelModelExtend = !state.inStockWheelModelExtend;
        },
        toggleInStockWheelDiameterHeight: (state) => {
            state.inStockWheelDiameterExtend = !state.inStockWheelDiameterExtend;
        },
        toggleInStockWheelWidthHeight: (state) => {
            state.inStockWheelWidthExtend = !state.inStockWheelWidthExtend;
        },
        toggleInStockWheelFinishHeight: (state) => {
            state.inStockWheelFinishExtend = !state.inStockWheelFinishExtend;
        },
        toggleInStockWheelDesignHeight: (state) => {
            state.inStockWheelDesignExtend = !state.inStockWheelDesignExtend;
        },
        toggleCustomWheelStyleHeight: (state) => {
            state.customWheelStyleExtend = !state.customWheelStyleExtend;
        },
        toggleCustomWheelForgingHeight:(state) => {
            state.customWheelForgingExtend = !state.customWheelForgingExtend;
        }
    }
});

export default filterHeightSlice.reducer;
export const {
    toggleInStockWheelForgingHeight,
    toggleInStockWheelModelHeight,
    toggleInStockWheelDiameterHeight,
    toggleInStockWheelFinishHeight,
    toggleInStockWheelDesignHeight,
    toggleInStockWheelWidthHeight,
    toggleCustomWheelStyleHeight,
    toggleCustomWheelForgingHeight
} = filterHeightSlice.actions;