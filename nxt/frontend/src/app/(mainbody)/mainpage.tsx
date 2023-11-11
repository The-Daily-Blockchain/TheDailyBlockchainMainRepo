import React from "react";
import LeftPage from "./leftpage";
import RightPage from "./rightpage";

const MainPage = () => {
  return (
    <div className="grid grid-cols-2 w-10/12 mx-auto">
      <LeftPage />
      <RightPage />
    </div>
  );
};

export default MainPage;
