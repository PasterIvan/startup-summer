import React, { useEffect, useState } from "react";

import { Container, createStyles, Flex, Pagination } from "@mantine/core";

import { VacancyType } from "../../api/types";
import { setFavouritesPage } from "../../bll/authReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useElementWidth } from "../../hooks/useElementWidth";
import { Vacancy } from "../common/Vacancy";
import { NotFound } from "../NotFound/NotFound";

export const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const [ref, width] = useElementWidth();

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
    <Container ref={ref}>
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
              total={totalPages}
              className={classes.paginator}
              siblings={width && width < 380 ? 0 : 1}
              size={width && width < 500 ? "sm" : "md"}
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

const useStyles = createStyles((theme) => ({
  paginator: {
    paddingTop: 24,
    button: {
      fontSize: theme.fontSizes.sm,
    },
  },
}));
