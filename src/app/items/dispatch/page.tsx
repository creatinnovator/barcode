"use client";

import InventoryItem from "@/components/InventoryItem";
import ScannerDialog from "@/components/ScannerDialog";
import InventoryItemModel from "@/models/InventoryItem";
import { InventoryItems } from "@/models/sample";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface DispatchItem extends InventoryItemModel {
  quantityToDispatch: number;
}

const items: InventoryItemModel[] = [
  {
    id: "0036000291452",
    name: "Product XXX",
    description: "Sample product with barcode",
    quantity: 5,
  },
].concat(InventoryItems);

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
            <InventoryItem item={item} />
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
          <ScannerDialog
            onClose={handleScannerClose}
            onSuccess={handleScannerSuccess}
            onManualEntryOpen={handleManualEntryOpen}
          />
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
