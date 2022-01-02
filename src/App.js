import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRequest, selectRequest } from "./store";

const initialValues = {
  user: null,
  post: null,
  comment: null,
};

const CLEAR = {
  user: { post: null, comment: null },
  post: { comment: null },
  comment: {},
};

const URLS = {
  user: (id) => `https://jsonplaceholder.typicode.com/users`,
  post: (userId) =>
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  comment: (postId) =>
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
};

const SELECT = {
  user: (users) => users.map((user) => ({ id: user.id, name: user.name })),
  post: (posts) => posts.map((post) => ({ id: post.id, name: post.title })),
  comment: (comments) =>
    comments.map((comment) => ({ id: comment.id, name: comment.name })),
};

const useSelectValues = (key, parentId = true) => {
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [values, setValues] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(URLS[key](parentId));
        const data = await response.json();
        setValues(SELECT[key](data));
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    if (parentId) {
      fetchData();
    } else {
      setValues(null);
    }
  }, [parentId, key]);

  return { isLoading, isError, values };
};

const useSelectValuesRedux = (key, parentId = true) => {
  const dispatch = useDispatch();
  const data = useSelector(
    selectRequest({
      key,
      arg: { parentId },
      select: SELECT[key],
    })
  );

  React.useEffect(() => {
    if (!parentId) return;
    dispatch(actionRequest({ key, arg: { parentId } }));
  }, [parentId, key, dispatch]);

  return {
    isLoading: data?.isLoading ?? false,
    isError: data?.isError ?? false,
    values: data?.data ?? null,
  };
};

const loading = {
  opacity: 0.5,
};

const error = {
  border: "1px solid red",
  opacity: 0.5,
};

const Select = (props) => {
  const { label, isLoading, isError, value, ...rest } = props;
  const style = isLoading ? loading : isError ? error : null;

  return (
    <p>
      <label>
        {label}
        <select {...rest} value={value ?? ""} style={style} />
      </label>
    </p>
  );
};

const Options = (props) => {
  const { values } = props;
  return (
    <>
      <option style={{ display: "none" }} value=""></option>
      {displayOptions(values)}
    </>
  );
};

const displayOptions = (values) => {
  if (!values) return null;
  return values.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ));
};

const App = () => {
  const [values, setValues] = React.useState(initialValues);

  const user = useSelectValuesRedux("user");
  const post = useSelectValuesRedux("post", values.user);
  const comment = useSelectValuesRedux("comment", values.post);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(values));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      ...CLEAR[e.target.name],
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} aria-label="Report">
        <h1>Report</h1>
        <Select
          name="user"
          label="User"
          value={values.user}
          onChange={handleChange}
          disabled={!user.values}
          isLoading={user.isLoading}
          isError={user.isError}
        >
          <Options values={user.values} />
        </Select>
        <Select
          name="post"
          label="Post"
          value={values.post}
          onChange={handleChange}
          disabled={!post.values}
          isLoading={post.isLoading}
          isError={post.isError}
        >
          <Options values={post.values} />
        </Select>
        <Select
          name="comment"
          label="Comment"
          value={values.comment}
          onChange={handleChange}
          disabled={!comment.values}
          isLoading={comment.isLoading}
          isError={comment.isError}
        >
          <Options values={comment.values} />
        </Select>
        <button type="submit" disabled={!values.comment}>
          Submit
        </button>
      </form>
      <style>{`
        form {
          width: 20rem;
          margin: 0 auto;
        }
        label {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default App;
