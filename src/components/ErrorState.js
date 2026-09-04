import React from "react";

const ErrorState = ({ title = "Something went wrong", message = "Please try again later.", onRetry }) => (
  <div
    role="alert"
    style={{
      padding: 32,
      textAlign: "center",
      border: "1px solid #fecaca",
      background: "#fef2f2",
      borderRadius: 8,
      margin: 24,
    }}
  >
    <h2 style={{ margin: 0, color: "#991b1b" }}>{title}</h2>
    <p style={{ margin: "8px 0 16px 0", color: "#7f1d1d" }}>{message}</p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "8px 18px",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    ) : null}
  </div>
);

export default ErrorState;
