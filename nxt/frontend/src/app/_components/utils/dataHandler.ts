import React, { useState } from "react";

export const useDataHandler = () => {
  const [data, setData] = useState([]);

  const handleDataUpdate = (newData: any) => {
    setData(newData);
  };

  return { data, handleDataUpdate };
};
