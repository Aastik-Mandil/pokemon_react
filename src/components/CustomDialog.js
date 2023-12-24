import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { MdClose } from "react-icons/md";

function CustomDialog({
  title,
  children,
  open,
  onClose,
  scroll = "paper",
  dialogActions,
  ...others
}) {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } =
        descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason === "backdropClick") {
          return;
        }
        onClose();
      }}
      scroll={scroll}
      aria-labelledby="action-dialog"
      aria-describedby="action-dialog-description"
      {...others}
    >
      <DialogTitle
        id="action-dialog"
        className="border-b-[1px] border-gray !p-4"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="body1"
            className="font-bold capitalize"
            noWrap
            color="text.primary"
          >
            {title}
          </Typography>

          {onClose && (
            <IconButton
              onClick={() => {
                onClose();
              }}
            >
              <MdClose />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent className="h-[100%] max-h-[70vh] welScroll">
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {children}
        </DialogContentText>
      </DialogContent>

      {dialogActions && (
        <DialogActions
          style={{ paddingRight: 25, padding: 16 }}
        >
          {dialogActions}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CustomDialog;
