import { useState, useEffect } from "react";
import TaskCard from "../taskCard";
import { Grid,Box } from "@mui/material";
import { useTask } from "../../context";
import NoTaskFoundImage from "../../assets/no-task-found.jpg";


const CompletedTasks = () => {
  const { tasks, setTasks } = useTask();
  const [allCompletedTasks, setAllCompletedTasks] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks && tasks.length > 0) {
      setTasks(tasks);
    }
  }, []);

  useEffect(() => {
    const completedTasks = tasks?.filter((taskData) => {
      return taskData?.completed;
    });
    setAllCompletedTasks(completedTasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Grid container sx={{ background: "" }}>
      {allCompletedTasks && allCompletedTasks.length > 0 ? (
        allCompletedTasks.map((taskData, index) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12} sx={{ padding: "0.5rem" }}>
              <TaskCard key={index} taskInfo={taskData} />
            </Grid>
          );
        })
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "85vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={NoTaskFoundImage}
            alt="no_task_found"
            style={{ width: "40%" }}
          />
        </Box>
      )}
    </Grid>
  );
};

export default CompletedTasks;
