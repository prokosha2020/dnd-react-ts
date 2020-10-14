import { IFinitialData } from "./types";
const initialData: IFinitialData = {
  _id: '',
  columns: {
    "column-1": {
      id: "column-1",
      title: "backlog",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "selected",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "running",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "evaluating",
      taskIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "live",
      taskIds: [],
    },
  },
  tasks: {},
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
  status: ["backlog", "selected", "running", "evaluating", "live"],
  markColor: ["default", "red", "purple", "green"],
};

export default initialData;
