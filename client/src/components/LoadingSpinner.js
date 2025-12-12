export default function LoadingSpinner({ size = "24px" }) {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        border: "3px solid rgba(255,255,255,0.3)",
        borderTop: "3px solid white",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        margin: "0 auto",
      }}
    ></div>
  );
}
