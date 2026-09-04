import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 50;
`;

const Bell = styled.button`
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  font-size: 22px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Panel = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
  width: 280px;
  max-height: 320px;
  overflow-y: auto;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const Item = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${({ palette }) => palette.border};
  &:last-child { border-bottom: none; }
`;

const NotificationsCenter = ({ palette, items = [] }) => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(items.length);

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const request = (item) => {
    setUnread((u) => Math.max(0, u - 1));
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(item.title || "Lux Hotels", {
          body: item.body,
          icon: "/logo192.png",
        });
      } catch (e) {
        /* ignore */
      }
    }
  };

  return (
    <Overlay>
      <Bell palette={palette} onClick={() => setOpen((o) => !o)} aria-label={`Notifications (${unread} unread)`}>
        🔔
        {unread > 0 ? (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "#dc2626",
              color: "white",
              borderRadius: "50%",
              fontSize: 11,
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unread}
          </span>
        ) : null}
      </Bell>
      <Panel palette={palette} open={open} role="region" aria-label="Notifications">
        {items.length === 0 ? (
          <div style={{ opacity: 0.7, fontSize: 13 }}>No notifications</div>
        ) : (
          items.map((item, i) => (
            <Item key={i} palette={palette} onClick={() => request(item)}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{item.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{item.body}</div>
              <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4 }}>{item.at}</div>
            </Item>
          ))
        )}
      </Panel>
    </Overlay>
  );
};

export default NotificationsCenter;
