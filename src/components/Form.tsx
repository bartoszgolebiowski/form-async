import React from "react";
import { FormValues, SelectValues } from "../constants";
import Options from "./Options";
import Select from "./Select";

type Props = {
  user: SelectValues;
  post: SelectValues;
  comment: SelectValues;
  values: FormValues;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<Props> = (props) => {
  const { user, post, comment, values, handleChange, handleSubmit } = props;

  return (
    <>
      <form onSubmit={handleSubmit} aria-label="Report">
        <h1>Report</h1>
        <Select
          name="user"
          label="User"
          value={values.user ?? undefined}
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
          value={values.post ?? undefined}
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
          value={values.comment ?? undefined}
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

export default Form;
