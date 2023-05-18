import { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

export const myTheme: MantineThemeOverride = {
  colorScheme: "light",
  colors: {
    blue: ["#3B7CD3", "#5E96FC", "#92C1FF", "#B7D6FF", "#C9E0FF", "#DEECFF"],
    white: ["#FFFFFF"],
    black: ["#232134"],
    myGray: ["#7B7C88", "#ACADB9", "#D5D6DC", "#EAEBED", "#F5F5F6", "#FFFFFF"],
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
  fontSizes: {
    xs: "14px",
    sm: "16px",
    md: "20px",
    lg: "26px",
    xl: "28px",
  },
  headings: {
    fontWeight: 400,
  },
  primaryColor: "blue",
  primaryShade: 1,
  activeStyles: { transform: "none" },
  components: {
    Button: {
      styles: (theme, params: ButtonStylesParams, { variant }) => ({
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: variant === "subtle" ? 20 : 21,
          color: params.color === "myGrey" ? theme.colors.gray : undefined,
          "&:hover": {
            color: variant === "subtle" ? theme.colors.blue[2] : "none",
            backgroundColor:
              variant === "light" || variant === "subtle"
                ? theme.colors.white[0]
                : "none",
            borderColor: variant === "light" ? theme.colors.blue[1] : undefined,
          },
          "&:active": {
            color:
              variant === "light" || variant === "subtle"
                ? theme.colors.blue[1]
                : undefined,
            borderColor: variant === "light" ? theme.colors.blue[0] : undefined,
            backgroundColor:
              variant === "light" || variant === "subtle"
                ? theme.colors.white[0]
                : theme.colors.blue[0],
          },
        },
      }),
    },
  },
};
