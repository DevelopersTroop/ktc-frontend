import { createSlice } from "@reduxjs/toolkit";

type CustomProductState = {
    customWheels: {
        [sku: string]: {
            frontForging?: string,
            rearForging?: string,
            frontDiameter?: number,
            rearDiameter?: number,
            frontWidth?: number,
            rearWidth?: number,
            frontLipSize?: number,
            rearLipSize?: number,
            isDefaultFrontLipChanged?: boolean,
            isDefaultRearLipChanged?: boolean,
            truckHeight?: string,
            lifted?: string,
            finish?: string,
            multiPiece?: string,
            multiPiecePrice?: number,
            widestWidthCheckbox?: boolean,
            centerCap?: string,
            quantity?: number,
        }
    },
    customWheelCalculatedPrices: {
        [sku: string]: {
            singleQuantityPrice: number,
            multipliedQuantityPrice: number,
        }
    }
}

const initialState: CustomProductState = {
    customWheels: {},
    customWheelCalculatedPrices: {}
}
const customProductSlice = createSlice({
    name: "customProduct",
    initialState,
    reducers: {
        updateCustomWheels: (state: CustomProductState, action: { payload: { customWheels: CustomProductState['customWheels'] } }) => {
            if (action.payload.customWheels) {
                Object.keys(action.payload.customWheels).forEach(sku => {
                    state.customWheels[sku] = { ...(state.customWheels[sku] ?? {}), ...action.payload.customWheels[sku] }
                })
            }
        },
        updateCustomWheelCalculatedPrice: (state: CustomProductState, action: { payload: { customWheelCalculatedPrices: CustomProductState['customWheelCalculatedPrices'] } }) => {
            if (action.payload.customWheelCalculatedPrices) {
                Object.keys(action.payload.customWheelCalculatedPrices).forEach(sku => {
                    if (state.customWheelCalculatedPrices) {
                        state.customWheelCalculatedPrices[sku] = action.payload.customWheelCalculatedPrices[sku];
                    } else {
                        state.customWheelCalculatedPrices = {};
                        state.customWheelCalculatedPrices[sku] = action.payload.customWheelCalculatedPrices[sku];
                    }
                })
            }
        },
    

    }
});

export default customProductSlice.reducer;
export const { updateCustomWheels, updateCustomWheelCalculatedPrice } = customProductSlice.actions
