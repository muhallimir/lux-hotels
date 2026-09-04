import React from "react";
import styled from "styled-components";
import { useCurrency } from "../contexts/CurrencyContext";

const Wrap = styled.div`
  position: sticky;
  top: 64px;
  background: ${({ palette }) => palette.surface};
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid ${({ palette }) => palette.border};
  z-index: 50;
`;

const Select = styled.select`
  background: ${({ palette }) => palette.background};
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;

const CurrencyBar = ({ palette }) => {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <Wrap palette={palette} role="region" aria-label="Currency selector">
      <label htmlFor="currency-select" style={{ fontSize: 12, color: palette.textMuted }}>
        Currency
      </label>
      <Select
        id="currency-select"
        palette={palette}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        data-testid="currency-select"
      >
        {Object.values(currencies).map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol} {c.code} — {c.label}
          </option>
        ))}
      </Select>
    </Wrap>
  );
};

export default CurrencyBar;
