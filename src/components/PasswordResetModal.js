import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 9980;
`;

const Card = styled.form`
  background: ${({ palette }) => palette.background};
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 12px;
  padding: 24px;
  width: 92vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ palette }) => palette.border};
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.text};
  border-radius: 6px;
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
`;

const Ghost = styled.button`
  background: transparent;
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
`;

const PasswordResetModal = ({ palette, open, onClose, onSwitchToSignIn }) => {
  const { resetPassword } = useAuth();
  const { push } = useToast();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      push("Password must be at least 6 characters.", "error");
      return;
    }
    const result = resetPassword({ email, newPassword });
    if (result.ok) {
      push("Password updated. Try signing in.", "success");
      onSwitchToSignIn();
    } else {
      push("No account with that email.", "error");
    }
  };

  return (
    <Modal open={open} onClick={onClose}>
      <Card palette={palette} onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <Title>Reset password</Title>
        <Input type="email" placeholder="Account email" palette={palette} value={email} onChange={(e) => setEmail(e.target.value)} data-testid="reset-email" />
        <Input type="password" placeholder="New password (6+ chars)" palette={palette} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} data-testid="reset-password" />
        <Btn palette={palette} type="submit" data-testid="reset-submit">Update password</Btn>
        <Ghost type="button" palette={palette} onClick={onSwitchToSignIn}>Back to sign in</Ghost>
        <Ghost type="button" palette={palette} onClick={onClose}>Close</Ghost>
      </Card>
    </Modal>
  );
};

export default PasswordResetModal;
