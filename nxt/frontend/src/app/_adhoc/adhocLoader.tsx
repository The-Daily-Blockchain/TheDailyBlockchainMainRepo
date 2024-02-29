import React from "react";
import Loader from "../loader";

interface Props {
  isLoading: any;
  children: any;
}

const AdHocLoader = ({ isLoading, children }: Props) => {
  return isLoading ? <Loader /> : children;
};

export default AdHocLoader;
