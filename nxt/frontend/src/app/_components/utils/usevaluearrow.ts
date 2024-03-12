import { useEffect, useState, useRef } from "react";

const useValueArrow = (value: any) => {
  const [arrowIcon, setArrowIcon] = useState("");
  const [valueClassName, setValueClassName] = useState("");
  const prevValueRef = useRef<any>(null);

  useEffect(() => {
    const currentValue = parseFloat(value);
    const prevValue =
      prevValueRef.current !== null ? parseFloat(prevValueRef.current) : null;

    if (prevValue !== null) {
      const arrowIcon =
        currentValue > prevValue ? "↑" : currentValue < prevValue ? "↓" : "";
      const valueClassName =
        currentValue > prevValue
          ? "text-green-500"
          : currentValue < prevValue
          ? "text-red-500"
          : "";

      setArrowIcon(arrowIcon);
      setValueClassName(valueClassName);
    }

    prevValueRef.current = value;
  }, [value]);

  return { arrowIcon, valueClassName };
};

export default useValueArrow;
