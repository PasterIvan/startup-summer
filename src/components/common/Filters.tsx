import React, { useEffect, useState } from "react";

import { Box, Button, createStyles, Flex, Select, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import { cataloguesTC } from "../../bll/filtersReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { InputPayment } from "./InputPayment";
import { SvgArrow } from "./Svg/SvgArrow";
import { SvgClose } from "./Svg/SvgClose";

type FiltersProps = {
  onChangeFilters: (
    catalog: string | null,
    payment_from: string | undefined,
    payment_to: string | undefined,
  ) => void;
};

export const Filters: React.FC<FiltersProps> = ({ onChangeFilters }) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { filters } = useAppSelector((state) => state.filters);
  const [searchParams] = useSearchParams();

  const [catalog, setCatalog] = useState(
    searchParams.get("catalogues") || null,
  );
  const [paymentFrom, setPaymentFrom] = useState(
    searchParams.get("payment_from") || undefined,
  );
  const [paymentTo, setPaymentTo] = useState(
    searchParams.get("payment_to") || undefined,
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(cataloguesTC());
  }, []);

  return (
    <Box className={classes.box}>
      <Flex justify="space-between">
        <Text fw={700} fz="md" size="lg" inline>
          Фильтры
        </Text>
        <Button
          variant="subtle"
          color="myGray"
          size="md"
          className={classes.buttonClose}
          rightIcon={<SvgClose />}
          styles={() => ({
            rightIcon: {
              marginLeft: 4,
            },
          })}
          onClick={() => {
            setCatalog(null);
            setPaymentFrom(undefined);
            setPaymentTo(undefined);
            onChangeFilters(null, undefined, undefined);
          }}
        >
          Сбросить все
        </Button>
      </Flex>
      <Text fw={700} pt={32} pb={8} fz="sm" inline>
        Отрасль
      </Text>
      <Select
        data-elem="industry-select"
        className={classes.select}
        placeholder="Выберете отрасль"
        rightSection={<SvgArrow />}
        onChange={(value) => setCatalog(value || null)}
        radius="sm"
        size="xs"
        styles={{
          dropdown: {
            borderRadius: "8px",
            zIndex: 30,
          },
          input: {
            "&:hover": {
              border: "1px solid #5E96FC",
            },
          },
          rightSection: {
            paddingRight: `${isOpen ? "0px" : "12px"}`,
            paddingLeft: `${isOpen ? "12px" : "0"}`,
            pointerEvents: "none",
            transform: `${isOpen && "rotate(180deg)"}`,
            transition: ".3s",
            svg: { width: 24, height: 24 },
            path: { stroke: `${isOpen && "#5E96FC"}` },
          },
          item: {
            borderRadius: "8px",
            "&[data-hovered]": { background: "#DEECFF" },
            "&[data-selected]": { background: "#5E96FC" },
          },
        }}
        value={catalog}
        data={filters.map((el) => ({
          value: el.key.toString(),
          label: el.title,
        }))}
        onDropdownOpen={() => setIsOpen(true)}
        onDropdownClose={() => setIsOpen(false)}
      />
      <Text fw={700} fz="sm" inline>
        Оклад
      </Text>
      <InputPayment
        data-elem="salary-from-input"
        placeholder="От"
        min={0}
        max={Number(paymentTo) || undefined}
        value={Number(paymentFrom) || undefined}
        onChange={(val) => {
          setPaymentFrom(val.toString());
        }}
      />
      <InputPayment
        data-elem="salary-to-input"
        placeholder="До"
        min={Number(paymentFrom) || 0}
        value={Number(paymentTo) || undefined}
        onChange={(val) => {
          setPaymentTo(val.toString());
        }}
      />
      <Button
        data-elem="search-button"
        fullWidth
        size="md"
        radius="sm"
        mt={20}
        onClick={() => onChangeFilters(catalog, paymentFrom, paymentTo)}
      >
        Применить
      </Button>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    position: "relative",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: theme.radius.lg,
    maxWidth: 773,
    maxHeight: 360,
    border: `1px solid ${theme.colors.gray[3]}`,

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  },
  close: {
    width: "16px",
    "&:hover": {
      fill: theme.colors.blue[2],
    },
  },
  select: {
    width: "100%",
    minWidth: 275,
    marginBottom: 20,
    borderRadius: "0.5rem",
    input: { height: "42px" },
    [theme.fn.smallerThan("md")]: {
      minWidth: "auto",
    },
  },
  buttonClose: {
    padding: 0,
    height: 20,
    "&:hover": {
      line: {
        stroke: theme.colors.blue[2],
      },
    },
    "&:active": {
      line: {
        stroke: theme.colors.blue[1],
      },
    },
  },
}));
