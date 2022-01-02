import { Provider } from "react-redux";
import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStoreThunk } from "./store";

const customRender = (API) => {
  return (ui, renderOptions = {}) => {
    function Wrapper({ children }) {
      const store = createStoreThunk(API);
      return <Provider store={store}>{children}</Provider>;
    }
    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };
};

const MOCKED_API = {
  user: ({ parentId }) =>
    Promise.resolve([
      {
        id: 1,
        name: "Leanne Graham",
      },
      {
        id: 2,
        name: "Ervin Howell",
      },
    ]),
  post: ({ parentId }) =>
    Promise.resolve([
      {
        userId: 2,
        id: 11,
        title: "et ea vero quia laudantium autem",
      },
      {
        userId: 2,
        id: 12,
        title: "in quibusdam tempore odit est dolorem",
      },
    ]),
  comment: ({ parentId }) =>
    Promise.resolve([
      {
        postId: 12,
        id: 56,
        name: "et dolorem corrupti sed molestias",
      },
      {
        postId: 12,
        id: 57,
        name: "qui quidem sed",
      },
    ]),
};

describe("form-async-redux", () => {
  it("should render tree selects, user select should be enabled, post and comment should be disabled", async () => {
    customRender(MOCKED_API)(<App />);
    await waitFor(() => expect(screen.queryByLabelText(/User/i)).toBeEnabled());
    expect(screen.getByLabelText(/Post/i)).toBeDisabled();
    expect(screen.getByLabelText(/Comment/i)).toBeDisabled();
  });

  it("should enable post select, after selecting user from select input", async () => {
    customRender(MOCKED_API)(<App />);
    await waitFor(() => expect(screen.queryByLabelText(/User/i)).toBeEnabled());
    userEvent.selectOptions(screen.getByLabelText(/User/i), "Leanne Graham");
    await waitFor(() => expect(screen.queryByLabelText(/Post/i)).toBeEnabled());
  });

  it("should enable comment select, after selecting post from select input", async () => {
    customRender(MOCKED_API)(<App />);
    await waitFor(() => expect(screen.queryByLabelText(/User/i)).toBeEnabled());
    userEvent.selectOptions(screen.getByLabelText(/User/i), "Leanne Graham");
    await waitFor(() => expect(screen.queryByLabelText(/Post/i)).toBeEnabled());
    userEvent.selectOptions(
      screen.getByLabelText(/Post/i),
      "et ea vero quia laudantium autem"
    );
    await waitFor(() =>
      expect(screen.queryByLabelText(/Comment/i)).toBeEnabled()
    );
  });

  it("should clear post and comment selects, post select should be enabled, comment select should be disabled", async () => {
    customRender(MOCKED_API)(<App />);
    await waitFor(() => expect(screen.queryByLabelText(/User/i)).toBeEnabled());
    userEvent.selectOptions(screen.getByLabelText(/User/i), "Leanne Graham");
    await waitFor(() => expect(screen.queryByLabelText(/Post/i)).toBeEnabled());
    userEvent.selectOptions(
      screen.getByLabelText(/Post/i),
      "et ea vero quia laudantium autem"
    );
    await waitFor(() =>
      expect(screen.queryByLabelText(/Comment/i)).toBeEnabled()
    );
    userEvent.selectOptions(screen.getByLabelText(/User/i), "Ervin Howell");
    expect(screen.getByLabelText(/Post/i)).toHaveValue("");
    expect(screen.getByLabelText(/Comment/i)).toBeDisabled();
    expect(screen.getByLabelText(/Comment/i)).toHaveValue("");
  });

  it("should enable submit button, when all selects are filled", async () => {
    customRender(MOCKED_API)(<App />);
    await waitFor(() => expect(screen.queryByLabelText(/User/i)).toBeEnabled());
    userEvent.selectOptions(screen.getByLabelText(/User/i), "Leanne Graham");
    await waitFor(() => expect(screen.queryByLabelText(/Post/i)).toBeEnabled());
    userEvent.selectOptions(
      screen.getByLabelText(/Post/i),
      "et ea vero quia laudantium autem"
    );
    await waitFor(() =>
      expect(screen.queryByLabelText(/Comment/i)).toBeEnabled()
    );
    userEvent.selectOptions(
      screen.getByLabelText(/Comment/i),
      "qui quidem sed"
    );
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: /submit/i })).toBeEnabled()
    );
  });
});
