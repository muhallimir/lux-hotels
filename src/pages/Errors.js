import React from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

export default function Errors() {
  return (
    <Hero>
      <Banner title="404" subtitle="page not found">
        <Link to="/" className="btn-primary">
          back to home
        </Link>
      </Banner>
    </Hero>
  );
}
