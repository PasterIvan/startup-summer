import React from "react";

import { createStyles, Button } from "@mantine/core";

import { VacancyType } from "../../../api/types";
import { changeFavorites } from "../../../bll/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

type SvgStarProps = {
  vacancy: VacancyType;
};

export const SvgStar: React.FC<SvgStarProps> = ({ vacancy }) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const { favourites } = useAppSelector((state) => state.auth);
  const isFavorite = favourites.some((el) => el.id === vacancy.id);

  return (
    <Button
      compact
      variant="subtle"
      onClick={() => dispatch(changeFavorites(vacancy))}
      data-elem={`vacancy-${vacancy.id}-shortlist-button`}
      className={classes.button}
    >
      <svg
        className={isFavorite ? classes.starActive : classes.star}
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
          stroke="#ACADB9"
          strokeWidth="1.5"
        />
      </svg>
    </Button>
  );
};
const useStyles = createStyles((theme) => ({
  button: {
    padding: 0,
  },
  star: {
    minWidth: 22,
    "&:hover": {
      path: {
        stroke: theme.colors.blue[1],
      },
    },
  },
  starActive: {
    minWidth: 22,
    fill: theme.colors.blue[1],
    path: {
      stroke: theme.colors.blue[1],
    },
    "&:hover": {
      fill: theme.colors.blue[2],
      path: {
        stroke: theme.colors.blue[2],
      },
    },
  },
}));
