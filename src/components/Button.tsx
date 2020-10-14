import React from "react";
import { svgSearch, svgPlus } from "./Icon";
import { IPropsCustomButton } from "../types";

const CustomButton = ({ classBtn, ...props }: IPropsCustomButton) => {
  return (
    <button {...props} className={classBtn}>
      {classBtn === "search-task" ? svgSearch : svgPlus}
    </button>
  );
};

export default CustomButton;
