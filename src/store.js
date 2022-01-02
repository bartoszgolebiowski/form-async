import { applyMiddleware, createStore } from "redux";

const CACHE_TIME = 10000;
const REQUEST_MIDDLEWARE = "REQUEST_MIDDLEWARE";
const KEY = ({ key, arg }) => `${key}-${JSON.stringify(arg)}`;

const requestReducer = (state = {}, action) => {
  if (action.type === "FETCH_DATA_STARTED") {
    return {
      ...state,
      [REQUEST_MIDDLEWARE]: {
        ...state[REQUEST_MIDDLEWARE],
        [KEY(action)]: {
          isLoading: true,
          isError: false,
          data: null,
        },
      },
    };
  }
  if (action.type === "FETCH_DATA_RECEIVED") {
    return {
      ...state,
      [REQUEST_MIDDLEWARE]: {
        ...state[REQUEST_MIDDLEWARE],
        [KEY(action)]: {
          data: action.data,
          isLoading: false,
          isError: false,
          expiredAt: Date.now() + CACHE_TIME,
        },
      },
    };
  }

  if (action.type === "FETCH_DATA_ERROR") {
    return {
      ...state,
      [REQUEST_MIDDLEWARE]: {
        ...state[REQUEST_MIDDLEWARE],
        [KEY(action)]: {
          error: action.error,
          isLoading: false,
          isError: true,
          data: null,
        },
      },
    };
  }

  return state;
};

export const actionRequest = ({ key, arg }) => ({
  type: "FETCH_DATA",
  key,
  arg,
});

export const selectRequest =
  ({ select = (value) => value, ...meta }) =>
  (state) => {
    const raw = state[REQUEST_MIDDLEWARE][KEY(meta)] ?? null;
    if (!raw) return null;
    if (!raw.data) return null;
    console.log(raw);
    return {
      ...raw,
      data: select(raw.data),
    };
  };

const middleware = (API) => (store) => (dispatch) => (action) => {
  if (action.type === "FETCH_DATA") {
    const key = action.key;
    const arg = action.arg;
    const data = store.getState()[REQUEST_MIDDLEWARE][KEY(action)];

    const shouldMakeRequest = !(data?.expiredAt > Date.now());

    if (shouldMakeRequest) {
      dispatch({ type: "FETCH_DATA_STARTED", key, arg });
      API[key](arg).then(
        (data) => dispatch({ type: "FETCH_DATA_RECEIVED", key, data, arg }),
        (error) => dispatch({ type: "FETCH_DATA_ERROR", key, error, arg })
      );
    }
    return store.getState();
  }

  return dispatch(action);
};

const API = {
  user: ({ parentId }) =>
    fetch(`https://jsonplaceholder.typicode.com/users`).then((res) =>
      res.json()
    ),
  post: ({ parentId }) =>
    fetch(`https://jsonplaceholder.typicode.com/users/${parentId}/posts`).then(
      (res) => res.json()
    ),
  comment: ({ parentId }) =>
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${parentId}/comments`
    ).then((res) => res.json()),
};

export const store = createStore(
  requestReducer,
  { [REQUEST_MIDDLEWARE]: {} },
  applyMiddleware(middleware(API))
);

export const createStoreThunk = (extraArg = API) => {
  return createStore(
    requestReducer,
    { [REQUEST_MIDDLEWARE]: {} },
    applyMiddleware(middleware(extraArg))
  );
};
