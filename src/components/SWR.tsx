import React from "react";
import useSWR from "swr";
import { initialValues, SELECT, URLS, CLEAR } from "../constants";
import {
  AllKeys,
  User,
  OptionValue,
  Post,
  Comment,
  AllResponses,
  SelectValues,
} from "../types";
import Form from "./Form";

const SWR = () => {
  const [values, setValues] = React.useState(initialValues);

  const user = useSelectOptions("user", -1);
  const post = useSelectOptions("post", values.user);
  const comment = useSelectOptions("comment", values.post);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(values));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as AllKeys;

    setValues({
      ...values,
      [name]: e.target.value,
      ...CLEAR[name],
    });
  };

  return (
    <Form
      values={values}
      user={user}
      post={post}
      comment={comment}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

const useSelectOptions = (
  key: AllKeys,
  parentId: number | null
): SelectValues => {
  const { data, error } = useSWR<AllResponses>(calcKey(key, parentId), () =>
    fetcher(URLS[key](parentId))
  );

  return {
    values: data ? selectCasted(key, data) : null,
    isLoading: !data,
    isError: !!error,
  };
};

const calcKey = (key: AllKeys, parentId: number | null) =>
  !isNull(parentId) ? `${key}/${parentId}` : null;
const isNull = (value: unknown) => value === null;
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const selectCasted = (key: AllKeys, data: AllResponses): OptionValue[] => {
  switch (key) {
    case "user":
      return SELECT.user(data as User[]);
    case "post":
      return SELECT.post(data as Post[]);
    case "comment":
      return SELECT.comment(data as Comment[]);
  }
};

export default SWR;
