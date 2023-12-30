import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../../context";
import AddTaskDialog from "../addTaskDialog";
import DeletionConfirmation from "../deleteDialog";

const TaskCard = ({ key, taskInfo }) => {
  const { toggleComplete, toggleImportant, updateTask, deleteTask } = useTask();
  const [isTaskEditable, setIsTaskEditable] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeletionAllowed, setIsDeletionAllowed] = useState(false);

  useEffect(() => {
    if (isDeletionAllowed) {
      deleteTask(taskInfo?.id);
    }
  }, [isDeletionAllowed]);

  return (
    <Stack
      sx={{
        display: "flex",
        background: "#5b21b6",
        border: "none",
        borderRadius: "0.5rem",
        rowGap: "0.5rem",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
      key={key}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          rowGap: "1rem",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            background: "",
            rowGap: "0.5rem",
            overflowY: "auto",
            borderBottom: "1.5px dashed #FFF",
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#FFF" }}>
            {taskInfo.title}
          </Typography>
          <Box
            className="hide-scrollbar"
            sx={{
              display: "flex",
              overflowY: "scroll",
              background: "",
              height: "10rem",
              maxHeight: "12rem",
            }}
          >
            <Typography
              sx={{ fontSize: "0.8rem", fontWeight: 500, color: "#F9F9F9" }}
            >
              {taskInfo.task}
            </Typography>
          </Box>
        </Stack>
        <Typography sx={{ color: "#FFF", fontSize: "0.9rem" }}>
          {new Date().getDate() +
            "/" +
            (new Date().getMonth() +1)+
            "/" +
            new Date().getFullYear()}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
        }}
      >
        <Typography
          sx={() => {
            return {
              color: "#FFF",
              background: taskInfo?.completed ? "green" : "orange",
              fontSize: "0.9rem",
              border: "none",
              borderRadius: "1rem",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              textTransform: "capitalize",
              cursor: "pointer",
            };
          }}
          onClick={() => {
            toggleComplete(taskInfo?.id);
          }}
        >
          {taskInfo.completed ? "Completed" : "Pending"}
        </Typography>
        <Box sx={{ display: "flex", columnGap: "0.75rem" }}>
          <FontAwesomeIcon
            icon={faStar}
            style={{
              color: taskInfo.important ? "orange" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => {
              toggleImportant(taskInfo?.id);
            }}
          />
          <FontAwesomeIcon
            icon={faEdit}
            style={{
              color: "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setIsTaskEditable(true)}
          />

          <FontAwesomeIcon
            icon={faTrash}
            style={{
              color: "#FFF",
              cursor: "pointer",
            }}
            onClick={() => {
              setDeleteDialogOpen(true);
            }}
          />
        </Box>
        {isTaskEditable && (
          <AddTaskDialog
            formType="edit"
            open={isTaskEditable}
            setOpen={setIsTaskEditable}
            taskInfo={taskInfo}
          />
        )}
        {deleteDialogOpen && (
          <DeletionConfirmation
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            setIsDeletionAllowed={setIsDeletionAllowed}
          />
        )}
      </Box>
    </Stack>
  );
};

export default TaskCard;
