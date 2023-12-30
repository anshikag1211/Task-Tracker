import React from "react";
import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";

const styles = {
  taskbar: {
    background: "#FCFCFC",
    borderRadius: "0.25rem",
    width: "300px",
    border: "none",
    maxHeight: "225px",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    overflowY: "auto",
    paddingBottom: "0.5rem",
  },

  mainContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "1.2vh 1vh 0 1vh",
    justifyContent: "space-between",
    padding: "0.75rem 0.5rem",
    position: "sticky",
    top: 0,
  },

  titleContainer: {
    display: "flex",
    gap: "1vh",
  },

  checkbox: {
    width: "8%",
  },

  title: (isCompleted) => {
    return {
      border: "none",
      fontSize: "1rem",
      width: "70%",
      fontWeight: 600,
      outline: "none",
      background: isCompleted ? "lightgreen" : "transparent",
    };
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    columnGap: "0.75rem",
  },

  button: {
    border: "none",
    display: "flex",
    alignItems: "center",
    color: "white",
    fontSize: "1rem",
    gap: "3px",
    background: "none !important",
  },

  trash: {
    border: "none",
    display: "flex",
    alignItems: "center",
    color: "red",
    fontSize: "1.10rem",
    gap: "3px",
    cursor: "pointer",
  },

  textContainer: {
    padding: "1rem 0.75rem",
    maxHeight: "225px",
    overflowY: "scroll",
    paddingBottom: "0.5rem",
  },
  message: (isCompleted) => {
    return {
      border: "none",
      padding: "0.25rem 1.15rem",
      fontSize: "0.9rem",
      fontWeight: 500,
      outline: "none",
      wordBreak: "break-word",
      width: "100%",
      resize: "none",
      wordBreak: "break-word",
      overflowY: "scroll",
      fontFamily: "Poppins, sans-serif",
      letterSpacing: "1px",
      background: isCompleted ? "lightgreen" : "transparent",
    };
  },
  icon: (iconType) => {
    return {
      border: "none",
      display: "flex",
      alignItems: "center",
      color: iconType === "edit" ? "blue" : "green",
      fontSize: "1.10rem",
      gap: "3px",
      background: "none !important",
      cursor: "pointer",
    };
  },
};

const TaskItem = ({ task }) => {
  const [isTaskEditable, SetIsTaskEditable] = useState(false);
  const [taskmsg, settaskmsg] = useState(task.task);
  const [tasktitle, settasktitle] = useState(task.title);
  const { updateTask, deleteTask, toggleComplete,toggleImportant } = useTask();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const editTask = () => {
    updateTask(task.id, { ...task, task: taskmsg });
    SetIsTaskEditable(false);
  };

  const editTitle = () => {
    updateTask(task.id, { ...task, title: tasktitle });
    SetIsTaskEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(task.id);
    setIsCompleted(task.isCompleted);
  };

  const toggleIsImportant =()=>{
    toggleImportant(task.id);
    setIsImportant(task.isImportant);
  
  }
  return (
    <div
      style={{
        ...styles.taskbar,
        backgroundColor: task.completed ? "lightgreen" : "#FCFCFC",
      }}
      className="hide-scrollbar"
    >
      <div style={styles.mainContainer}>
        <div style={styles.titleContainer}>
          <input
            type="checkbox"
            style={styles.checkbox}
            checked={task.completed}
            onChange={toggleCompleted}
          />
          <input
            type="text"
            value={tasktitle}
            style={styles.title(isCompleted)}
            onChange={(e) => settasktitle(e.target.value)}
            readOnly={!isTaskEditable}
          />
        </div>

        <div style={styles.buttons}>
          
          <button
            style={styles.button}
            onClick={() => {
              if (task.completed) return;
              if (isTaskEditable) {
                editTask();
                editTitle();
              } else SetIsTaskEditable((prev) => !prev);
            }}
            disabled={task.completed}
          >
            {isTaskEditable ? (
              <FontAwesomeIcon icon={faCheck} style={styles.icon("check")} />
            ) : (
              <FontAwesomeIcon icon={faEdit} style={styles.icon("edit")} />
            )}
          </button>
          <button style={styles.trash} onClick={() => deleteTask(task.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <div style={styles.textContainer} className="hide-scrollbar">
        <textarea
          style={styles.message(isCompleted)}
          value={taskmsg}
          onChange={(e) => settaskmsg(e.target.value)}
          readOnly={!isTaskEditable}
          rows={10}
          className="hide-scrollbar"
        ></textarea>
      </div>
    </div>
  );
};

export default TaskItem;
