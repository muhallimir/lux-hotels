import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Skeleton = styled.div`
  background: ${({ palette }) => palette.surface};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "16px"};
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, ${({ palette }) => palette.border} 50%, transparent);
    animation: shimmer 1.4s infinite;
  }
  @keyframes shimmer {
    from { transform: translateX(-100%); }
    to   { transform: translateX(100%); }
  }
`;

const SkeletonBox = styled(Skeleton).attrs({ as: "div" })``;

const SkeletonCard = () => {
  const { palette } = useTheme();
  return (
    <div style={{ padding: 12 }}>
      <SkeletonBox palette={palette} height="180px" width="100%" />
      <div style={{ height: 12 }} />
      <Skeleton palette={palette} width="80%" />
      <div style={{ height: 8 }} />
      <Skeleton palette={palette} width="60%" />
      <div style={{ height: 8 }} />
      <Skeleton palette={palette} width="40%" height="24px" />
    </div>
  );
};

export { Skeleton, SkeletonBox, SkeletonCard };
export default Skeleton;
