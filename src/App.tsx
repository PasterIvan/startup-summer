import React, { useEffect, useState } from "react";

import { createStyles, LoadingOverlay, MantineProvider } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";

import { loginTC } from "./bll/reducers/authReducer";
import { DescriptionVacancy } from "./components/DescriptionVacancy/DescriptionVacancy";
import { FavoritesPage } from "./components/FavoritesPage/FavoritesPage";
import { Head } from "./components/Header/Head";
import { NotFound } from "./components/NotFound/NotFound";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { requestStatus } from "./enums/requestStatus";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { myTheme } from "./themeConfig";

const links = [
  { link: "search", label: "Поиск Вакансий" },
  { link: "favourites", label: "Избранное" },
];

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { access_token, ttl } = useAppSelector((state) => state.auth.login);
  const { statusApp } = useAppSelector((state) => state.app);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (statusApp === requestStatus.LOADING) setLoad(true);
    else setLoad(false);
  }, [statusApp]);

  useEffect(() => {
    if (access_token === "" || ttl < Date.now() / 1000) dispatch(loginTC());
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
      <div className={classes.root}>
        <LoadingOverlay
          visible={load}
          overlayBlur={2}
          className={classes.loader}
        />
        <Head links={links} />
        <Routes>
          <Route path="/" element={<Navigate to="search" />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:id" element={<DescriptionVacancy />} />
          <Route path="favourites" element={<FavoritesPage />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </MantineProvider>
  );
};
const useStyles = createStyles(() => ({
  root: {
    background: "#F7F7F8",
    width: "100%",
    minHeight: "100vh",
  },
  loader: { position: "fixed" },
}));
