import React, { useContext } from "react";
import "./scss/mark.scss";
import { AppContext } from "../App";
import { IPropsMark, Icontext } from "../types";

function Mark({ task, onChange }: IPropsMark) {
  const { marks } = useContext<Icontext>(AppContext);
  return (
    <div className="task_mark">
      <div className="cont_task_mark-title">
        <h3 className="task_mark-title">Marks</h3>
      </div>
      <label className="task-title-label" htmlFor="titleMark">
        Title
      </label>
      <input
        value={task.mark.titleMark}
        onChange={onChange}
        className="task-title"
        type="text"
        name="titleMark"
        id="titleMark"
      />
      <div className="cont_tasks_mark-cb">
        {marks.map((item, index) => (
          <div className="cont_task_mark" key={item}>
            <input
              value={item}
              id={`cb${index}`}
              onChange={onChange}
              className="task_mark-cb"
              type="radio"
              name="bgMark"
              checked={task.mark.bgMark.includes(item)}
            />
            <label
              style={{ backgroundColor: item }}
              className={`mark-${item} mark`}
              htmlFor={`cb${index}`}
            >
              {item === "default" && "X"}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mark;
