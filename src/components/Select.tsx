import React from "react";

const loading = {
  opacity: 0.5,
};

const error = {
  border: "1px solid red",
  opacity: 0.5,
};

type Props = React.ComponentProps<"select"> & {
  label: string;
  isLoading: boolean;
  isError: boolean;
};

const Select: React.FC<Props> = (props) => {
  const { label, isLoading, isError, value, ...rest } = props;
  const style = isLoading ? loading : isError ? error : undefined;

  return (
    <p>
      <label>
        {label}
        <select {...rest} value={value ?? ""} style={style} />
      </label>
    </p>
  );
};

export default Select;
