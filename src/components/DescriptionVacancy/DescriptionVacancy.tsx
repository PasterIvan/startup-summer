import React, { useEffect } from "react";

import { Container, Box, Flex } from "@mantine/core";
import { useParams } from "react-router-dom";

import { vacancyByIdTC } from "../../bll/vacanciesReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Vacancy } from "../common/Vacancy";

export const DescriptionVacancy: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { vacancy } = useAppSelector((state) => state.vacancies);

  useEffect(() => {
    if (id) dispatch(vacancyByIdTC(+id));
  }, []);

  return (
    <Container>
      <Flex
        py={40}
        gap="md"
        justify="space-around"
        align="center"
        direction="column"
      >
        <Vacancy vacancy={vacancy} />
        <Box
          pos="relative"
          sx={{
            backgroundColor: "#fff",
            padding: 24,
            borderRadius: "0.7rem",
            width: "100%",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }} />
        </Box>
      </Flex>
    </Container>
  );
};
