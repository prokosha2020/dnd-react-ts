import React, { createContext, useState, useEffect } from "react";
import "@atlaskit/css-reset";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useJsonBox from "react-jsonbox";
import "./App.scss";
import {
  IFinitialData,
  Itask,
  Tcolumn,
  InnerListProps,
  Icontext,
  iTasks,
} from "./types";
import initialData from "./initialData";
import Column from "./components/Column";
import NewTask from "./components/NewTask";
import Filter from "./components/Filter";
import CustomButton from "./components/Button";
import Spinner from "./spinner/Spinner";

export const AppContext = createContext<Icontext>({
  editTask: () => {},
  status: [],
  marks: [],
  openDrawerWithStatus: () => {},
});

class InnerList extends React.PureComponent<InnerListProps, {}> {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds
      .map((taskid: string) => taskMap[taskid])
      .filter((v) => v);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

function App() {
  const [data, setData] = useState<IFinitialData>(initialData);
  const [status, setStatus] = useState<string[]>(initialData.status);
  const [marks, setMarks] = useState<string[]>(initialData.markColor);
  const [isActiveDrawer, setIsActiveDrawer] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState({});
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<string>("");
  // window.data = data;
  const { read, create, update } = useJsonBox();
  const getResp = async (): Promise<any> => {
    //todo
    try {
      setLoad(true);
      const { data } = await read();
      if (!data.length) {
        await create(initialData);
        return;
      }
      setData(data[0]);
      setStatus(data[0].status);
      setMarks(data[0].markColor);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getResp();
  }, []);
  const toggleActiveDrawer = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    const parentNode = target.parentNode as HTMLElement;
    if (
      target.classList.contains("cnt-drawer") ||
      target.classList.contains("create-task") ||
      parentNode.classList.contains("svg-close_drawer")
    ) {
      setIsActiveDrawer((prev: boolean) => !prev);
      if (isActiveDrawer) {
        setCurrentTask({});
        setCurrentColumn("");
      }
    }
  };
  const updateData = async (
    //todo
    prevState: any,
    newState: any,
    id: string,
    fn = () => {}
  ): Promise<any> => {
    try {
      const { data } = await update(newState, id);
      if (data.message === "Record updated.") {
        fn();
      } else {
        setData(prevState);
        alert("Failed response");
        throw Error("Failed response");
      }
    } catch (error) {
      setData(prevState);
      alert("Failed response");
      console.log(error);
    }
  };
  const saveTask = (item: Itask, flag: string): void => {
    if (flag) {
      const prevCol: Tcolumn = Object.values(data.columns).filter(
        (v: Tcolumn) => v.title === data.tasks[item.id].status
      )[0];
      const newFinish: Tcolumn = Object.values(data.columns).filter(
        (v: Tcolumn) => v.title === item.status
      )[0];
      const newFinishTaskIds: string[] = newFinish.taskIds.includes(item.id)
        ? [...newFinish.taskIds]
        : [...newFinish.taskIds, item.id];
      const newState: any = {
        ...data,
        tasks: { ...data.tasks, [item.id]: item },
        columns: {
          ...data.columns,
          [prevCol.id]: {
            ...prevCol,
            taskIds: prevCol.taskIds.filter((v: string) => v !== item.id),
          },
          [newFinish.id]: { ...newFinish, taskIds: newFinishTaskIds },
        },
      };
      updateData(data, newState, data._id, () =>
        setIsActiveDrawer((prev) => !prev)
      );
      setData(newState);
    } else {
      addTask(item);
    }
  };
  const addTask = async (item: Itask): Promise<any> => {
    const column: Tcolumn = Object.values(data.columns).filter(
      (v: Tcolumn) => v.title === item.status
    )[0];
    if (!column.taskIds.includes(item.id)) {
      column.taskIds.push(item.id);
      const newState = {
        ...data,
        tasks: { ...data.tasks, [item.id]: item },
        columns: { ...data.columns, [column.id]: column },
      };
      setLoad(true);
      try {
        const { data } = await create(newState);
        if (data) {
          setData(data);
          setIsActiveDrawer((prev) => !prev);
        } else {
          throw Error("Failed response");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    }
  };
  const editTask = (id: string): void => {
    setCurrentTask(data.tasks[id]);
    setIsActiveDrawer((prev) => !prev);
  };
  const toggleActiveSearch = (): void => {
    if (isActiveSearch) {
      setFilter("");
    }
    setIsActiveSearch((prev: boolean) => !prev);
  };

  const getTasks = () => {
    let { tasks } = data;
    if (filter) {
      tasks = Object.values(data.tasks).reduce((acc: iTasks, item) => {
        if (
          item.title.toLowerCase().includes(filter.toLowerCase()) ||
          item.content.toLowerCase().includes(filter.toLowerCase()) ||
          item.mark.titleMark.toLowerCase().includes(filter.toLowerCase())
        ) {
          acc[item.id] = item;
        }
        return acc;
      }, {});
    }
    return tasks;
  };
  const updateFilter = (value: string): void => {
    setFilter(value);
  };
  const openDrawerWithStatus = (
    e: React.MouseEvent<HTMLElement>,
    status: string
  ): void => {
    setCurrentColumn(status);
    setCurrentTask({});
    toggleActiveDrawer(e);
  };
  //#region
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "column") {
      const newColumnOrder: string[] = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      updateData(data, newState, data._id);
      setData(newState);
      return;
    }
    const start: Tcolumn = data.columns[source.droppableId];
    const finish: Tcolumn = data.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds: string[] = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn: Tcolumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState: IFinitialData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      updateData(data, newState, data._id);
      setData(newState);
      return;
    }
    const startTaskIds: string[] = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart: Tcolumn = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds: string[] = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish: Tcolumn = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState: IFinitialData = {
      ...data,
      tasks: {
        ...data.tasks,
        [draggableId]: { ...data.tasks[draggableId], status: finish.title },
      },
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    updateData(data, newState, data._id);
    setData(newState);
  };
  // # end region
  const context: Icontext = { editTask, status, marks, openDrawerWithStatus };
  return (
    <AppContext.Provider value={context}>
      <div className="main-cont">
        <div className="header_tasks">
          <CustomButton classBtn="create-task" onClick={toggleActiveDrawer} />
          {isActiveSearch ? (
            <Filter
              toggleActiveSearch={toggleActiveSearch}
              updateFilter={updateFilter}
            />
          ) : (
            <CustomButton classBtn="search-task" onClick={toggleActiveSearch} />
          )}
        </div>
        <NewTask
          currentColumn={currentColumn}
          currentTask={currentTask}
          isActiveDrawer={isActiveDrawer}
          saveTask={saveTask}
          toggleActiveDrawer={toggleActiveDrawer}
        />
        {load && <Spinner />}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided: any) => (
              <div
                className="main_cont-dnd"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="cont-dnd">
                  {data.columnOrder.map((columnId: any, index: any) => {
                    const column: Tcolumn = data.columns[columnId];
                    return (
                      <InnerList
                        key={column.id}
                        column={column}
                        taskMap={getTasks()}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </AppContext.Provider>
  );
}

export default App;
