import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../contexts/ThemeContext";
import AmenitiesFilter, { AMENITY_OPTIONS } from "../AmenitiesFilter";

const Wrap = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe("AmenitiesFilter", () => {
  test("renders all amenity options", () => {
    const onChange = jest.fn();
    render(<Wrap><AmenitiesFilter value={[]} onChange={onChange} /></Wrap>);
    AMENITY_OPTIONS.forEach((o) => {
      expect(screen.getByTestId(`amenity-${o.key}`)).toBeInTheDocument();
    });
  });

  test("toggling calls onChange with the new set", () => {
    const onChange = jest.fn();
    render(<Wrap><AmenitiesFilter value={["wifi"]} onChange={onChange} /></Wrap>);
    fireEvent.click(screen.getByTestId("amenity-pool"));
    expect(onChange).toHaveBeenCalledWith(["wifi", "pool"]);
  });

  test("toggling off removes the amenity", () => {
    const onChange = jest.fn();
    render(<Wrap><AmenitiesFilter value={["wifi", "pool"]} onChange={onChange} /></Wrap>);
    fireEvent.click(screen.getByTestId("amenity-pool"));
    expect(onChange).toHaveBeenCalledWith(["wifi"]);
  });
});
