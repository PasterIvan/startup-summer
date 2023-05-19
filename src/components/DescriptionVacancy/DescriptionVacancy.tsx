import React, { useEffect } from "react";

import { Box, Container, createStyles, Flex, Image, Text } from "@mantine/core";
import { useParams } from "react-router-dom";

import { vacancyByIdTC } from "../../bll/vacanciesReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import pin from "../../img/pin.svg";
import { SvgStar } from "../common/Svg/SvgStar/SvgStar";

export const DescriptionVacancy: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { id } = useParams();
  const { vacancy } = useAppSelector((state) => state.vacancies);

  const payment = (from: number, to: number): string => {
    let res = "";

    if (from !== 0 && to !== 0) {
      res +=
        from === to
          ? `${to} ${vacancy.currency}`
          : `${from} - ${to} ${vacancy.currency}`;
    }
    if (from === 0 && to === 0) {
      res += vacancy.agreement ? `по договоренности` : `не указана`;
    }
    if ((from === 0 && to !== 0) || (from !== 0 && to === 0)) {
      if (from === 0 && to !== 0) res += `до ${to} ${vacancy.currency}`;
      if (from !== 0 && to === 0) res += `от ${from} ${vacancy.currency}`;
    }

    return res;
  };

  useEffect(() => {
    if (id) dispatch(vacancyByIdTC(+id));
  }, []);

  return (
    <Container className={classes.flex}>
      <Flex className={classes.container}>
        <Flex w="100%" justify="space-between" direction="row">
          <Text fz="xl" fw={700} lh="34px">
            {vacancy.profession}
          </Text>
          <SvgStar vacancy={vacancy} />
        </Flex>
        <Flex className={classes.payment}>
          <Text fz="md" fw={700}>
            з/п {payment(vacancy.payment_from, vacancy.payment_to)}
          </Text>
          <div className={classes.dot}>•</div>
          <Text fz="md">{vacancy.type_of_work.title}</Text>
        </Flex>
        <Flex align="center" gap={8}>
          <Image maw={22} src={pin} alt="Pin" />
          <Text fz="sm">{vacancy.town.title}</Text>
        </Flex>
      </Flex>
      <Box className={classes.box}>
        <div dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }} />
      </Box>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  flex: {
    display: "flex",
    maxWidth: 773,
    gap: 20,
    padding: "40px 0",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    [theme.fn.smallerThan("sm")]: { margin: "0 20px" },
  },
  box: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[3]}`,
  },
  container: {
    display: "flex",
    position: "relative",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: theme.radius.md,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 10,
    border: `1px solid ${theme.colors.gray[3]}`,
  },
  payment: {
    gap: 12,
    [theme.fn.smallerThan("sm")]: { flexDirection: "column" },
  },

  dot: {
    color: "gray",
    [theme.fn.smallerThan("sm")]: { display: "none" },
  },
}));
