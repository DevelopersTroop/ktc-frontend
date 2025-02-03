import { createSlice } from "@reduxjs/toolkit";

type TCustomSteeringWheelState = {
    customSteeringWheel: {
        [sku: string]: {
            finish?: string,
        }
    },
    customSteeringWheelCalculatedPrices: {
        [sku: string]: {
            singleQuantityPrice: number
        }
    }
}

const initialState: TCustomSteeringWheelState = {
    customSteeringWheel: {},
    customSteeringWheelCalculatedPrices: {}
}
const customSteeringWheelSlice = createSlice({
    name: "customSteeringWheel",
    initialState,
    reducers: {
        updateCustomSteeringWheel: (state: TCustomSteeringWheelState, action: { payload: { customSteeringWheel: TCustomSteeringWheelState['customSteeringWheel'] } }) => {
            if (action.payload.customSteeringWheel) {
                Object.keys(action.payload.customSteeringWheel).forEach(sku => {
                    state.customSteeringWheel[sku] = { ...(state.customSteeringWheel[sku] ?? {}), ...action.payload.customSteeringWheel[sku] }
                })
            }
        },
        updateCustomSteeringWheelCalculatedPrice: (state: TCustomSteeringWheelState, action: { payload: { customSteeringWheelCalculatedPrices: TCustomSteeringWheelState['customSteeringWheelCalculatedPrices'] } }) => {
            if (action.payload.customSteeringWheelCalculatedPrices) {
                Object.keys(action.payload.customSteeringWheelCalculatedPrices).forEach(sku => {
                    if (state.customSteeringWheelCalculatedPrices) {
                        state.customSteeringWheelCalculatedPrices[sku] = action.payload.customSteeringWheelCalculatedPrices[sku];
                    } else {
                        state.customSteeringWheelCalculatedPrices = {};
                        state.customSteeringWheelCalculatedPrices[sku] = action.payload.customSteeringWheelCalculatedPrices[sku];
                    }
                })
            }
        },
    

    }
});

export default customSteeringWheelSlice.reducer;
export const { updateCustomSteeringWheel, updateCustomSteeringWheelCalculatedPrice } = customSteeringWheelSlice.actions
