import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography, Button, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../../context";

const AddTaskDialog = ({ formType, open, setOpen, taskInfo }) => {
  const { addTask, updateTask } = useTask();
  const [task, setTask] = React.useState(
    formType === "edit" ? taskInfo?.task : ""
  );
  const [title, setTitle] = React.useState(
    formType === "edit" ? taskInfo?.title : ""
  );

  const handleEditTask = (e) => {
    e?.preventDefault();
    if (!(task && title)) return;
    updateTask(taskInfo.id, { ...taskInfo, title, task });
    handleClose();
  };

  const handleAddNewTask = (e) => {
    e?.preventDefault();
    if (!(task && title)) return;
    addTask({ task, title, completed: false, important: false });
    setTask("");
    setTitle("");
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            background: "#0f172a",
            color: "#FFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add Task
          <FontAwesomeIcon
            icon={faClose}
            style={{ cursor: "pointer" }}
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          sx={{ background: "#0f172a" }}
        >
          <Typography
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ color: "#FFF", fontFamily: "Poppins, sans-serif !important" }}
          >
            Want to add a new task? Enter below details to add a new task
          </Typography>
          <form
            style={{
              //   background: "pink"
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "1rem",
              padding: "1rem 0",
              color: "#FFF",
            }}
            onSubmit={formType === "add" ? handleAddNewTask : handleEditTask}
          >
            <Stack sx={{ display: "flex", rowGap: "0.5rem" }}>
              <label
                htmlFor="title"
                style={{
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Title
              </label>
              <TextField
                type="text"
                placeholder="Enter your to-do title..."
                required
                minRows={1}
                maxRows={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "0.9rem",
                    background: "#141e33",
                    color: "#FFF",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "1.5px solid #5b21b6",
                    },
                    "&.MuiInputBase-root.Mui-focused fieldset": {
                      border: "1.5px solid #5b21b6",
                    },
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "1rem",
                    "&.MuiFormLabel-root.Mui-focused": {
                      color: "#ef5d36",
                    },
                  },
                }}
              />
            </Stack>
            <Stack sx={{ display: "flex", rowGap: "0.5rem" }}>
              <label htmlFor="description">Description</label>
              <TextField
                placeholder="Enter your description..."
                minRows={8}
                maxRows={10}
                className="hide-scrollbar"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "0.9rem",
                    background: "#141e33",
                    height: "8rem",
                    maxHeight: "15rem",
                    color: "#FFF",
                    alignItems: "start",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "1.5px solid #5b21b6",
                    },
                    "&.MuiInputBase-root.Mui-focused fieldset": {
                      border: "1.5px solid #5b21b6",
                    },
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "1rem",
                    "&.MuiFormLabel-root.Mui-focused": {
                      color: "#ef5d36",
                    },
                  },
                }}
                id="description"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              ></TextField>
            </Stack>
            <Button
              type="submit"
              sx={{
                color: "#FFF",
                display: "flex",
                columnGap: "0.5rem",
                alignItems: "center",
                border: "none",
                background: "#5b21b6",
                padding: "0.6rem 1rem",
                borderRadius: "0.5rem",
                "&:hover": {
                  background: "#5b21b6",
                  color: "#FFF",
                },
              }}
            >
              {formType === "add" ? "Add task" : "Edit task"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTaskDialog;
