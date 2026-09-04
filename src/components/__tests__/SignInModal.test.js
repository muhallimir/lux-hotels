import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";
import SignInModal from "./SignInModal";

const Wrap = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

describe("SignInModal", () => {
  test("renders when open is true", () => {
    render(
      <Wrap>
        <SignInModal open onClose={() => {}} onSwitchToSignUp={() => {}} onSwitchToReset={() => {}} />
      </Wrap>
    );
    expect(screen.getByTestId("signin-email")).toBeInTheDocument();
    expect(screen.getByTestId("signin-password")).toBeInTheDocument();
    expect(screen.getByTestId("signin-submit")).toBeInTheDocument();
  });

  test("does not render when open is false", () => {
    render(
      <Wrap>
        <SignInModal open={false} onClose={() => {}} onSwitchToSignUp={() => {}} onSwitchToReset={() => {}} />
      </Wrap>
    );
    expect(screen.queryByTestId("signin-email")).toBeNull();
  });

  test("clicking submit with empty fields triggers error toast", () => {
    render(
      <Wrap>
        <SignInModal open onClose={() => {}} onSwitchToSignUp={() => {}} onSwitchToReset={() => {}} />
      </Wrap>
    );
    fireEvent.click(screen.getByTestId("signin-submit"));
    expect(screen.queryByText("Wrong password.")).toBeInTheDocument();
  });
});
