import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { authAPI } from "../api/authApi";
import { VacancyType } from "../api/types";
import { requestStatus } from "../enums/requestStatus";

import { setAppStatus } from "./appReducer";

// THUNKS
export const loginTC = createAsyncThunk(
  "auth/login",
  async (params, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING));

    try {
      const res = await authAPI.getToken();

      dispatch(setAuth(res.data));
      dispatch(setAppStatus(requestStatus.SUCCEEDED));
    } catch (err) {
      console.log(err);
      dispatch(setAppStatus(requestStatus.FAILED));
    }
  },
);

const slice = createSlice({
  name: "auth",
  initialState: {
    login: {
      access_token: "",
      refresh_token: "",
      ttl: 1,
      expires_in: 1,
      token_type: "",
      reg_user_resumes_count: 1,
    },
    favourites: [] as VacancyType[],
    favouritesPage: 0,
  },
  reducers: {
    setAuth(state, action: PayloadAction<AuthType>) {
      state.login = action.payload;
    },
    setFavouritesPage(state, action: PayloadAction<number>) {
      state.favouritesPage = action.payload;
    },
    changeFavorites(state, action: PayloadAction<VacancyType>) {
      if (state.favourites.some((el) => el.id === action.payload.id)) {
        state.favourites = state.favourites.filter(
          (el) => el.id !== action.payload.id,
        );
      } else {
        state.favourites.unshift(action.payload);
      }
    },
  },
});

export const authReducer = slice.reducer;

export const { setAuth, changeFavorites, setFavouritesPage } = slice.actions;

type AuthType = {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  reg_user_resumes_count: number;
};
