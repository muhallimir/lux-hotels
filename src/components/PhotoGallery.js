import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  margin: 16px 0;
`;

const Tile = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const PhotoGallery = ({ palette, images, onOpen }) => {
  if (!images || images.length === 0) return null;
  return (
    <Wrap>
      {images.map((src, i) => (
        <Tile
          key={i}
          palette={palette}
          onClick={() => onOpen && onOpen(i)}
          aria-label={`Open image ${i + 1}`}
        >
          <img src={src} alt={`Hotel photo ${i + 1}`} loading="lazy" />
        </Tile>
      ))}
    </Wrap>
  );
};

export default PhotoGallery;
