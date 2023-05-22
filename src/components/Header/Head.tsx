import React from "react";

import {
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  rem,
  Transition,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";

import { setParamsState } from "../../bll/reducers/filtersReducer";
import { useAppDispatch } from "../../hooks/hooks";
import logo from "../../img/logo.svg";

type ActionType = Record<string, boolean>;

interface HeaderResponsiveProps {
  links: Array<{ link: string; label: string }>;
}

export const Head: React.FC<HeaderResponsiveProps> = ({
  links,
}: HeaderResponsiveProps) => {
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure(false);

  const { classes } = useStyles();
  const setAction = ({ isActive }: ActionType): string =>
    isActive ? classes.linkActive : classes.link;

  const items = links.map((link) => (
    <NavLink
      key={link.link}
      to={link.link}
      className={setAction}
      onClick={() =>
        dispatch(
          setParamsState({
            page: undefined,
            count: "4",
            keyword: undefined,
            catalogues: undefined,
            payment_from: undefined,
            payment_to: undefined,
            published: "1",
          }),
        )
      }
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size="lg" className={classes.header}>
        <div className={classes.logoContainer}>
          <img src={logo} alt="logo" />
          <span className={classes.logo}>Jobored</span>
        </div>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};
export const HEADER_HEIGHT = rem(85);

const useStyles = createStyles((theme) => ({
  root: {
    background: "#FFFFFF",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  logoContainer: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    left: 15,
    [theme.fn.smallerThan("sm")]: {
      left: 20,
    },
  },

  logo: {
    marginLeft: 12,
    lineHeight: "36px",
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: "0.02em",
  },

  links: {
    gap: 60,
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    textDecoration: "none",
    color: theme.colors.black[0],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  linkActive: {
    display: "block",
    textDecoration: "none",
    color: theme.colors.blue[1],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  burger: {
    position: "absolute",
    right: 20,
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));
