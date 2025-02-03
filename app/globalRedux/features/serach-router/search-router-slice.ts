import { createSlice } from "@reduxjs/toolkit";


export type TSearchRouter = {
    [key: string]: string | undefined
}
const initialState:TSearchRouter = {}

const searchRouterSlice = createSlice({
    name: "searchRouter",
    initialState,
    reducers: {
        updateRoute: (state: TSearchRouter, action: { payload: { key: string, value: string } }) => {
            state[action.payload.key] = action.payload.value
        }
    }
});
export default searchRouterSlice.reducer;
export const { updateRoute } = searchRouterSlice.actions;