import React from "react";
import CustomButton from "./Button";
import { IPropsFilter } from "../types";

function Filter({ updateFilter, toggleActiveSearch }: IPropsFilter) {
  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    updateFilter(target.value);
  };
  return (
    <div className="cont_input-search">
      <input type="text" className="input-search" onChange={handleFilter} />
      <CustomButton classBtn="search-task" onClick={toggleActiveSearch} />
    </div>
  );
}

export default Filter;
