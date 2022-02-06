import React from "react";
import useSWR from "swr";
import { initialValues, SELECT, URLS, CLEAR } from "../constants";
import Form from "./Form";

const useSelectValuesSWR = (key, parentId) => {
  const { data, error } = useSWR(calcKey(key, parentId), () =>
    fetcher(URLS[key](parentId))
  );

  return {
    values: data ? SELECT[key](data) : null,
    isLoading: !data,
    isError: !!error,
  };
};

const calcKey = (key, parentId) =>
  !isNull(parentId) ? `${key}/${parentId}` : null;
const isNull = (value) => value === null;
const fetcher = (url) => fetch(url).then((r) => r.json());

const SWR = () => {
  const [values, setValues] = React.useState(initialValues);

  const user = useSelectValuesSWR("user");
  const post = useSelectValuesSWR("post", values.user);
  const comment = useSelectValuesSWR("comment", values.post);

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

  const props = {
    values,
    user,
    post,
    comment,
    handleChange,
    handleSubmit,
  };

  return <Form {...props} />;
};

export default SWR;
