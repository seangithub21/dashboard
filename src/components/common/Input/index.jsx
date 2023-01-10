import { TextField } from "@mui/material";

const Input = (props) => {
  const handleChange = (e) => {
    props?.form && props.form.setFieldValue(props.field.name, e.target.value);
    props?.onChange && props.onChange(e.target.value);
  };

  return <TextField size="small" onChange={handleChange} {...props} />;
};

export default Input;
