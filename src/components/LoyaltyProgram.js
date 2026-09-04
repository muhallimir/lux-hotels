import React from "react";
import styled from "styled-components";

const Wrap = styled.section`
  background: linear-gradient(135deg, ${({ palette }) => palette.accent}, ${({ palette }) => palette.accentDark});
  border-radius: 12px;
  padding: 32px;
  color: white;
  text-align: center;
  margin: 32px 0;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
`;

const Sub = styled.p`
  margin: 0 0 16px 0;
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const Tier = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const TierName = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 4px;
`;

const Points = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin: 8px 0;
`;

const Perks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
  font-size: 13px;
  opacity: 0.9;
  text-align: left;

  li {
    padding: 4px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-child { border-bottom: none; }
  }
`;

const tiers = [
  { name: "Silver", points: "0+", perks: ["Welcome drink", "Late checkout when available", "Member-only rates"] },
  { name: "Gold", points: "5+", perks: ["All Silver perks", "Room upgrade subject to availability", "Free breakfast"] },
  { name: "Platinum", points: "15+", perks: ["All Gold perks", "Guaranteed late checkout", "Spa discount 20%"] },
  { name: "Black", points: "30+", perks: ["All Platinum perks", "Personal concierge", "Free airport transfer"] },
];

const LoyaltyProgram = ({ palette }) => {
  return (
    <Wrap palette={palette}>
      <Title>Loyalty Program</Title>
      <Sub>Stay more, save more. Earn points on every night.</Sub>
      <Grid>
        {tiers.map((t) => (
          <Tier key={t.name}>
            <TierName>{t.name}</TierName>
            <Points>{t.points}</Points>
            <div style={{ fontSize: 12, opacity: 0.85 }}>stays</div>
            <Perks>
              {t.perks.map((p, i) => <li key={i}>{p}</li>)}
            </Perks>
          </Tier>
        ))}
      </Grid>
    </Wrap>
  );
};

export default LoyaltyProgram;
