import { createContext, useContext } from "react";
export const TaskContext = createContext({
  tasks: [
    {
      id: "1",
      task: "task",
      title: "title",
      completed: false,
      important: false,
    },
  ],
  addTask: (task) => {},
  deleteTask: (id) => {},
  updateTask: (id, task) => {},
  toggleComplete: (id) => {},
  toggleImportant: (id) => {},
  addTitle: (id) => {},
});

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskProvider = TaskContext.Provider;
