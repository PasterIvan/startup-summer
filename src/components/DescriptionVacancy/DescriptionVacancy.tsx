import React, { useEffect } from "react";

import { Container, Box, Flex, createStyles } from "@mantine/core";
import { useParams } from "react-router-dom";

import { vacancyByIdTC } from "../../bll/vacanciesReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Vacancy } from "../common/Vacancy";

export const DescriptionVacancy: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { id } = useParams();
  const { vacancy } = useAppSelector((state) => state.vacancies);

  useEffect(() => {
    if (id) dispatch(vacancyByIdTC(+id));
  }, []);

  return (
    <Container>
      <Flex gap="md" className={classes.flex}>
        <Vacancy vacancy={vacancy} />
        <Box className={classes.box}>
          <div dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }} />
        </Box>
      </Flex>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  flex: {
    padding: "40px 0 40px 0",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  box: {
    position: "relative",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: theme.radius.md,
    width: "100%",
  },
}));
