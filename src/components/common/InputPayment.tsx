import React, { useRef } from "react";

import { NumberInput, NumberInputHandlers } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

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
  const handlers = useRef<NumberInputHandlers>();
  const incrementHandler = (): void => {
    handlers.current?.increment();
  };
  const decrementHandler = (): void => {
    handlers.current?.decrement();
  };

  return (
    <div style={{ position: "relative" }}>
      <NumberInput
        hideControls
        placeholder={placeholder}
        radius="md"
        size="md"
        mt={8}
        min={min}
        max={max}
        value={value || ""}
        onChange={(val: number) => onChange(val)}
        handlersRef={handlers}
      />
      <IconChevronUp
        size="0.8rem"
        style={{ position: "absolute", right: 13, top: 6 }}
        onClick={incrementHandler}
      />
      <IconChevronDown
        size="0.8rem"
        style={{ position: "absolute", right: 13, bottom: 6 }}
        onClick={decrementHandler}
      />
    </div>
  );
};
