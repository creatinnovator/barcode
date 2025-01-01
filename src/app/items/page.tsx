"use client";

import { useEffect, useState } from "react";
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

const items = [
  { id: "1", name: "Item 1", description: "Description 1", quantity: 10 },
  { id: "2", name: "Item 2", description: "Description 2", quantity: 5 },
  // Add more items here
];

export default function ItemsPage() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    description: "",
    quantity: 1,
  });

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

  const handleScannerOpen = () => setScannerOpen(true);
  const handleScannerClose = () => setScannerOpen(false);

  const handleManualEntryOpen = () => {
    setScannerOpen(false);
    setManualEntryOpen(true);
  };
  const handleManualEntryClose = () => setManualEntryOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      if (value < 1) {
        setQuantityError(true);
      } else {
        setQuantityError(false);
      }
    }
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSave = () => {
    if (!valid) {
      return;
    }

    items.push(newItem);
    setManualEntryOpen(false);
  };

  const handleScannerSuccess = (result: string) => {
    // Handle scanner result here
    newItem.id = result;

    setScannerOpen(false);
    setManualEntryOpen(true);
  };

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

      <Dialog open={scannerOpen} onClose={handleScannerClose}>
        <DialogTitle>Scanner</DialogTitle>
        <DialogContent>
          <Scanner onSuccess={handleScannerSuccess} />
          <Button onClick={handleManualEntryOpen}>Enter Manually</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScannerClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={manualEntryOpen} onClose={handleManualEntryClose}>
        <DialogTitle>Register New Product</DialogTitle>
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
