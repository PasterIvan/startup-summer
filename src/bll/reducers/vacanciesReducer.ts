import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { vacancyAPI } from "../../api/api";
import { SearchParamsType, VacancyType } from "../../api/types";
import { requestStatus } from "../../enums/requestStatus";

import { setAppStatus } from "./appReducer";

// THUNKS
export const vacancyTC = createAsyncThunk(
  "vacancy",
  async (params: SearchParamsType, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING));

    try {
      const res = await vacancyAPI.getVacancy(params);

      dispatch(setVacancies(res.data));
      dispatch(setAppStatus(requestStatus.SUCCEEDED));
    } catch (err) {
      console.log(err);
      dispatch(setAppStatus(requestStatus.FAILED));
    }
  },
);
export const vacancyByIdTC = createAsyncThunk(
  "vacancy",
  async (id: number, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING));

    try {
      const res = await vacancyAPI.getVacancyById(id);

      dispatch(setVacancyById(res.data));
      dispatch(setAppStatus(requestStatus.SUCCEEDED));
    } catch (err) {
      console.log(err);
      dispatch(setAppStatus(requestStatus.FAILED));
      window.location.href = "../404";
    }
  },
);

const slice = createSlice({
  name: "vacancy",
  initialState: {
    vacancies: [] as VacancyType[],
    vacancy: {
      payment_from: 1,
      payment_to: 1,
      profession: "",
      currency: "",
      agreement: false,
      type_of_work: {
        title: "",
      },
      town: {
        title: "",
      },
      vacancyRichText: "",
    } as VacancyType,
    totalPages: 1,
  },
  reducers: {
    setVacancies(
      state,
      action: PayloadAction<{ total: number; objects: VacancyType[] }>,
    ) {
      state.vacancies = action.payload.objects;
      state.totalPages =
        action.payload.total < 500 ? action.payload.total / 4 : 125;
    },
    setVacancyById(state, action: PayloadAction<VacancyType>) {
      state.vacancy = action.payload;
    },
  },
});

export const vacanciesReducer = slice.reducer;

export const { setVacancies, setVacancyById } = slice.actions;
