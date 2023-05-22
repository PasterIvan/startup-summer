import React from "react";

import { createStyles, Flex, Image, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

import { VacancyType } from "../../api/types";
import pin from "../../img/pin.svg";
import { payment } from "../../utils/payment";

import { SvgStar } from "./Svg/SvgStar";

type VacancyProps = {
  vacancy: VacancyType;
};

export const VacancyCard: React.FC<VacancyProps> = ({ vacancy }) => {
  const { classes } = useStyles();

  return (
    <Flex data-elem={`vacancy-${vacancy.id}`} className={classes.container}>
      <Flex w="100%" justify="space-between" direction="row">
        <NavLink
          to={`../search/${vacancy.id}`}
          style={{ textDecoration: "none" }}
        >
          <Text fz="md" fw={600} c="blue">
            {vacancy.profession}
          </Text>
        </NavLink>
        <SvgStar vacancy={vacancy} />
      </Flex>
      <Flex className={classes.payment}>
        <Text fw={600} fz="sm" className={classes.paymentText}>
          з/п {payment(vacancy)}
        </Text>
        <div className={classes.dot}>•</div>
        <Text fz="sm" className={classes.paymentText}>
          {vacancy.type_of_work.title}
        </Text>
      </Flex>
      <Flex align="center" gap={7}>
        <Image maw={22} src={pin} alt="Pin" />
        <Text fz="sm">{vacancy.town.title}</Text>
      </Flex>
    </Flex>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: theme.radius.md,
    width: "100%",
    maxWidth: 773,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 5,
    border: `1px solid ${theme.colors.gray[3]}`,
  },

  payment: {
    gap: 12,
    [theme.fn.smallerThan("sm")]: { flexDirection: "column", gap: 5 },
  },
  paymentText: {
    alignSelf: "center",
    [theme.fn.smallerThan("sm")]: { alignSelf: "start" },
  },

  dot: {
    color: "gray",
    [theme.fn.smallerThan("sm")]: { display: "none" },
  },
}));
