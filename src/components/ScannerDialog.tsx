import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import Scanner from "./Scanner";

interface ScannerDialogProps {
  onManualEntryOpen: () => void;
  onClose: () => void;
  onSuccess: (data: string) => void;
  onError?: (error: string) => void;
}

const ScannerDialog: React.FC<ScannerDialogProps> = ({
  onClose,
  onSuccess,
  onError,
  onManualEntryOpen,
}) => {
  const [scannerOpen, setScannerOpen] = useState(true);

  const handleScannerSuccess = useCallback(
    (result: string) => {
      onSuccess(result);
      setScannerOpen(false);
    },
    [onSuccess]
  );

  const handleScannerError = useCallback(
    (error: string) => {
      console.error(error);
      if (!onError) {
        return;
      }
      onError(error);
    },
    [onError]
  );

  const handleManualEntryOpen = useCallback(() => {
    setScannerOpen(false);
    onManualEntryOpen();
  }, [onManualEntryOpen]);

  const handleScannerClose = useCallback(() => {
    setScannerOpen(false);
    onClose();
  }, [onClose]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        padding: "5px",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        <Scanner
          opened={scannerOpen}
          onSuccess={handleScannerSuccess}
          onError={handleScannerError}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Button onClick={handleManualEntryOpen} variant="contained">
            Manual input
          </Button>
          <Button onClick={handleScannerClose} variant="outlined">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScannerDialog;
