import React, { useContext } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import CustomButton from "./Button";
import {
  svgBacklog,
  svgSelect,
  svgSettings,
  svgCircle,
  svgQuestion,
} from "./Icon";
import { AppContext } from "../App";
import {
  isDraggingOverStylesProps,
  IPropsColumn,
  Icontext,
  Itask,
  IPropsInnnerListColumn,
} from "../types";

const Container = styled.div`
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  width: 20%;
  border: none;
  padding-bottom: 50px;
`;
const Title = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const TaskList = styled.div<isDraggingOverStylesProps>`
  padding: 10px;
  // background: ${(props) => (props.isDraggingOver ? "blue" : "white")}
  flex-grow: 1;
  min-height: 100vh;
`;

class InnnerList extends React.Component<{ tasks: Array<Itask> }, {}> {
  shouldComponentUpdate(nextProps: IPropsInnnerListColumn): boolean {
    return nextProps.tasks === this.props.tasks ? false : true;
  }
  render() {
    return this.props.tasks.map((task: Itask, index: number) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

function Column({ column, tasks, index }: IPropsColumn) {
  const { openDrawerWithStatus } = useContext<Icontext>(AppContext);
  const getIcon = () => {
    const { title } = column;
    if (title === "backlog") {
      return svgBacklog;
    }
    if (title === "selected") {
      return svgSelect;
    }
    if (title === "running") {
      return svgSettings;
    }
    if (title === "evaluating") {
      return svgQuestion;
    }
    if (title === "live") {
      return svgCircle;
    }
  };
  const openDrawer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    openDrawerWithStatus(e, column.title);
  };
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={column.title}
        >
          <Title
            className={`${column.title}_title`}
            {...provided.dragHandleProps}
          >
            {getIcon()}
            <h3 className="title-column">{column.title}</h3>
            <div className="tasks-quantity">{tasks.length}</div>
          </Title>
          <Droppable droppableId={column.id} type="task">
            {(provided: any, snapshot: any) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                // {...provided.dragHandleProps}
              >
                <div className="cont_taskList">
                  <InnnerList tasks={tasks} />
                  {provided.placeholder}
                  <CustomButton classBtn="create-task" onClick={openDrawer} />
                </div>
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}
export default Column;
