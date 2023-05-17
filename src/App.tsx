import React, { useEffect, useState } from "react";

import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";

import { loginTC } from "./bll/authReducer";
import { DescriptionVacancy } from "./components/DescriptionVacancy/DescriptionVacancy";
import { Favorites } from "./components/Favorites/Favorites";
import { Head } from "./components/Header/Head";
import { NotFound } from "./components/NotFound/NotFound";
import { Search } from "./components/Search/Search";
import { requestStatus } from "./enums/requestStatus";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { myTheme } from "./themeConfig";

const links = [
  { link: "search", label: "Поиск вакансий" },
  { link: "favourites", label: "Избранное" },
];

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { access_token } = useAppSelector((state) => state.auth.login);
  const { statusApp } = useAppSelector((state) => state.app);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (statusApp === requestStatus.LOADING) setLoad(true);
    else setLoad(false);
  }, [statusApp]);

  useEffect(() => {
    if (access_token === "") dispatch(loginTC());
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
      <div style={{ background: "#F7F7F8", minHeight: "100vh" }}>
        <Head links={links} />
        <LoadingOverlay visible={load} overlayBlur={2} />
        <Routes>
          <Route path="/" element={<Navigate to="search" />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:id" element={<DescriptionVacancy />} />
          <Route path="favourites" element={<Favorites />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </MantineProvider>
  );
};
