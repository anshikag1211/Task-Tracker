import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Sidebar from "../sidebar/index";
import { Outlet } from "react-router-dom";
import { TaskProvider } from "../../context/index";
import "../../index.css";

const CommonLayout = () => {
  const [tasks, setTasks] = useState([]); // all task are stored here
  const addTask = (task) => {
    setTasks((prev) => [...prev, { id: Date.now(), ...task }]); //to add new
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (id, task) => {
    setTasks((prev) =>
      prev.map((prevtask) => (prevtask.id === id ? task : prevtask))
    );
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((prevtask) =>
        prevtask.id === id
          ? { ...prevtask, completed: !prevtask.completed }
          : prevtask
      )
    );
  };

  const toggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((prevtask) =>
        prevtask.id === id
          ? { ...prevtask, important: !prevtask.important }
          : prevtask
      )
    );
  };

  return (
    <TaskProvider
      value={{
        tasks,
        setTasks,
        updateTask,
        addTask,
        deleteTask,
        toggleComplete,
        toggleImportant,
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Sidebar children={<Outlet />} />
        </Grid>
      </Grid>
    </TaskProvider>
  );
};

export default CommonLayout;
