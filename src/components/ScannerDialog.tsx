import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Scanner from "./Scanner";

interface ScannerDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: string) => void;
  onError: (error: string) => void;
}

const ScannerDialog: React.FC<ScannerDialogProps> = ({
  open,
  onClose,
  onSuccess,
  onError,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Scan Barcode</DialogTitle>
      <DialogContent>
        <Scanner onSuccess={onSuccess} onError={onError} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScannerDialog;
