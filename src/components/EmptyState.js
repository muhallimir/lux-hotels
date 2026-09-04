import React from "react";

const EmptyState = ({ icon = "📭", title = "Nothing here yet", message = "", actionLabel, onAction }) => (
  <div style={{ padding: 48, textAlign: "center", color: "#6b7280" }}>
    <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
    <h3 style={{ margin: "0 0 8px 0", color: "#111827" }}>{title}</h3>
    {message ? <p style={{ margin: "0 0 16px 0" }}>{message}</p> : null}
    {actionLabel ? (
      <button
        type="button"
        onClick={onAction}
        style={{
          background: "#af9a7d",
          color: "white",
          border: "none",
          padding: "8px 18px",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        {actionLabel}
      </button>
    ) : null}
  </div>
);

export default EmptyState;
