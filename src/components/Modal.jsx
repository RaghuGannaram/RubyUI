import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close as CloseIcon } from "@mui/icons-material";

export default function Modal({
  children,
  open,
  handleClose,
  button,
  text,
  handleSubmit,
}) {
  const handleClick = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          sx={{
            borderRadius: "5px",
            padding: "2px 5px ",
            fontSize: "13px",
            color: "primary",
          }}
          disabled={text === 0}
          variant="contained"
          size="small"
          onClick={handleClick}
        >
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
