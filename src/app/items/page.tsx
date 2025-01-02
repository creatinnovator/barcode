"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "../globalDialog.css";
import InventoryItemModel from "@/models/InventoryItem";
import InventoryItem from "@/components/InventoryItem";
import { InventoryItems } from "@/models/sample";
import ScannerDialog from "@/components/ScannerDialog";

const items = InventoryItems;

export default function ItemsPage() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);
  const [newItem, setNewItem] = useState<InventoryItemModel>(
    {} as InventoryItemModel
  );

  const [quantityError, setQuantityError] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      newItem.id &&
      newItem.name &&
      newItem.description &&
      newItem.quantity &&
      !quantityError
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [
    newItem.id,
    newItem.name,
    newItem.description,
    newItem.quantity,
    quantityError,
  ]);

  const handleScannerOpen = useCallback(() => setScannerOpen(true), []);
  const handleScannerClose = useCallback(() => setScannerOpen(false), []);

  const handleManualEntryOpen = useCallback(() => {
    setNewItem({ id: "", name: "", description: "", quantity: 1 });
    setScannerOpen(false);
    setManualEntryOpen(true);
  }, []);
  const handleManualEntryClose = useCallback(
    () => setManualEntryOpen(false),
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "quantity") {
        if (parseInt(value, 10) < 1) {
          setQuantityError(true);
        } else {
          setQuantityError(false);
        }
      }
      setNewItem({ ...newItem, [name]: value });
    },
    [newItem]
  );

  const handleSave = useCallback(() => {
    if (!valid) {
      return;
    }

    setManualEntryOpen(false);
    items.push(newItem);
  }, [newItem, valid]);

  const handleScannerSuccess = useCallback((result: string) => {
    setNewItem({ id: result, name: "", description: "", quantity: 1 });

    setScannerOpen(false);
    setManualEntryOpen(true);
  }, []);

  return (
    <div className="container">
      <Button
        variant="contained"
        color="primary"
        onClick={handleScannerOpen}
        className="add-button"
      >
        Add
      </Button>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <InventoryItem item={item} />
          </li>
        ))}
      </ul>

      {scannerOpen && (
        <ScannerDialog
          onClose={handleScannerClose}
          onSuccess={handleScannerSuccess}
          onManualEntryOpen={handleManualEntryOpen}
        />
      )}

      <Dialog open={manualEntryOpen} onClose={handleManualEntryClose}>
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product ID"
            name="id"
            value={newItem.id}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
          <TextField
            label="Name"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
          <TextField
            error={quantityError}
            label="Quantity"
            name="quantity"
            type="number"
            value={newItem.quantity}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleManualEntryClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!valid}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <style jsx>{`
        .container {
          padding: 20px;
        }
        .add-button {
          width: 100%;
          margin: 10px 0;
        }
        .item-list {
          list-style: none;
          padding: 0;
        }
        .item {
          border: 1px solid #ccc;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
