import { buildHotelSchema, buildReviewSchema, buildBreadcrumbSchema } from "./schema";

describe("schema builders", () => {
  test("buildHotelSchema returns a valid Hotel schema with defaults", () => {
    const schema = buildHotelSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Hotel");
    expect(schema.name).toBe("Lux Hotels");
    expect(schema.starRating.ratingValue).toBe(5);
    expect(Array.isArray(schema.amenityFeature)).toBe(true);
  });

  test("buildHotelSchema accepts overrides", () => {
    const schema = buildHotelSchema({ name: "Test Inn", city: "Porto", stars: 4 });
    expect(schema.name).toBe("Test Inn");
    expect(schema.address.addressLocality).toBe("Porto");
    expect(schema.starRating.ratingValue).toBe(4);
  });

  test("buildReviewSchema maps each review to a Review schema", () => {
    const reviews = [
      { name: "Alice", rating: 5, comment: "Loved it", createdAt: "2024-01-01T00:00:00Z" },
      { name: "Bob", rating: 3, comment: "OK", createdAt: "2024-01-02T00:00:00Z" },
    ];
    const out = buildReviewSchema(reviews);
    expect(out).toHaveLength(2);
    expect(out[0]["@type"]).toBe("Review");
    expect(out[0].reviewRating.ratingValue).toBe(5);
    expect(out[1].reviewRating.ratingValue).toBe(3);
  });

  test("buildBreadcrumbSchema returns proper ListItem entries", () => {
    const items = [
      { label: "Home", href: "https://x.com/" },
      { label: "Rooms", href: "https://x.com/rooms" },
    ];
    const schema = buildBreadcrumbSchema(items);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].name).toBe("Rooms");
  });

  test("buildBreadcrumbSchema handles empty input", () => {
    const schema = buildBreadcrumbSchema([]);
    expect(schema.itemListElement).toEqual([]);
  });
});
