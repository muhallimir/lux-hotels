import React from "react";
import { Helmet } from "react-helmet-async";

const Seo = ({
  title = "Lux Hotels — Beachfront stays",
  description = "Beachfront rooms, suites, and signature service. Book direct for the best rates.",
  image = "/og-image.png",
  url,
  type = "website",
  schema,
}) => {
  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : "https://luxhotels.example.com/");
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Lux Hotels" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={fullUrl} />
      <meta name="theme-color" content="#af9a7d" />

      {schema ? (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ) : null}
    </Helmet>
  );
};

export default Seo;
