import React, { ChangeEvent, useState } from "react";

import { Button, Flex, Input, Pagination } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../hooks/hooks";
import { Vacancy } from "../common/Vacancy";

export const Vacancies: React.FC = () => {
  const { vacancies, total } = useAppSelector((state) => state.vacancies);
  const { page, keyword } = useAppSelector(
    (state) => state.filters.paramsState,
  );

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
    <Flex
      mih={50}
      miw={773}
      gap="md"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="nowrap"
    >
      <Input
        size="lg"
        radius="0.7rem"
        miw={773}
        icon={<IconSearch size="1.5rem" />}
        defaultValue={newKeyword}
        placeholder="Введите название вакансии"
        rightSection={
          <Button radius="md" onClick={setKeywordSearch}>
            Поиск
          </Button>
        }
        rightSectionWidth={100}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setKeyword(event.currentTarget.value);
        }}
      />
      {vacancies.map((vacancy) => (
        <Vacancy key={vacancy.id} vacancy={vacancy} />
      ))}
      <Pagination
        pt="xl"
        total={total}
        value={Number(searchParams.get("page")) + 1 || 0}
        defaultValue={Number(page) + 1 || 0}
        onChange={(value) => {
          setPageParam((value - 1).toString());
        }}
      />
    </Flex>
  );
};
