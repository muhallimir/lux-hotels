import React, { useState } from "react";
import styled from "styled-components";

const Wrap = styled.section`
  margin: 32px 0;
`;

const Item = styled.div`
  border-bottom: 1px solid ${({ palette }) => palette.border};
  padding: 12px 0;
`;

const Q = styled.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: ${({ palette }) => palette.text};
  font-size: 16px;
  font-weight: 600;
  padding: 8px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const A = styled.div`
  padding: 8px 0;
  color: ${({ palette }) => palette.textMuted};
  font-size: 14px;
  line-height: 1.5;
`;

const faqs = [
  { q: "What time is check-in and check-out?", a: "Check-in is from 3 PM and check-out is by 11 AM. Early check-in and late check-out can be requested at the front desk." },
  { q: "Do you allow pets?", a: "Some rooms are pet-friendly. Look for the 'Pets' badge on the room card or filter for pet-friendly rooms." },
  { q: "Is breakfast included?", a: "Breakfast is included with deluxe and suite rooms. For standard rooms, breakfast can be added at booking." },
  { q: "What is your cancellation policy?", a: "Free cancellation up to 48 hours before check-in. After that, one night's stay is charged." },
  { q: "Do you offer airport transfers?", a: "Yes, we offer airport transfers for a fee. Add it to your booking or contact the front desk." },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const palette = {
    background: "#ffffff",
    text: "#111827",
    textMuted: "#6b7280",
    border: "#e5e7eb",
  };

  return (
    <Wrap>
      <h3>Frequently asked questions</h3>
      {faqs.map((item, i) => (
        <Item key={i} palette={palette}>
          <Q palette={palette} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <span aria-hidden>{open === i ? "−" : "+"}</span>
          </Q>
          {open === i ? <A palette={palette}>{item.a}</A> : null}
        </Item>
      ))}
    </Wrap>
  );
};

export default FAQ;
