import InventoryItem from "./InventoryItem";

const generateRandomId = () =>
  Math.floor(Math.random() * 10000000000000)
    .toString()
    .padStart(13, "0");

export const InventoryItems: InventoryItem[] = [
  {
    id: "1234567890123",
    name: "Apple iPhone 13",
    description: "Latest model of Apple iPhone",
    quantity: 50,
  },
  {
    id: "9876543210987",
    name: "Samsung Galaxy S21",
    description: "Flagship Samsung smartphone",
    quantity: 30,
  },
  {
    id: "4567890123456",
    name: "Sony WH-1000XM4",
    description: "Noise-cancelling wireless headphones",
    quantity: 20,
  },
  {
    id: "6543210987654",
    name: "Dell XPS 13",
    description: "High-performance laptop from Dell",
    quantity: 15,
  },
  {
    id: "7890123456789",
    name: "Apple Watch Series 7",
    description: "Latest Apple smartwatch",
    quantity: 25,
  },
  {
    id: generateRandomId(),
    name: "Google Pixel 6",
    description: "Latest Google smartphone",
    quantity: 40,
  },
  {
    id: generateRandomId(),
    name: "Microsoft Surface Pro 7",
    description: "2-in-1 detachable laptop",
    quantity: 10,
  },
  {
    id: generateRandomId(),
    name: "Bose QuietComfort 35 II",
    description: "Wireless Bluetooth headphones",
    quantity: 35,
  },
  {
    id: generateRandomId(),
    name: "Amazon Echo Dot",
    description: "Smart speaker with Alexa",
    quantity: 60,
  },
  {
    id: generateRandomId(),
    name: "Nintendo Switch",
    description: "Popular gaming console",
    quantity: 25,
  },
  {
    id: generateRandomId(),
    name: "Fitbit Charge 5",
    description: "Advanced fitness tracker",
    quantity: 45,
  },
  {
    id: generateRandomId(),
    name: "Canon EOS R5",
    description: "Full-frame mirrorless camera",
    quantity: 5,
  },
  {
    id: generateRandomId(),
    name: "GoPro HERO9",
    description: "Waterproof action camera",
    quantity: 20,
  },
  {
    id: generateRandomId(),
    name: "JBL Flip 5",
    description: "Portable waterproof speaker",
    quantity: 50,
  },
  {
    id: generateRandomId(),
    name: "Roku Streaming Stick+",
    description: "HD/4K/HDR streaming device",
    quantity: 30,
  },
];
