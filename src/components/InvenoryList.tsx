import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ScannerDialog from "./ScannerDialog";
import InventoryItem from "@/models/InventoryItem";

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    { code: "001", description: "Item 1", quantity: 10 },
    { code: "002", description: "Item 2", quantity: 5 },
  ]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScanSuccess = (data: string) => {
    // Handle the scanned data
    console.log("Scanned data:", data);
    setOpen(false);
  };

  const handleScanError = (error: string) => {
    // Handle the scan error
    console.error("Scan error:", error);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScannerDialog
        open={open}
        onClose={handleClose}
        onSuccess={handleScanSuccess}
        onError={handleScanError}
      />
    </div>
  );
};

export default InventoryList;
