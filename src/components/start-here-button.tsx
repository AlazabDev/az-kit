import { Link } from "@tanstack/react-router";

export function StartHereButton() {
  return (
    <Link
      to="/start-here"
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition-opacity hover:opacity-90"
      style={{
        background: "#ffb900",
        color: "#030957",
        fontFamily: "'Courier Prime', monospace",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        border: "1px solid rgba(3,9,87,0.18)",
      }}
    >
      <span style={{ opacity: 0.75 }}>//</span> Start Here
    </Link>
  );
}