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
  wheel_width?: string;
  wheel_diameter?: string;
}

interface AccessoriesState {
  data: IApiRes<{products:TInventoryItem[]}> | null;
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

const initialState: AccessoriesState = {
  data: null,
  filters: {}, // Default filter state
  loading: false,
  error: null,
};

const accessoriesSlice = createSlice({
  name: "accessories",
  initialState,
  reducers: {
    fetchAccessoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAccessoriesSuccess: (
      state,
      action: PayloadAction<IApiRes<{products:TInventoryItem[]}>>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAccessoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload }; // Merging instead of replacing
    },
  },
});

export const {
  fetchAccessoriesStart,
  fetchAccessoriesSuccess,
  fetchAccessoriesFailure,
  updateFilters,
} = accessoriesSlice.actions;
export default accessoriesSlice.reducer;
