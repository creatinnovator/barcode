"use client";

import Scanner from "@/components/Scanner";
import InventoryItem from "@/models/InventoryItem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface DispatchItem extends InventoryItem {
  quantityToDispatch: number;
}

const items: InventoryItem[] = [
  { id: "1", name: "Item 1", description: "Description 1", quantity: 10 },
  { id: "2", name: "Item 2", description: "Description 2", quantity: 5 },
  {
    id: "0036000291452",
    name: "0036000291452",
    description: "0036000291452",
    quantity: 5,
  },
];

const removeItems = (id: string, quantity: number) => {
  items.forEach((item) => {
    if (item.id === id) {
      item.quantity -= quantity;
    }
  });
};

const Page = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);
  const [dispatchItem, setDispatchItem] = useState<DispatchItem>(
    {} as DispatchItem
  );
  const [quantityError, setQuantityError] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      dispatchItem.id &&
      dispatchItem.quantityToDispatch > 0 &&
      !quantityError
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [dispatchItem.id, dispatchItem.quantityToDispatch, quantityError]);

  const handleScannerOpen = useCallback(() => setScannerOpen(true), []);
  const handleScannerClose = useCallback(() => setScannerOpen(false), []);

  const handleManualEntryOpen = useCallback(() => {
    setDispatchItem({
      id: "",
      name: "",
      description: "",
      quantity: 0,
      quantityToDispatch: 1,
    });
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

      let item = dispatchItem;

      if (name === "id") {
        const inventory = items.find((item) => item.id === value);
        if (inventory) {
          item = { ...inventory, quantityToDispatch: 1 };
        }
      }
      if (name === "quantityToDispatch") {
        if (parseInt(value, 10) < 1) {
          setQuantityError(true);
        } else {
          setQuantityError(false);
        }
      }
      setDispatchItem({ ...item, [name]: value });
    },
    [dispatchItem]
  );

  const handleSave = useCallback(() => {
    if (!valid) {
      return;
    }

    setManualEntryOpen(false);
    removeItems(dispatchItem.id, dispatchItem.quantityToDispatch);
  }, [dispatchItem, valid]);

  const handleScannerSuccess = useCallback((result: string) => {
    const item = items.find((item) => item.id === result);
    if (!item) {
      alert("Item not found");
      return;
    }
    setDispatchItem({ ...item, quantityToDispatch: 1 });

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
        Dispatch
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
        <DialogTitle>Item to dispatch </DialogTitle>
        <DialogContent>
          <TextField
            label="Product ID"
            name="id"
            value={dispatchItem.id}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
          <TextField
            disabled
            label="Name"
            name="name"
            value={dispatchItem.name}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
          <TextField
            disabled
            label="Description"
            name="description"
            value={dispatchItem.description}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
          <TextField
            disabled
            error={quantityError}
            label="Quantity in stock"
            name="quantity"
            type="number"
            value={dispatchItem.quantity}
            onChange={handleInputChange}
            fullWidth
            sx={{
              margin: "10px 0",
            }}
          />
          <TextField
            error={quantityError}
            label="Quantity to dispatch"
            name="quantityToDispatch"
            type="number"
            value={dispatchItem.quantityToDispatch}
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
            Dispatch
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
};
export default Page;
