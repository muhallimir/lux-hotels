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

const SignInModal = ({ palette, open, onClose, onSwitchToSignUp, onSwitchToReset }) => {
  const { signIn } = useAuth();
  const { push } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const result = signIn({ email, password });
    if (result.ok) {
      push("Signed in.", "success");
      onClose();
    } else {
      const msg = result.reason === "no_account" ? "No account with that email." : "Wrong password.";
      push(msg, "error");
    }
  };

  return (
    <Modal open={open} onClick={onClose}>
      <Card palette={palette} onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <Title>Sign in</Title>
        <Input
          type="email"
          placeholder="Email"
          palette={palette}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="signin-email"
        />
        <Input
          type="password"
          placeholder="Password"
          palette={palette}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="signin-password"
        />
        <Btn palette={palette} type="submit" data-testid="signin-submit">
          Sign in
        </Btn>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <Ghost type="button" palette={palette} onClick={onSwitchToReset}>
            Forgot password?
          </Ghost>
          <Ghost type="button" palette={palette} onClick={onSwitchToSignUp}>
            Create account
          </Ghost>
        </div>
        <Ghost type="button" palette={palette} onClick={onClose}>
          Close
        </Ghost>
      </Card>
    </Modal>
  );
};

export default SignInModal;
