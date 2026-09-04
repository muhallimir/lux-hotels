import { render, screen, fireEvent } from "@testing-library/react";
import { ToastProvider, useToast } from "../../contexts/ToastContext";
import ToastContainer from "../ToastContainer";

const Trigger = () => {
  const { push } = useToast();
  return <button onClick={() => push("Saved", "success")}>push</button>;
};

describe("ToastContainer + ToastProvider", () => {
  test("renders nothing when there are no toasts", () => {
    render(
      <ToastProvider>
        <ToastContainer toasts={[]} dismiss={() => {}} />
      </ToastProvider>
    );
    expect(screen.queryByText("Saved")).toBeNull();
  });

  test("renders the toast message when present", () => {
    const dismiss = jest.fn();
    render(
      <ToastProvider>
        <Trigger />
        <ToastContainer toasts={[{ id: "1", message: "Saved", type: "success" }]} dismiss={dismiss} />
      </ToastProvider>
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });
});
