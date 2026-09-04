import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  border-radius: 10px;
  padding: 16px 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
`;

const Icon = styled.div`
  font-size: 36px;
  margin-right: 12px;
`;

const Info = styled.div`
  flex: 1;
`;

const Label = styled.div`
  font-size: 12px;
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const Details = styled.div`
  font-size: 13px;
  opacity: 0.9;
`;

const seedWeather = {
  city: "Lisbon",
  temperature: 24,
  condition: "Sunny",
  icon: "☀️",
  details: "Light breeze. Perfect for sightseeing.",
};

const WeatherWidget = ({ palette, city = seedWeather.city }) => {
  const [data, setData] = useState(() => ({ ...seedWeather, city }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData((d) => ({ ...d, city }));
  }, [city]);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      const conditions = ["Sunny", "Cloudy", "Partly cloudy", "Light rain", "Clear"];
      const icons = ["☀️", "☁️", "⛅", "🌦️", "🌙"];
      const i = Math.floor(Math.random() * conditions.length);
      setData({
        city,
        temperature: Math.round(15 + Math.random() * 20),
        condition: conditions[i],
        icon: icons[i],
        details: "Updated just now.",
      });
      setLoading(false);
    }, 350);
  };

  return (
    <Wrap onClick={refresh} role="button" tabIndex={0} aria-label="Tap to refresh weather">
      <Icon>{data.icon}</Icon>
      <Info>
        <Label>{data.city}</Label>
        <Value>{data.temperature}°C · {data.condition}</Value>
        <Details>{loading ? "Refreshing…" : data.details}</Details>
      </Info>
    </Wrap>
  );
};

export default WeatherWidget;
