import React from "react";

import { createStyles } from "@mantine/core";

type SvgArrowProps = {
  onChange?: () => void;
  styles?: string;
};
export const SvgArrow: React.FC<SvgArrowProps> = ({ onChange, styles }) => {
  const { classes } = useStyles();

  const setStyle = (): string => {
    switch (styles) {
      case "inc":
        return classes.inc;
      case "dec":
        return classes.dec;
      default:
        return classes.arrow;
    }
  };

  return (
    <svg
      className={setStyle()}
      onClick={onChange}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33325 6L7.47929 9.55374C7.77888 9.81054 8.22096 9.81054 8.52055 9.55374L12.6666 6"
        stroke="#ACADB9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const useStyles = createStyles((theme) => ({
  arrow: { position: "absolute" },
  inc: {
    position: "absolute",
    right: 12,
    bottom: 19,
    transform: "rotate(-180deg)",
    "&:hover": {
      cursor: "pointer",
      path: { stroke: theme.colors.blue[1] },
    },
    "&:active": {
      path: { stroke: theme.colors.blue[0] },
    },
  },
  dec: {
    position: "absolute",
    right: 12,
    bottom: 7,
    "&:hover": {
      cursor: "pointer",
      path: { stroke: theme.colors.blue[1] },
    },
    "&:active": {
      path: { stroke: theme.colors.blue[0] },
    },
  },
}));
