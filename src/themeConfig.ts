import { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

export const myTheme: MantineThemeOverride = {
  colorScheme: "light",
  colors: {
    blue: ["#3B7CD3", "#5E96FC", "#92C1FF", "#B7D6FF", "#C9E0FF", "#DEECFF"],
    white: ["#FFFFFF"],
    black: ["#232134"],
    myGray: ["#7B7C88", "#ACADB9", "#D5D6DC", "#EAEBED", "#F5F5F6", "#FFFFFF"],
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
                ? theme.colors.blue[0]
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
