"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Scanner from "@/components/Scanner";
import "../globalDialog.css";
import InventoryItem from "@/models/InventoryItem";

const items: InventoryItem[] = [
  { id: "1", name: "Item 1", description: "Description 1", quantity: 10 },
  { id: "2", name: "Item 2", description: "Description 2", quantity: 5 },
];

export default function ItemsPage() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);
  const [newItem, setNewItem] = useState<InventoryItem>({} as InventoryItem);

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
    (e) => {
      const { name, value } = e.target;
      if (name === "quantity") {
        if (value < 1) {
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
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>
              <Typography variant="caption">Quantity</Typography>
              <span
                style={{
                  paddingLeft: "5px",
                }}
              >
                {item.quantity}
              </span>
            </p>
          </li>
        ))}
      </ul>
      <Button
        variant="contained"
        color="primary"
        onClick={handleScannerOpen}
        className="add-button"
      >
        Add
      </Button>

      {scannerOpen && (
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
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <Scanner
              opened={scannerOpen}
              onSuccess={(result) => {
                handleScannerSuccess(result);
              }}
              onError={(error) => {
                console.log(error);
              }}
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
          padding: 10px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
