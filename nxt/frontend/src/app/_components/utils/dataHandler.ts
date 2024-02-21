import React, { useCallback, useState } from "react";

export const useDataHandler = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    error: null,
  });
  const handleDataUpdate = useCallback((newData: any) => {
    setState({
      data: newData,
      isLoading: false,
      error: null,
    });
  }, []);

  const handleLoading = useCallback((loading: boolean) => {
    setState((prevState) => ({
      ...prevState,
      error: loading ? null : prevState.error,
      isLoading: loading,
    }));
  }, []);

  const handleError = useCallback((err: any) => {
    setState((prevState) => ({ ...prevState, error: err }));
  }, []);

  return { ...state, handleDataUpdate, handleLoading, handleError };
};
