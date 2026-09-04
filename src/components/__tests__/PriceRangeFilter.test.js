import { render, screen, fireEvent } from "@testing-library/react";
import PriceRangeFilter from "../PriceRangeFilter";

describe("PriceRangeFilter", () => {
  test("renders initial range and labels", () => {
    render(<PriceRangeFilter value={{ min: 100, max: 500 }} onChange={() => {}} />);
    expect(screen.getByText(/\$100.+?\$500/)).toBeInTheDocument();
  });

  test("changing the min slider triggers onChange", () => {
    const onChange = jest.fn();
    render(<PriceRangeFilter value={{ min: 100, max: 500 }} onChange={onChange} />);
    fireEvent.change(screen.getByTestId("price-min"), { target: { value: "150" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ min: 150 }));
  });

  test("min cannot exceed max minus 10", () => {
    const onChange = jest.fn();
    render(<PriceRangeFilter value={{ min: 100, max: 200 }} onChange={onChange} />);
    fireEvent.change(screen.getByTestId("price-min"), { target: { value: "500" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ min: 190 }));
  });
});
