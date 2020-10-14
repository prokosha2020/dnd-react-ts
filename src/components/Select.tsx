import React, { useContext } from "react";
import { Icontext, IPropsSelect } from "../types";
import { AppContext } from "../App";
import "./scss/select.scss";

function Select({ task, onChange }: IPropsSelect) {
  const { status } = useContext<Icontext>(AppContext);
  return (
    <div className="cont_select-status">
      <label className="select-status-label" htmlFor="status">
        Status
      </label>
      <select
        name="status"
        value={task.status}
        onChange={onChange}
        className="select-status"
      >
        <option className="select-status-option" value="-1">
          Choose status
        </option>
        {status.map((option: string) => {
          return (
            <option
              className="select-status-option"
              key={option}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
