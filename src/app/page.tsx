import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Link
        href="/items"
        style={{
          margin: "10px",
          padding: "20px",
          fontSize: "20px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "5px",
          textAlign: "center",
          width: "200px",
        }}
      >
        Items
      </Link>
      <Link
        href="/items/checkout"
        style={{
          margin: "10px",
          padding: "20px",
          fontSize: "20px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "5px",
          textAlign: "center",
          width: "200px",
        }}
      >
        Checkout
      </Link>
    </div>
  );
}
