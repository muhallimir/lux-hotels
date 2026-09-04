import React, { useState } from "react";
import styled from "styled-components";
import { useReviews } from "../contexts/ReviewsContext";

const Wrap = styled.section`
  margin: 32px 0;
`;

const Title = styled.h3`
  margin: 0 0 12px 0;
`;

const Card = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Form = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 8px;
  border: 1px solid ${({ palette }) => palette.border};
  background: ${({ palette }) => palette.background};
  color: ${({ palette }) => palette.text};
  border-radius: 4px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 8px;
  border: 1px solid ${({ palette }) => palette.border};
  background: ${({ palette }) => palette.background};
  color: ${({ palette }) => palette.text};
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
`;

const StarPicker = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`;

const Star = styled.span`
  font-size: 28px;
  color: ${({ active, palette }) => (active ? palette.accent : palette.border)};
  cursor: pointer;
  user-select: none;
`;

const Submit = styled.button`
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
`;

const ReviewsSection = ({ roomSlug, palette }) => {
  const { reviews, addReview, averageFor } = useReviews();
  const list = reviews.filter((r) => r.roomSlug === roomSlug);
  const stats = averageFor(roomSlug);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name) return;
    addReview({ roomSlug, name, rating, comment });
    setName("");
    setComment("");
    setRating(5);
  };

  return (
    <Wrap>
      <Title>Guest reviews</Title>
      <div style={{ marginBottom: 16, fontSize: 14 }}>
        {stats.count > 0 ? (
          <>
            <strong>{stats.average.toFixed(1)} ★</strong>{" "}
            <span style={{ opacity: 0.7 }}>({stats.count} review{stats.count === 1 ? "" : "s"})</span>
          </>
        ) : (
          <span style={{ opacity: 0.7 }}>No reviews yet. Be the first to write one.</span>
        )}
      </div>

      {list.map((r) => (
        <Card key={r.id} palette={palette}>
          <Row>
            <strong>{r.name}</strong>
            <span style={{ color: palette.accent }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
          </Row>
          {r.comment ? <p style={{ margin: "4px 0 0 0", opacity: 0.85 }}>{r.comment}</p> : null}
        </Card>
      ))}

      <Form palette={palette} onSubmit={submit}>
        <strong>Write a review</strong>
        <Input
          palette={palette}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StarPicker>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              palette={palette}
              active={n <= rating}
              onClick={() => setRating(n)}
            >
              ★
            </Star>
          ))}
        </StarPicker>
        <Textarea
          palette={palette}
          placeholder="Tell other guests what you liked (or didn't)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Submit palette={palette} type="submit">Post review</Submit>
      </Form>
    </Wrap>
  );
};

export default ReviewsSection;
