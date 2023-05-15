import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware, { type ThunkDispatch } from "redux-thunk";

import { loadState, saveState } from "../utils/storage-utils";

import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { filtersReducer } from "./filtersReducer";
import { vacanciesReducer } from "./vacanciesReducer";

const rootReducer = combineReducers({
  filters: filtersReducer,
  vacancies: vacanciesReducer,
  auth: authReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsType>;

export type ActionsType = any;
export type AppStateType = ReturnType<typeof rootReducer>;

// @ts-expect-error
window.store = store; // for dev
