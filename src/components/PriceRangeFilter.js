import React from "react";
import styled, { useTheme } from "styled-components";

const Wrap = styled.div`
  background: ${(p) => p.theme.surface};
  border: 1px solid ${(p) => p.theme.border};
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Range = styled.input`
  width: 100%;
  margin: 8px 0;
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  opacity: 0.7;
`;

const PriceRangeFilter = ({ min = 0, max = 1000, value, onChange }) => {
  const v = value || { min, max };
  return (
    <Wrap>
      <Title>
        <span>Price per night</span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>
          ${v.min} – ${v.max}
        </span>
      </Title>
      <Range
        type="range"
        min={min}
        max={max}
        value={v.min}
        onChange={(e) => onChange({ ...v, min: Math.min(Number(e.target.value), v.max - 10) })}
        data-testid="price-min"
      />
      <Range
        type="range"
        min={max}
        value={v.max}
        onChange={(e) => onChange({ ...v, max: Math.max(Number(e.target.value), v.min + 10) })}
        data-testid="price-max"
      />
      <Labels>
        <span>${min}</span>
        <span>${max}+</span>
      </Labels>
    </Wrap>
  );
};

export default PriceRangeFilter;
