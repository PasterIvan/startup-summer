import React, { useEffect, useState } from "react";

import { Box, Button, Flex, Select, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

import { cataloguesTC } from "../../bll/filtersReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import close from "../../img/Close.svg";

import { InputPayment } from "./InputPayment";

type FiltersProps = {
  onChangeFilters: (
    catalog: string | undefined,
    payment_from: string | undefined,
    payment_to: string | undefined,
  ) => void;
};

export const Filters: React.FC<FiltersProps> = ({ onChangeFilters }) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);
  const [searchParams] = useSearchParams();

  const [catalog, setCatalog] = useState(
    searchParams.get("catalogues") || undefined,
  );
  const [paymentFrom, setPaymentFrom] = useState(
    searchParams.get("payment_from") || undefined,
  );
  const [paymentTo, setPaymentTo] = useState(
    searchParams.get("payment_to") || undefined,
  );

  useEffect(() => {
    dispatch(cataloguesTC());
  }, []);

  return (
    <Box
      maw={400}
      pos="relative"
      mah="360px"
      sx={{
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: "0.7rem",
      }}
    >
      <Flex justify="space-between">
        <Text fw={700} size="lg" inline>
          Фильтры
        </Text>
        <Button
          variant="subtle"
          color="gray"
          radius="md"
          size="md"
          compact
          h={20}
          p={0}
          rightIcon={<img src={close} alt="close" />}
          onClick={() => {
            setCatalog(undefined);
            setPaymentFrom(undefined);
            setPaymentTo(undefined);
            onChangeFilters(undefined, undefined, undefined);
          }}
        >
          Сбросить все
        </Button>
      </Flex>
      <Text fw={700} pt={32} pb={8} inline>
        Отрасль
      </Text>
      <Select
        placeholder="Выберете отрасль"
        rightSection={<IconChevronDown size="1rem" />}
        rightSectionWidth={36}
        onChange={(value) => setCatalog(value || undefined)}
        radius="md"
        size="md"
        styles={{ rightSection: { pointerEvents: "none" } }}
        pb={20}
        value={catalog}
        positionDependencies={[catalog]}
        data={filters.map((el) => ({
          value: el.key.toString(),
          label: el.title_trimmed,
        }))}
        sx={{ width: 275, borderRadius: "0.5rem" }}
      />
      <Text fw={700} inline>
        Оклад
      </Text>
      <InputPayment
        placeholder="От"
        min={1}
        value={Number(paymentFrom) || undefined}
        onChange={(val) => {
          setPaymentFrom(val.toString());
        }}
      />
      <InputPayment
        placeholder="До"
        min={1}
        value={Number(paymentTo) || undefined}
        onChange={(val) => {
          setPaymentTo(val.toString());
        }}
      />
      <Button
        fullWidth
        size="md"
        radius="md"
        mt={20}
        onClick={() => onChangeFilters(catalog, paymentFrom, paymentTo)}
      >
        Применить
      </Button>
    </Box>
  );
};
