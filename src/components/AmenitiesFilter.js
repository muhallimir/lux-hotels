import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

const Group = styled.div`
  margin-bottom: 12px;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #111827;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  color: #111827;
  cursor: pointer;
  user-select: none;
`;

const AMENITY_OPTIONS = [
  { key: "wifi", label: "Free Wi-Fi" },
  { key: "breakfast", label: "Breakfast included" },
  { key: "parking", label: "Free parking" },
  { key: "pool", label: "Swimming pool" },
  { key: "gym", label: "Fitness center" },
  { key: "spa", label: "Spa" },
  { key: "pets", label: "Pet friendly" },
  { key: "ac", label: "Air conditioning" },
  { key: "kitchen", label: "Kitchenette" },
  { key: "balcony", label: "Balcony" },
];

const AmenitiesFilter = ({ value = [], onChange }) => {
  const toggle = (key) => {
    if (value.includes(key)) onChange(value.filter((k) => k !== key));
    else onChange([...value, key]);
  };

  return (
    <Wrap>
      <Group>
        <Title>Amenities</Title>
        {AMENITY_OPTIONS.map((opt) => (
          <Option key={opt.key}>
            <input
              type="checkbox"
              checked={value.includes(opt.key)}
              onChange={() => toggle(opt.key)}
              data-testid={`amenity-${opt.key}`}
            />
            <span>{opt.label}</span>
          </Option>
        ))}
      </Group>
    </Wrap>
  );
};

export { AMENITY_OPTIONS };
export default AmenitiesFilter;
