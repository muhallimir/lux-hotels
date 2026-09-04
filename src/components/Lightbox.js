import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 9990;
`;

const Frame = styled.div`
  background: ${({ palette }) => palette.background};
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 12px;
  max-width: 960px;
  width: 92vw;
  max-height: 86vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ palette }) => palette.border};
  margin-bottom: 12px;
`;

const Close = styled.button`
  background: transparent;
  border: none;
  color: ${({ palette }) => palette.text};
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
`;

const Strip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 12px;
`;

const Thumb = styled.img`
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid ${({ palette, active }) => (active ? palette.accent : "transparent")};
  flex-shrink: 0;
`;

const Main = styled.img`
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  margin: auto;
  border-radius: 6px;
`;

const Lightbox = ({ open, onClose, images, alt = "" }) => {
  const { palette } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(images.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images, onClose]);

  if (!open || !images || images.length === 0) return null;

  return (
    <Modal open={open} role="dialog" aria-label={`Image gallery for ${alt}`}>
      <Frame palette={palette}>
        <Header palette={palette}>
          <strong>{alt || "Gallery"}</strong>
          <Close palette={palette} onClick={onClose} aria-label="Close gallery">×</Close>
        </Header>
        <Main src={images[index]} alt={`${alt} ${index + 1}`} />
        <Strip>
          {images.map((src, i) => (
            <Thumb
              key={i}
              src={src}
              palette={palette}
              active={i === index}
              onClick={() => setIndex(i)}
              alt={`Thumbnail ${i + 1}`}
            />
          ))}
        </Strip>
      </Frame>
    </Modal>
  );
};

export default Lightbox;
