import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "configs/axios";

export const getStocks = createAsyncThunk(
  "stocks/getStocks",
  async (params) => {
    return axios
      .get("stocks", {
        params: params
          ? params
          : {
              exchange: "NASDAQ",
              format: "json",
            },
      })
      .then(({ data: { data } }) => data)
      .catch((error) => error);
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStocks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStocks.fulfilled, (state, action) => {
      state.stocks = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getStocks.rejected, (state, action) => {
      console.error(action.payload);
      state.isLoading = false;
    });
  },
});

export const { setLoading } = stocksSlice.actions;

export default stocksSlice.reducer;
