import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingsContext";
import { useFavorites } from "../contexts/FavoritesContext";

const Wrap = styled.div`
  padding: 24px;
  max-width: 720px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  font-size: 14px;
`;

const Btn = styled.button`
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 8px;
`;

const Ghost = styled.button`
  background: transparent;
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

const initials = (name) => {
  if (!name) return "?";
  return name.split(/\s+/).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
};

const UserProfile = ({ palette, onSignIn, onSignUp }) => {
  const { user, signOut } = useAuth();
  const { bookings } = useBookings();
  const { items: favorites } = useFavorites();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  if (!user) {
    return (
      <Wrap>
        <Card palette={palette}>
          <h2>You're not signed in</h2>
          <p>Sign in to manage bookings, save favorites, and write reviews.</p>
          <Btn palette={palette} onClick={onSignIn}>Sign in</Btn>
          <Ghost palette={palette} onClick={onSignUp}>Create account</Ghost>
        </Card>
      </Wrap>
    );
  }

  const userBookings = bookings.filter((b) => /* simple: all bookings for demo */ true);

  return (
    <Wrap>
      <Card palette={palette}>
        <Avatar palette={palette}>{initials(user.name)}</Avatar>
        {editing ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: 8, borderRadius: 4, border: "1px solid #e5e7eb", fontSize: 16 }}
            />
            <Ghost palette={palette} onClick={() => setEditing(false)}>Save</Ghost>
          </>
        ) : (
          <>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            <div style={{ opacity: 0.7, fontSize: 14 }}>{user.email}</div>
            <Ghost palette={palette} onClick={() => setEditing(true)}>Edit name</Ghost>
          </>
        )}
      </Card>

      <Card palette={palette}>
        <h3 style={{ margin: "0 0 8px 0" }}>Activity</h3>
        <Stat palette={palette}>
          <span>Bookings</span>
          <strong>{userBookings.length}</strong>
        </Stat>
        <Stat palette={palette}>
          <span>Favorites</span>
          <strong>{favorites.length}</strong>
        </Stat>
      </Card>

      <Card palette={palette}>
        <Ghost palette={palette} onClick={signOut}>Sign out</Ghost>
      </Card>
    </Wrap>
  );
};

export default UserProfile;
