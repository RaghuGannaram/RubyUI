import React from "react";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import { IconButton } from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import { Box, useTheme } from "@mui/system";


export default function Modal({
  children,
  open,
  handleClose,
  handleSave,
  saveText,
  textLength,
}) {
  const theme = useTheme();

  const handleClick = () => {
    handleSave();
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
          sx={{ borderRadius: theme.shape.borderRadius, fontSize: "12px", color:"primary"}}
          disabled={textLength === 0}
          variant="contained"
          size="small"
          onClick={handleClick}
        >
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
