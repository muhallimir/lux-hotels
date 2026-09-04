import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 8px 0;
`;

const Btn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: ${({ palette }) => palette.border};
  }
`;

const shareTargets = [
  { name: "Twitter", href: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, label: "T" },
  { name: "Facebook", href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, label: "f" },
  { name: "LinkedIn", href: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, label: "in" },
  { name: "Email", href: (url, text) => `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`, label: "@" },
  { name: "WhatsApp", href: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, label: "W" },
];

const ShareButtons = ({ palette, url, title = "Lux Hotels" }) => {
  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  return (
    <Wrap>
      {shareTargets.map((t) => (
        <Btn
          key={t.name}
          palette={palette}
          href={t.href(fullUrl, title)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${t.name}`}
          data-testid={`share-${t.name.toLowerCase()}`}
        >
          {t.label}
        </Btn>
      ))}
    </Wrap>
  );
};

export default ShareButtons;
