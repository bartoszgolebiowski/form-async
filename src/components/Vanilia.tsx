import React from "react";
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

const useSelectOptions = (
  key: AllKeys,
  parentId: number | null
): SelectValues => {
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [values, setValues] = React.useState<OptionValue[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(URLS[key](parentId));
        const data = await response.json();
        setValues(selectCasted(key, data));
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

const Vanilia = () => {
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

export default Vanilia;
