import React, { useEffect, useState } from "react";

import { Container, Flex, Pagination } from "@mantine/core";

import { VacancyType } from "../../api/types";
import { setFavouritesPage } from "../../bll/authReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Vacancy } from "../common/Vacancy";
import { NotFound } from "../NotFound/NotFound";

export const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favourites, favouritesPage } = useAppSelector((state) => state.auth);
  const [favouritesInPage, setFavouritesInPage] = useState<VacancyType[]>([]);

  const totalPages = Math.ceil(favourites.length / 4);

  useEffect((): void => {
    const res: VacancyType[] = [];

    for (let i = 0; i < 4; i += 1) {
      const item = favourites[favouritesPage * 4 + i];

      if (item) res.push(item);
    }
    if (res.length === 0 && favouritesPage > 0) {
      dispatch(setFavouritesPage(favouritesPage - 1));
    } else {
      setFavouritesInPage(res);
    }
  }, [favouritesPage, favourites]);

  return (
    <Container>
      <Flex
        py={40}
        gap="md"
        justify="space-around"
        align="center"
        direction="column"
      >
        {favourites.length === 0 ? (
          <NotFound />
        ) : (
          <>
            {favouritesInPage.map((vacancy) => (
              <Vacancy key={vacancy.id} vacancy={vacancy} />
            ))}
            <Pagination
              pt="xl"
              total={totalPages}
              value={favouritesPage + 1}
              defaultValue={favouritesPage + 1}
              onChange={(value) => {
                dispatch(setFavouritesPage(value - 1));
              }}
            />
          </>
        )}
      </Flex>
    </Container>
  );
};
