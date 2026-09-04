export const buildHotelSchema = (hotel = {}) => ({
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: hotel.name || "Lux Hotels",
  description: hotel.description || "Beachfront rooms, suites, and signature service.",
  image: hotel.image || "https://luxhotels.example.com/og-image.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: hotel.street || "1 Coastline Drive",
    addressLocality: hotel.city || "Lisbon",
    postalCode: hotel.zip || "1100-001",
    addressCountry: hotel.country || "PT",
  },
  telephone: hotel.phone || "+351 21 000 0000",
  priceRange: hotel.priceRange || "€€€",
  starRating: {
    "@type": "Rating",
    ratingValue: hotel.stars || 5,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Breakfast", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pool", value: true },
  ],
});

export const buildReviewSchema = (reviews = []) => reviews.map((r) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  author: { "@type": "Person", name: r.name },
  datePublished: r.createdAt,
  reviewBody: r.comment,
  reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
}));

export const buildBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.label,
    item: it.href,
  })),
});
