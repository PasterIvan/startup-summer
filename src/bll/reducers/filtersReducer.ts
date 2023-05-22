import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { vacancyAPI } from "../../api/api";
import { CatalogType, SearchParamsType } from "../../api/types";
import { requestStatus } from "../../enums/requestStatus";

import { setAppStatus } from "./appReducer";

// THUNKS
export const cataloguesTC = createAsyncThunk(
  "catalogues",
  async (param, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING));

    try {
      const res = await vacancyAPI.getCatalogues();

      dispatch(setCatalogues(res.data));
      dispatch(setAppStatus(requestStatus.SUCCEEDED));
    } catch (err) {
      console.log(err);
      dispatch(setAppStatus(requestStatus.FAILED));
    }
  },
);

const slice = createSlice({
  name: "filters",
  initialState: {
    paramsState: {
      page: undefined,
      count: "4",
      keyword: undefined,
      catalogues: undefined,
      payment_from: undefined,
      payment_to: undefined,
      published: "1",
    } as SearchParamsType,
    catalogues: [] as CatalogType[],
  },
  reducers: {
    setCatalogues(state, action: PayloadAction<CatalogType[]>) {
      state.catalogues = action.payload;
    },
    setParamsState(state, action: PayloadAction<SearchParamsType>) {
      state.paramsState = action.payload;
    },
  },
});

export const filtersReducer = slice.reducer;

export const { setCatalogues, setParamsState } = slice.actions;
