import React from "react";
import styled from "styled-components";
import { useBookings } from "../contexts/BookingsContext";
import { useCurrency } from "../contexts/CurrencyContext";

const Wrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
`;

const Card = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const Status = styled.span`
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  background: ${({ status }) => (status === "cancelled" ? "#dc2626" : status === "confirmed" ? "#10b981" : "#f59e0b")};
`;

const Btn = styled.button`
  background: transparent;
  color: ${({ palette }) => palette.accent};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 6px;
  &:hover { background: ${({ palette }) => palette.border}; }
`;

const Danger = styled.button`
  background: transparent;
  color: #dc2626;
  border: 1px solid #fee2e2;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #fef2f2; }
`;

const Empty = styled.p`
  text-align: center;
  padding: 32px;
  opacity: 0.7;
`;

const BookingHistory = ({ palette, onModify }) => {
  const { bookings, cancelBooking } = useBookings();
  const { convert } = useCurrency();

  if (bookings.length === 0) {
    return (
      <Wrap>
        <h2>Your bookings</h2>
        <Empty>You haven't booked anything yet.</Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <h2>Your bookings</h2>
      {bookings.map((b) => (
        <Card key={b.id} palette={palette}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <strong>{b.roomName || "Room"}</strong>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                {b.checkIn} → {b.checkOut} · {b.guests} guest{b.guests === 1 ? "" : "s"}
              </div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                Total: {convert(b.total || 0)} · Booked {new Date(b.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Status status={b.status}>{b.status}</Status>
          </div>
          <div>
            {b.status === "confirmed" ? (
              <>
                <Btn palette={palette} onClick={() => onModify && onModify(b)}>Modify</Btn>
                <Danger onClick={() => cancelBooking(b.id)}>Cancel</Danger>
              </>
            ) : null}
          </div>
        </Card>
      ))}
    </Wrap>
  );
};

export default BookingHistory;
