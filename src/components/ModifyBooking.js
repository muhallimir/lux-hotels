import React, { useState } from "react";
import styled from "styled-components";
import { useBookings } from "../contexts/BookingsContext";
import { useToast } from "../contexts/ToastContext";

const Wrap = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px 0;
`;

const Input = styled.input`
  padding: 6px 10px;
  border: 1px solid ${({ palette }) => palette.border};
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.text};
  border-radius: 4px;
  font-size: 13px;
`;

const Btn = styled.button`
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
`;

const ModifyBooking = ({ palette, booking, onClose }) => {
  const { modifyBooking } = useBookings();
  const { push } = useToast();
  const [checkIn, setCheckIn] = useState(booking.checkIn);
  const [checkOut, setCheckOut] = useState(booking.checkOut);
  const [guests, setGuests] = useState(booking.guests);

  const submit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    modifyBooking(booking.id, { checkIn, checkOut, guests });
    push("Booking updated.", "success");
    if (onClose) onClose();
  };

  return (
    <Wrap onSubmit={submit}>
      <Input type="date" palette={palette} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} aria-label="Check-in" />
      <Input type="date" palette={palette} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} aria-label="Check-out" />
      <Input type="number" min="1" palette={palette} value={guests} onChange={(e) => setGuests(Number(e.target.value))} aria-label="Guests" style={{ width: 70 }} />
      <Btn type="submit" palette={palette}>Save</Btn>
    </Wrap>
  );
};

export default ModifyBooking;
