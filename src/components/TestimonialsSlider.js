import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrap = styled.section`
  margin: 32px 0;
  position: relative;
`;

const Track = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${({ palette }) => palette.border};
`;

const Slide = styled.div`
  flex: 0 0 100%;
  padding: 24px;
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s ease;
`;

const Quote = styled.p`
  font-size: 18px;
  font-style: italic;
  margin: 0 0 12px 0;
  max-width: 600px;
`;

const Author = styled.div`
  font-size: 14px;
  opacity: 0.7;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ active, palette }) => (active ? palette.accent : palette.border)};
  cursor: pointer;
`;

const testimonials = [
  { quote: "The most luxurious stay I've had in years. The ocean view alone is worth it.", author: "Sarah K., New York" },
  { quote: "Service was impeccable from check-in to the farewell breakfast. We'll be back.", author: "Marco D., Milan" },
  { quote: "Quiet, refined, and exactly what we needed after a long trip.", author: "Aiko T., Tokyo" },
  { quote: "Best mattress I've slept on outside my own home. Highly recommend the suite.", author: "James P., London" },
];

const TestimonialsSlider = ({ palette }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const go = (i) => setIndex(i);

  return (
    <Wrap>
      <h3>What guests say</h3>
      <Track palette={palette}>
        {testimonials.map((t, i) => (
          <Slide key={i} palette={palette} style={{ display: i === index ? "flex" : "none" }}>
            <Quote palette={palette}>"{t.quote}"</Quote>
            <Author palette={palette}>{t.author}</Author>
          </Slide>
        ))}
      </Track>
      <Controls>
        {testimonials.map((_, i) => (
          <Dot key={i} palette={palette} active={i === index} onClick={() => go(i)} aria-label={`Go to testimonial ${i + 1}`} />
        ))}
      </Controls>
    </Wrap>
  );
};

export default TestimonialsSlider;
