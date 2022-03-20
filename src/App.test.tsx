import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SWR from "./components/SWR";
import Vanilia from "./components/Vanilia";

const Components = [
  { Component: Vanilia, label: "Vanilia" },
  { Component: SWR, label: "SWR" },
];

describe("form-async", () => {
  Components.forEach(({ Component, label }) => {
    describe(`${label}`, () => {
      it("should render three selects, user select should be enabled, post and comment should be disabled", async () => {
        render(<Component />);
        await waitFor(() =>
          expect(screen.queryByLabelText(/User/i)).toBeEnabled()
        );
        expect(screen.getByLabelText(/Post/i)).toBeDisabled();
        expect(screen.getByLabelText(/Comment/i)).toBeDisabled();
      });

      it("should enable post select, after selecting user from select input", async () => {
        render(<Component />);
        await waitFor(() =>
          expect(screen.queryByLabelText(/User/i)).toBeEnabled()
        );
        userEvent.selectOptions(
          screen.getByLabelText(/User/i),
          "Leanne Graham"
        );
        await waitFor(() =>
          expect(screen.queryByLabelText(/Post/i)).toBeEnabled()
        );
      });

      it("should enable comment select, after selecting post from select input", async () => {
        render(<Component />);
        await waitFor(() =>
          expect(screen.queryByLabelText(/User/i)).toBeEnabled()
        );
        userEvent.selectOptions(
          screen.getByLabelText(/User/i),
          "Leanne Graham"
        );
        await waitFor(() =>
          expect(screen.queryByLabelText(/Post/i)).toBeEnabled()
        );
        userEvent.selectOptions(screen.getByLabelText(/Post/i), "qui est esse");
        await waitFor(() =>
          expect(screen.queryByLabelText(/Comment/i)).toBeEnabled()
        );
      });

      it("should clear post and comment selects, post select should be enabled, comment select should be disabled", async () => {
        render(<Component />);
        await waitFor(() =>
          expect(screen.queryByLabelText(/User/i)).toBeEnabled()
        );
        userEvent.selectOptions(
          screen.getByLabelText(/User/i),
          "Leanne Graham"
        );
        await waitFor(() =>
          expect(screen.queryByLabelText(/Post/i)).toBeEnabled()
        );
        userEvent.selectOptions(screen.getByLabelText(/Post/i), "qui est esse");
        await waitFor(() =>
          expect(screen.queryByLabelText(/Comment/i)).toBeEnabled()
        );
        userEvent.selectOptions(screen.getByLabelText(/User/i), "Ervin Howell");

        expect(screen.getByLabelText(/Post/i)).toHaveValue("");
        expect(screen.getByLabelText(/Comment/i)).toBeDisabled();
        expect(screen.getByLabelText(/Comment/i)).toHaveValue("");
      });

      it("should enable submit button, when all selects are filled", async () => {
        render(<Component />);
        await waitFor(() =>
          expect(screen.queryByLabelText(/User/i)).toBeEnabled()
        );
        userEvent.selectOptions(
          screen.getByLabelText(/User/i),
          "Leanne Graham"
        );
        await waitFor(() =>
          expect(screen.queryByLabelText(/Post/i)).toBeEnabled()
        );
        userEvent.selectOptions(screen.getByLabelText(/Post/i), "qui est esse");
        await waitFor(() =>
          expect(screen.queryByLabelText(/Comment/i)).toBeEnabled()
        );
        userEvent.selectOptions(
          screen.getByLabelText(/Comment/i),
          "et omnis dolorem"
        );
        await waitFor(() =>
          expect(
            screen.queryByRole("button", { name: /submit/i })
          ).toBeEnabled()
        );
      });
    });
  });
});
