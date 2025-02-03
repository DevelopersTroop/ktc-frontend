import {createSlice} from "@reduxjs/toolkit";

const inStockProductSlice = createSlice({
        name: "inStockProduct",
        initialState: {
            quantity: 4,
            duallyQuantity: 6,
        },
        reducers: {
            updateQuantity: (state, action: { payload: { quantity: number } }) => {
                if (action.payload.quantity >= 4 && (action.payload.quantity % 4 === 0)) {
                    state.quantity = action.payload.quantity;
                } else {
                    throw new Error("Less than 4 or not multiple of 4")
                }
            },
            updateDuallyQuantity: (state, action: { payload: { quantity: number } }) => {
                if (action.payload.quantity >= 6 && (action.payload.quantity % 6 === 0)) {
                    state.duallyQuantity = action.payload.quantity;
                } else {
                    throw new Error("Less than 6 or not multiple of 6")
                }
            }
        }
    }
);

export default inStockProductSlice.reducer;
export const {updateQuantity, updateDuallyQuantity} = inStockProductSlice.actions;