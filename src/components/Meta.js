import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ description, title, lang = "en", image, url, type = "website" }) => {
  const fullTitle = title ? `${title} · Lux Hotels` : "Lux Hotels";
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description || "Beachfront rooms, suites, and signature service."} />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="#af9a7d" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Lux Hotels" />
      <meta name="format-detection" content="telephone=no" />
      {image ? <meta name="image" content={image} /> : null}
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default Meta;
