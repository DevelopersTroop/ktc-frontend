import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiRes } from "@/app/types/redux-helper";
import { TInventoryItem } from "@/app/types/product";

interface FilterState {
  sort?: {
    whom: string;
    order: "desc" | "asc";
  }[];
  minPrice?: number;
  maxPrice?: number;
  wheel_width?: string;
  wheel_diameter?: string;
}

interface WheelState {
  data: IApiRes<TInventoryItem[], "products"> | null;
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

const initialState: WheelState = {
  data: null,
  filters: {}, // Default filter state
  loading: false,
  error: null,
};

const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    fetchWheelStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWheelSuccess: (
      state,
      action: PayloadAction<IApiRes<TInventoryItem[], "products">>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchWheelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload }; // Merging instead of replacing
    },
  },
});

export const {
  fetchWheelStart,
  fetchWheelSuccess,
  fetchWheelFailure,
  updateFilters,
} = wheelSlice.actions;
export default wheelSlice.reducer;
