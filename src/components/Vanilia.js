import React from "react";
import { initialValues, SELECT, URLS, CLEAR } from "../constants";
import Form from "./Form";

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

const Vanilia = () => {
  const [values, setValues] = React.useState(initialValues);

  const user = useSelectValues("user");
  const post = useSelectValues("post", values.user);
  const comment = useSelectValues("comment", values.post);

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

export default Vanilia;
