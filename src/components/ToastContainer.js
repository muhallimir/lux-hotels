import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ToastContainer = ({ toasts, dismiss }) => {
  const { palette } = useTheme();
  if (!toasts || toasts.length === 0) return null;

  const typeColor = {
    info: palette.accent,
    success: "#10b981",
    error: "#dc2626",
    warn: "#f59e0b",
  };

  return (
    <div
      role="region"
      aria-label="Notifications"
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 9999,
        maxWidth: 360,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          style={{
            background: palette.surface,
            color: palette.text,
            borderLeft: `4px solid ${typeColor[t.type] || palette.accent}`,
            padding: "12px 16px",
            borderRadius: 6,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 14,
          }}
        >
          <span>{t.message}</span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismiss(t.id)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              marginLeft: 12,
              color: palette.textMuted,
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
