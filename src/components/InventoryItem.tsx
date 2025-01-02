import InventoryItemModel from "@/models/InventoryItem";
import { Typography } from "@mui/material";

const InventoryItem = ({ item }: { item: InventoryItemModel }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div>
        <Typography variant="caption" className="product-id">
          {item.id}
        </Typography>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="body1">{item.description}</Typography>
      </div>
      <div>
        <div>
          <Typography variant="caption" className="label">
            Quantity
          </Typography>
        </div>
        <div>
          <Typography variant="h5">{item.quantity}</Typography>
        </div>
      </div>
    </div>
  );
};
export default InventoryItem;
