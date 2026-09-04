import React from "react";
import styled from "styled-components";
import { useCurrency } from "../contexts/CurrencyContext";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;

  th, td {
    border: 1px solid ${({ palette }) => palette.border};
    padding: 10px 12px;
    text-align: left;
  }

  thead th {
    background: ${({ palette }) => palette.surface};
    color: ${({ palette }) => palette.text};
  }

  tbody tr:nth-child(even) td {
    background: ${({ palette }) => palette.surface};
  }
`;

const CompareTable = ({ palette, items }) => {
  const { convert } = useCurrency();
  if (!items || items.length === 0) return null;

  const rows = [
    { label: "Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Price / night", key: "price", render: (r) => convert(r.price) },
    { label: "Capacity", key: "capacity" },
    { label: "Size", key: "size" },
    { label: "Pets", key: "pets", render: (r) => (r.pets ? "Yes" : "No") },
    { label: "Breakfast", key: "breakfast", render: (r) => (r.breakfast ? "Included" : "Not included") },
  ];

  return (
    <Table palette={palette} data-testid="compare-table">
      <thead>
        <tr>
          <th>Attribute</th>
          {items.map((r) => (
            <th key={r.slug}>{r.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.key}>
            <td><strong>{row.label}</strong></td>
            {items.map((r) => (
              <td key={r.slug}>{row.render ? row.render(r) : r[row.key] || "-"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CompareTable;
