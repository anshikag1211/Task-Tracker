import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, Button, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const DeletionConfirmation = ({ open, setOpen, setIsDeletionAllowed }) => {
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
          Delete Task
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
            Are you sure you want to delete this task? This action is
            irreversible!
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "2rem",
            }}
          >
            <Button
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
              onClick={() => {setIsDeletionAllowed(true)
              handleClose}}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeletionConfirmation;
