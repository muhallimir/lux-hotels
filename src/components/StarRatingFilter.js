import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  gap: 4px;
  margin: 16px 0;
`;

const Btn = styled.button`
  background: ${({ active, palette }) => (active ? palette.accent : palette.surface)};
  color: ${({ active, palette }) => (active ? palette.accentDark : palette.text)};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const StarRatingFilter = ({ palette, value, onChange }) => {
  const stars = [5, 4, 3, 2, 1, 0];
  return (
    <Wrap>
      {stars.map((n) => (
        <Btn
          key={n}
          type="button"
          palette={palette}
          active={value === n}
          onClick={() => onChange(n)}
          data-testid={`star-filter-${n}`}
        >
          {n === 0 ? "Any" : `${n}+ ★`}
        </Btn>
      ))}
    </Wrap>
  );
};

export default StarRatingFilter;
