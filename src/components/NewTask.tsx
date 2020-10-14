import React, { useState, useEffect } from "react";
import { generate as id } from "shortid";
import "./scss/newtask.scss";
import Mark from "./Mark";
import Select from "./Select";
import { Itask, IPropsNewTask } from "../types";

const initialData = {
  title: "",
  content: "",
  id: "",
  status: "",
  mark: { titleMark: "", bgMark: "default" },
};

function NewTask({
  currentColumn,
  currentTask,
  isActiveDrawer,
  saveTask,
  toggleActiveDrawer,
}: IPropsNewTask) {
  const [data, setData] = useState<Itask>(initialData);
  useEffect(() => {
    if (Object.keys(currentTask).length) {
      setData(currentTask);
    } else if (currentColumn) {
      setData({ ...initialData, status: currentColumn });
    } else {
      setData(initialData);
    }
  }, [currentTask, currentColumn]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.classList.contains("btn-create_task")) {
      const flag = data.id ? "edit" : "";
      let res: Itask = data;
      if (data.mark.titleMark && data.mark.bgMark === "default") {
        res = { ...data, mark: { ...data.mark, bgMark: "green" } };
      } else if (!data.status) {
        res = { ...data, status: "backlog" };
      }
      saveTask({ ...res, id: res.id || id() }, flag);
      setData(initialData);
    }
  };
  const handleChange = ({
    target,
  }: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >): void => {
    const value = target.value;
    if (target.name === "titleMark" || target.name === "bgMark") {
      setData({ ...data, mark: { ...data.mark, [target.name]: value } });
    } else {
      setData({ ...data, [target.name]: value });
    }
  };
  return (
    <div
      className={`cnt-drawer ${isActiveDrawer ? "active" : ""}`}
      onClick={toggleActiveDrawer}
    >
      <div className="drawer">
        <form className="create_task" onSubmit={handleSubmit}>
          <div className="title-create_task">Title:</div>
          <input
            name="title"
            onChange={handleChange}
            value={data.title}
            type="text"
            className="task-title"
          />
          <div className="descr">Description:</div>
          <textarea
            name="content"
            className="task-descr"
            onChange={handleChange}
            value={data.content}
          ></textarea>
          <Mark task={data} onChange={handleChange} />
          <Select task={data} onChange={handleChange} />
          <button
            type="submit"
            className="btn-create_task"
            onClick={handleSubmit}
          >
            save
          </button>
          <button className="btn-close_drawer">
            <svg
              aria-hidden="true"
              focusable="false"
              className="svg-close_drawer"
              viewBox="0 0 352 512"
            >
              <path
                data-svg="close_drawer"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
