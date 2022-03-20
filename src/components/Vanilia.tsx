import React from "react";
import {
  initialValues,
  SELECT,
  URLS,
  CLEAR,
  OptionValue,
  RawResponse,
  SelectValues,
} from "../constants";
import Form from "./Form";

const useSelectValues = (
  key: "post" | "comment" | "user",
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
        if (key === "user") {
          const castedResponse: RawResponse<typeof key> = data;
          setValues(SELECT[key](castedResponse));
        }
        if (key === "post") {
          const castedResponse: RawResponse<typeof key> = data;
          setValues(SELECT[key](castedResponse));
        }
        if (key === "comment") {
          const castedResponse: RawResponse<typeof key> = data;
          setValues(SELECT[key](castedResponse));
        }
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

const Vanilia = () => {
  const [values, setValues] = React.useState(initialValues);

  const user = useSelectValues("user", -1);
  const post = useSelectValues("post", values.user);
  const comment = useSelectValues("comment", values.post);

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
  } as const;

  return <Form {...props} />;
};

export default Vanilia;
