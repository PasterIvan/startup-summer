import React, { useRef } from "react";

import { createStyles, NumberInput, NumberInputHandlers } from "@mantine/core";

import { SvgArrow } from "./Svg/SvgArrow";

type InputPaymentProps = {
  placeholder: string;
  min?: number;
  max?: number;
  value?: number;
  onChange: (val: number) => void;
};

export const InputPayment: React.FC<InputPaymentProps> = ({
  placeholder,
  min,
  max,
  value,
  onChange,
}) => {
  const inc = "inc";
  const dec = "dec";
  const { classes } = useStyles();

  const handlers = useRef<NumberInputHandlers>();
  const incrementHandler = (): void => {
    handlers.current?.increment();
  };
  const decrementHandler = (): void => {
    handlers.current?.decrement();
  };

  return (
    <div className={classes.container}>
      <NumberInput
        hideControls
        placeholder={placeholder}
        radius="sm"
        size="md"
        mt={8}
        min={min}
        max={max}
        value={value || ""}
        onChange={(val: number) => onChange(val)}
        handlersRef={handlers}
      />
      <SvgArrow onChange={incrementHandler} styles={inc} />
      <SvgArrow onChange={decrementHandler} styles={dec} />
    </div>
  );
};
const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    "&:hover": {
      input: {
        border: `1px solid ${theme.colors.blue[1]}`,
      },
    },
  },
}));
