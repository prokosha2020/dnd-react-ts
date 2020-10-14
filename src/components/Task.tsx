import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { svgSettings, svgCircle } from "./Icon";
import { AppContext } from "../App";
import { IPropsTask, Icontext, isDraggingStylesProps } from "../types";
import "./scss/task.scss";

const Container = styled.div<isDraggingStylesProps>`
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "deepskyblue" : "white")};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: none;
  position: relative;
`;
const Completed = () => (
  <div className="task-completed">
    {svgCircle}
    <span className="task-completed_title">Completed</span>
  </div>
);

function Task({ task, index }: IPropsTask) {
  const { editTask } = useContext<Icontext>(AppContext);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  useEffect(() => {
    if (task && task.status === "live") {
      setIsCompleted(true);
    }
  }, [task]);

  const isActive: boolean = task.mark.bgMark !== "default";
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: any, snapshot: any) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
        >
          {isCompleted && <Completed />}
          <div className={`task_cont ${isCompleted ? "completed" : ""}`}>
            {isActive && (
              <div
                className={`wrapper-task-mark ${
                  isCompleted ? "completed" : ""
                }`}
              >
                <div
                  className="task_cont-task-mark"
                  style={
                    isActive ? { backgroundColor: task.mark.bgMark } : undefined
                  }
                >
                  {task.mark.titleMark}
                </div>
              </div>
            )}
            <h3 className="task_cont-task-title">{task.title}</h3>
            <p className="task_cont-task-descr">{task.content}</p>
            {!isCompleted && (
              <button className="edit-task" onClick={() => editTask(task.id)}>
                {svgSettings}
              </button>
            )}
          </div>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
