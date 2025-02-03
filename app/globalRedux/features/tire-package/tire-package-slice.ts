import { TInventoryItem } from "@/app/types/product";
import { createSlice } from "@reduxjs/toolkit";


const initialState: { packageId?: string | null, selectedFrontTire?: { [K in keyof TInventoryItem]?: TInventoryItem[K] } | null, forDually?: boolean } = {
    packageId: null,
    selectedFrontTire: null,
    forDually: undefined
};

const tirePackageSlice = createSlice({
    name: "tirePackage",
    initialState,
    reducers: {
        setTirePackage: (state: typeof initialState, action: { payload: typeof initialState }) => {
            state.packageId = action.payload.packageId
        },
        setFrontTireImage: (state: typeof initialState, action: { payload: typeof initialState }) => {
            state.selectedFrontTire = action.payload.selectedFrontTire
        }
    }
});
export default tirePackageSlice.reducer;
export const { setTirePackage, setFrontTireImage } = tirePackageSlice.actions;