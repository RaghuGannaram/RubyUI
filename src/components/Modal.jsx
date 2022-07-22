import React from "react";
import {
  useTheme,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function Modal({
  children,
  open,
  handleClose,
  button,
  text,
  handleSubmit,
}) {
  const theme = useTheme();
  const handleClick = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box
          sx={{
            textAlign: "right",
            borderBottom: `1px solid ${theme.palette.background.dark}`,
          }}
        >
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: theme.palette.primary.main }} />
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
            color: theme.palette.secondary.main,
            "&:disabled": {
              backgroundColor: theme.palette.primary.main,
            },
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
