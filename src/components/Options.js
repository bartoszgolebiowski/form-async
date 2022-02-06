import React from "react";

const displayOptions = (values) => {
  if (!values) return null;
  return values.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ));
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

export default Options;
