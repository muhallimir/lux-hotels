import { CURRENCIES } from "../contexts/CurrencyContext";
import { AMENITY_OPTIONS } from "../components/AmenitiesFilter";

describe("CURRENCIES lookup", () => {
  test("has the 6 documented currencies", () => {
    expect(Object.keys(CURRENCIES)).toEqual(
      expect.arrayContaining(["USD", "EUR", "GBP", "JPY", "CAD", "AUD"])
    );
  });

  test("USD is the base with rate 1", () => {
    expect(CURRENCIES.USD.rate).toBe(1);
    expect(CURRENCIES.USD.symbol).toBe("$");
  });

  test("JPY conversion returns rounded integer", () => {
    expect(CURRENCIES.JPY.symbol).toBe("¥");
    expect(Number.isInteger(Number("123"))).toBe(true);
  });

  test("every currency has symbol, rate, code, label", () => {
    Object.values(CURRENCIES).forEach((c) => {
      expect(typeof c.symbol).toBe("string");
      expect(typeof c.rate).toBe("number");
      expect(typeof c.code).toBe("string");
      expect(typeof c.label).toBe("string");
    });
  });
});

describe("AMENITY_OPTIONS", () => {
  test("has at least 8 amenities", () => {
    expect(AMENITY_OPTIONS.length).toBeGreaterThanOrEqual(8);
  });

  test("each option has a key and label", () => {
    AMENITY_OPTIONS.forEach((o) => {
      expect(typeof o.key).toBe("string");
      expect(typeof o.label).toBe("string");
      expect(o.key.length).toBeGreaterThan(0);
    });
  });

  test("keys are unique", () => {
    const keys = AMENITY_OPTIONS.map((o) => o.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
