import React, { useState } from "react";
import styled from "styled-components";
import { useNewsletter } from "../contexts/NewsletterContext";
import { useToast } from "../contexts/ToastContext";

const Wrap = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0;
  text-align: center;
`;

const Row = styled.form`
  display: flex;
  gap: 8px;
  max-width: 460px;
  margin: 0 auto;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid ${({ palette }) => palette.border};
  background: ${({ palette }) => palette.background};
  color: ${({ palette }) => palette.text};
  border-radius: 6px;
  font-size: 14px;
`;

const Button = styled.button`
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
`;

const NewsletterSignup = ({ palette }) => {
  const { subscribed, subscribe } = useNewsletter();
  const { push } = useToast();
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const ok = subscribe(email);
    if (ok) {
      push("Thanks for subscribing!", "success");
      setEmail("");
    } else {
      push("Please enter a valid email.", "error");
    }
  };

  if (subscribed) {
    return (
      <Wrap palette={palette}>
        <strong>You're subscribed.</strong>
        <p style={{ margin: "4px 0 0 0", opacity: 0.8 }}>We'll send you occasional travel deals.</p>
      </Wrap>
    );
  }

  return (
    <Wrap palette={palette}>
      <strong>Stay in the loop</strong>
      <p style={{ margin: "4px 0 16px 0", opacity: 0.8 }}>Get exclusive offers and travel inspiration.</p>
      <Row onSubmit={submit}>
        <Input
          type="email"
          placeholder="you@example.com"
          palette={palette}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="newsletter-email"
        />
        <Button type="submit" palette={palette} data-testid="newsletter-submit">
          Subscribe
        </Button>
      </Row>
    </Wrap>
  );
};

export default NewsletterSignup;
