import { useEffect, useRef, useState } from "react";

export const useElementWidth = (): [ref: any, width: number | null] => {
  const ref: any = useRef();
  const [width, setWidth] = useState<null | number>(null);

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;

      setWidth(width);
    }),
  );

  useEffect(() => {
    observer.current.observe(ref.current);
  }, [ref, observer]);

  return [ref, width];
};
