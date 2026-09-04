import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  background: ${({ palette }) => palette.surface};
  border: 1px solid ${({ palette }) => palette.border};
  border-radius: 8px;
  padding: 24px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Icon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
`;

const Info = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const Sub = styled.div`
  font-size: 13px;
  opacity: 0.7;
`;

const Btn = styled.a`
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
`;

const VirtualTourLink = ({ palette, tourUrl, roomName }) => {
  if (!tourUrl) return null;
  return (
    <Wrap palette={palette}>
      <Icon palette={palette}>360°</Icon>
      <Info>
        <Title>Take a virtual tour</Title>
        <Sub>See {roomName || "the room"} from every angle before you book.</Sub>
      </Info>
      <Btn palette={palette} href={tourUrl} target="_blank" rel="noreferrer">
        Start tour
      </Btn>
    </Wrap>
  );
};

export default VirtualTourLink;
