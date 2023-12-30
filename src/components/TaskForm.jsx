import React, { useState } from "react";
import { useTask } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export const styles = {
  form: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    background: "#F1F1F1",
    rowGap: "0.5rem",
    padding:"1rem 1.5rem",
    border:"none",
    borderRadius:"0.5rem",
  },
  inputBox: {
    outline:"none",
    padding: "0.75rem",
    border: "none",
    margin: "2px 0",
    color: "#000",
    fontWeight: 600,
    border:"none",
    borderRadius:"0.25rem",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    columnGap:"0.25rem",
    padding: "0.75rem 0",
    background: "blue",
    border: "none",
    fontSize: "1rem",
    color: "white",
    cursor: "pointer",
    border: "none",
    borderRadius: "0.25rem",
    fontWeight: 600,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "5px",
  },
};

const TaskForm = () => {
  const [task, setTask] = useState("");
  const { addTask } = useTask();
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const add = (e) => {
    e?.preventDefault();
    if (!(task && title)) return;
    addTask({ task, title, completed: false });
    setTask("");
    setTitle("");
  };

  return (
    <form onSubmit={add} style={styles.form}>
      <div style={styles.container}>
        <input
          type="text"
          placeholder="Enter to-do title"
          style={styles.inputBox}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter your description"
          style={styles.inputBox}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <div style={styles.buttonContainer}>
          <button style={styles.button} type="submit">
            <FontAwesomeIcon icon={faAdd} />
            <p>ADD</p>
          </button>
        </div>
        {/* <div style={styles.filterButtons}>
          <button
            style={filter === "all" ? styles.activeFilterButton : styles.filterButton}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            style={filter === "active" ? styles.activeFilterButton : styles.filterButton}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </button>
          <button
            style={filter === "completed" ? styles.activeFilterButton : styles.filterButton}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
        </div> */}
      </div>
    </form>
  );
};

export default TaskForm;
