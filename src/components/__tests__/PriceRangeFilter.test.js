import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import PriceRangeFilter from "./PriceRangeFilter";

const Wrap = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe("PriceRangeFilter", () => {
  test("renders initial range and labels", () => {
    render(
      <Wrap>
        <PriceRangeFilter value={{ min: 100, max: 500 }} onChange={() => {}} />
      </Wrap>
    );
    expect(screen.getByText(/\$100 – \$500/)).toBeInTheDocument();
  });

  test("changing the min slider triggers onChange", () => {
    const onChange = jest.fn();
    render(
      <Wrap>
        <PriceRangeFilter value={{ min: 100, max: 500 }} onChange={onChange} />
      </Wrap>
    );
    fireEvent.change(screen.getByTestId("price-min"), { target: { value: "150" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ min: 150 }));
  });

  test("min cannot exceed max minus 10", () => {
    const onChange = jest.fn();
    render(
      <Wrap>
        <PriceRangeFilter value={{ min: 100, max: 200 }} onChange={onChange} />
      </Wrap>
    );
    fireEvent.change(screen.getByTestId("price-min"), { target: { value: "500" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ min: 190 }));
  });
});
