import React, { useEffect } from "react";
import styled from "styled-components";

const Banner = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 16px 0;
`;

const InstallButton = styled.button`
  background: white;
  color: #6366f1;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const PWAInstallPrompt = () => {
  const [event, setEvent] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(() => {
    try { return window.localStorage.getItem("lux.pwaDismissed") === "true"; }
    catch (e) { return false; }
  });

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      if (dismissed) return;
      setEvent(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, [dismissed]);

  const install = async () => {
    if (!event) return;
    event.prompt();
    await event.userChoice;
    setEvent(null);
    setVisible(false);
  };

  const dismiss = () => {
    try { window.localStorage.setItem("lux.pwaDismissed", "true"); } catch (e) {}
    setVisible(false);
  };

  return (
    <Banner visible={visible} role="region" aria-label="Install as app">
      <div>
        <strong>Install Lux Hotels</strong>
        <div style={{ fontSize: 12, opacity: 0.85 }}>Get one-tap access on your home screen.</div>
      </div>
      <div>
        <InstallButton type="button" onClick={install} data-testid="pwa-install">Install</InstallButton>
        <CloseButton type="button" onClick={dismiss} aria-label="Dismiss install prompt">×</CloseButton>
      </div>
    </Banner>
  );
};

export default PWAInstallPrompt;
