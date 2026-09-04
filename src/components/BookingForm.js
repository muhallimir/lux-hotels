import React from "react";
import styled from "styled-components";
import { useCurrency } from "../contexts/CurrencyContext";

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: ${({ palette }) => palette.textMuted};
  flex: 1;
`;

const Input = styled.input`
  padding: 6px 10px;
  border: 1px solid ${({ palette }) => palette.border};
  background: ${({ palette }) => palette.background};
  color: ${({ palette }) => palette.text};
  border-radius: 4px;
  font-size: 14px;
  margin-top: 4px;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Round = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${({ palette }) => palette.border};
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.text};
  cursor: pointer;
  font-size: 16px;
  &:hover { background: ${({ palette }) => palette.border}; }
`;

const Summary = styled.div`
  margin-left: auto;
  font-size: 14px;
  color: ${({ palette }) => palette.text};
`;

const BookingForm = ({ palette, room, onSubmit }) => {
  const { convert } = useCurrency();
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState(2);

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
      : 0;
  const subtotal = nights * (room?.price || 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + tax;

  const submit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut || nights <= 0) return;
    onSubmit({ checkIn, checkOut, guests, nights, subtotal, tax, total });
  };

  return (
    <form onSubmit={submit} data-testid="booking-form">
      <Row palette={palette}>
        <Field palette={palette}>
          Check-in
          <Input
            type="date"
            palette={palette}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            data-testid="booking-checkin"
          />
        </Field>
        <Field palette={palette}>
          Check-out
          <Input
            type="date"
            palette={palette}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            data-testid="booking-checkout"
          />
        </Field>
        <Field palette={palette}>
          Guests
          <Counter>
            <Round type="button" palette={palette} onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Remove guest">-</Round>
            <span style={{ minWidth: 24, textAlign: "center" }}>{guests}</span>
            <Round type="button" palette={palette} onClick={() => setGuests((g) => Math.min(room?.capacity || 10, g + 1))} aria-label="Add guest">+</Round>
          </Counter>
        </Field>
        <Summary palette={palette}>
          {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"} = ${convert(total)}` : "Pick dates"}
        </Summary>
      </Row>
      <button
        type="submit"
        disabled={!checkIn || !checkOut || nights <= 0}
        style={{
          padding: "10px 24px",
          background: palette.accent,
          color: palette.accentDark,
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 700,
          opacity: !checkIn || !checkOut || nights <= 0 ? 0.5 : 1,
        }}
        data-testid="booking-submit"
      >
        Reserve now
      </button>
    </form>
  );
};

export default BookingForm;
