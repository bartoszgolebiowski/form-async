import React from "react";
import useSWR from "swr";
import { initialValues, SELECT, URLS, CLEAR, RawResponse } from "../constants";
import Form from "./Form";

const useSelectValuesSWR = (
  key: "post" | "comment" | "user",
  parentId: number | null
) => {
  const { data, error } = useSWR(calcKey(key, parentId), () =>
    fetcher(URLS[key](parentId))
  );

  if (key === "user") {
    const castedResponse: RawResponse<typeof key> = data;
    return {
      values: castedResponse ? SELECT[key](castedResponse) : null,
      isLoading: !data,
      isError: !!error,
    } as const;
  } else if (key === "post") {
    const castedResponse: RawResponse<typeof key> = data;
    return {
      values: castedResponse ? SELECT[key](castedResponse) : null,
      isLoading: !data,
      isError: !!error,
    } as const;
  } else {
    const castedResponse: RawResponse<typeof key> = data;
    return {
      values: castedResponse ? SELECT[key](castedResponse) : null,
      isLoading: !data,
      isError: !!error,
    } as const;
  }
};

const calcKey = (key: "post" | "comment" | "user", parentId: number | null) =>
  !isNull(parentId) ? `${key}/${parentId}` : null;
const isNull = (value: unknown) => value === null;
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SWR = () => {
  const [values, setValues] = React.useState(initialValues);

  const user = useSelectValuesSWR("user", -1);
  const post = useSelectValuesSWR("post", values.user);
  const comment = useSelectValuesSWR("comment", values.post);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(values));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as "user" | "post" | "comment";

    setValues({
      ...values,
      [name]: e.target.value,
      ...CLEAR[name],
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
