import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
`;

const Map = styled.div`
  width: 100%;
  height: 240px;
  background: linear-gradient(135deg, #c2e0f7, #d4e9c2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pin = styled.div`
  width: 32px;
  height: 32px;
  background: #dc2626;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
  }
`;

const Footer = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const MapView = ({ palette, address, lat, lng, name }) => {
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${(lng - 0.01).toFixed(4)}%2C${(lat - 0.005).toFixed(4)}%2C${(lng + 0.01).toFixed(4)}%2C${(lat + 0.005).toFixed(4)}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <Wrap palette={palette}>
      <Map>
        <iframe
          title={`Map of ${name}`}
          src={osmEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </Map>
      <Footer palette={palette}>
        <div>
          <strong>{name}</strong>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{address}</div>
        </div>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.accent, textDecoration: "underline", fontSize: 13 }}
        >
          Open in maps
        </a>
      </Footer>
    </Wrap>
  );
};

export default MapView;
