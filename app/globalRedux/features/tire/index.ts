import { TInventoryItem } from "@/types/product";
import { IApiRes } from "@/types/redux-helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  sort?: {
    whom: string;
    order: "desc" | "asc";
  }[];
  minPrice?: number;
  maxPrice?: number;
  width?: string;
  diameter?: string;
}

interface TireState {
  data: IApiRes<{products: TInventoryItem[]}> | null;
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

const initialState: TireState = {
  data: null,
  filters: {}, // Default filter state
  loading: false,
  error: null,
};

const tireSlice = createSlice({
  name: "tire",
  initialState,
  reducers: {
    fetchTireStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTireSuccess: (
      state,
      action: PayloadAction<IApiRes<{products: TInventoryItem[]}>>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchTireFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload }; // Merging instead of replacing
    },
  },
});

export const {
  fetchTireStart,fetchTireFailure,fetchTireSuccess,
  updateFilters,
} = tireSlice.actions;
export default tireSlice.reducer;
