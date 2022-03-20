import React from "react";
import { OptionValue } from "../types";

type Props = {
  values: OptionValue[] | null;
};

const Options: React.FC<Props> = (props) => {
  const { values } = props;
  return (
    <>
      <option style={{ display: "none" }} value=""></option>
      {displayOptions(values)}
    </>
  );
};

const displayOptions = (values: Props["values"]) => {
  if (!values) return null;
  return values.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ));
};

export default Options;
