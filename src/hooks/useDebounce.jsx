import React from "react";
import { useState, useEffect } from "react";

const useDebounce = (value, delay = 450) => {
  const [debounced, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      // console.log("first");
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
