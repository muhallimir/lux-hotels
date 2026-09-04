import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { ToastProvider, useToast } from "../../contexts/ToastContext";
import ToastContainer from "./ToastContainer";

const Trigger = () => {
  const { push } = useToast();
  return <button onClick={() => push("Saved", "success")}>push</button>;
};

describe("ToastContainer + ToastProvider", () => {
  test("renders nothing when there are no toasts", () => {
    render(
      <ThemeProvider>
        <ToastProvider>
          <ToastContainer toasts={[]} dismiss={() => {}} />
        </ToastProvider>
      </ThemeProvider>
    );
    expect(screen.queryByRole("region", { name: /notifications/i })).toBeNull();
  });

  test("clicking push renders the toast and dismiss removes it", () => {
    const dismiss = jest.fn();
    render(
      <ThemeProvider>
        <ToastProvider>
          <Trigger />
          <ToastContainer toasts={[{ id: "1", message: "Saved", type: "success" }]} dismiss={dismiss} />
        </ToastProvider>
      </ThemeProvider>
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(dismiss).toHaveBeenCalledWith("1");
  });
});
