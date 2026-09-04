import React from "react";
import styled from "styled-components";
import { useCurrency } from "../contexts/CurrencyContext";
import { useToast } from "../contexts/ToastContext";

const Wrap = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 12px;
  padding: 32px;
  color: white;
  text-align: center;
  max-width: 480px;
  margin: 24px auto;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  margin: 0 0 24px 0;
  opacity: 0.9;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Btn = styled.button`
  background: white;
  color: #059669;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  margin: 0 8px;
`;

const BookingConfirmation = ({ booking, onClose, onTrack }) => {
  const { convert } = useCurrency();
  const { push } = useToast();

  if (!booking) return null;

  return (
    <Wrap role="alert">
      <Icon>✓</Icon>
      <Title>Booking confirmed</Title>
      <Subtitle>We've sent the details to your email.</Subtitle>
      <Row>
        <span>Reference</span>
        <strong>{booking.id}</strong>
      </Row>
      <Row>
        <span>Room</span>
        <strong>{booking.roomName || "Room"}</strong>
      </Row>
      <Row>
        <span>Dates</span>
        <strong>{booking.checkIn} → {booking.checkOut}</strong>
      </Row>
      <Row>
        <span>Guests</span>
        <strong>{booking.guests}</strong>
      </Row>
      <Row>
        <span>Total</span>
        <strong>{convert(booking.total || 0)}</strong>
      </Row>
      <div style={{ marginTop: 16 }}>
        <Btn onClick={onTrack}>Track</Btn>
        <Btn onClick={() => { push("Added to your calendar.", "success"); }}>Add to calendar</Btn>
        <Btn onClick={onClose}>Done</Btn>
      </div>
    </Wrap>
  );
};

export default BookingConfirmation;
