import { render, screen, fireEvent } from "@testing-library/react";
import AmenitiesFilter, { AMENITY_OPTIONS } from "../AmenitiesFilter";

describe("AmenitiesFilter", () => {
  test("renders all amenity options", () => {
    const onChange = jest.fn();
    render(<AmenitiesFilter value={[]} onChange={onChange} />);
    AMENITY_OPTIONS.forEach((o) => {
      expect(screen.getByTestId(`amenity-${o.key}`)).toBeInTheDocument();
    });
  });

  test("toggling calls onChange with the new set", () => {
    const onChange = jest.fn();
    render(<AmenitiesFilter value={["wifi"]} onChange={onChange} />);
    fireEvent.click(screen.getByTestId("amenity-pool"));
    expect(onChange).toHaveBeenCalledWith(["wifi", "pool"]);
  });

  test("toggling off removes the amenity", () => {
    const onChange = jest.fn();
    render(<AmenitiesFilter value={["wifi", "pool"]} onChange={onChange} />);
    fireEvent.click(screen.getByTestId("amenity-pool"));
    expect(onChange).toHaveBeenCalledWith(["wifi"]);
  });
});
