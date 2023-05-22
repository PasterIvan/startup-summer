import React, { ChangeEvent, useState } from "react";

import {
  Button,
  createStyles,
  Flex,
  Image,
  Input,
  Pagination,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../hooks/hooks";
import { useElementWidth } from "../../hooks/useElementWidth";
import search from "../../img/search.svg";
import { VacancyCard } from "../common/VacancyCard";
import { NotFound } from "../NotFound/NotFound";

export const Vacancies: React.FC = () => {
  const { vacancies, totalPages } = useAppSelector((state) => state.vacancies);
  const { page, keyword } = useAppSelector(
    (state) => state.filters.paramsState,
  );
  const { classes } = useStyles();
  const [ref, width] = useElementWidth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [newKeyword, setKeyword] = useState(keyword);

  const setKeywordSearch = (): void => {
    const queryParams: {
      keyword?: string;
    } = {};

    if (newKeyword) queryParams.keyword = newKeyword;
    else searchParams.delete("keyword");

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
      page: "0",
    });
  };

  const setPageParam = (value: string): void => {
    const queryParams: {
      page?: string;
    } = {};

    if (value) queryParams.page = value;
    else searchParams.delete("page");

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    });
  };

  return (
    <Flex ref={ref} className={classes.flex} gap="16px">
      <Input
        data-elem="search-input"
        className={classes.input}
        size="xs"
        radius="sm"
        w="100%"
        icon={<Image src={search} miw={16} ml={12} mr={8} alt="Pin" />}
        defaultValue={newKeyword}
        placeholder="Введите название вакансии"
        rightSection={
          <Button
            data-elem="search-button"
            radius="sm"
            onClick={setKeywordSearch}
          >
            Поиск
          </Button>
        }
        rightSectionWidth={100}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setKeyword(event.currentTarget.value);
        }}
      />
      {vacancies.length === 0 ? (
        <NotFound notButton />
      ) : (
        vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))
      )}
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          siblings={width && width < 380 ? 0 : 1}
          className={classes.paginator}
          size={width && width < 380 ? "sm" : "md"}
          value={Number(searchParams.get("page")) + 1 || 0}
          defaultValue={Number(page) + 1 || 0}
          onChange={(value) => {
            setPageParam((value - 1).toString());
          }}
        />
      )}
    </Flex>
  );
};

const useStyles = createStyles((theme) => ({
  flex: {
    width: "100%",
    maxWidth: 773,
    minHeight: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap",

    [theme.fn.smallerThan("xl")]: {
      justifyContent: "center",
      minWidth: "auto",
    },
  },
  paginator: {
    paddingTop: 24,
    button: {
      fontSize: theme.fontSizes.sm,
    },
  },
  input: {
    input: { height: "48px" },
    "&:hover": {
      input: {
        border: `1px solid ${theme.colors.blue[1]}`,
      },
    },
  },
}));
