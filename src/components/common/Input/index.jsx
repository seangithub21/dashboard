import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = ({ helperText, isPassword, isSearch, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    props?.form && props.form.setFieldValue(props.field.name, e.target.value);
    props?.onChange && props.onChange(e.target.value);
  };

  return (
    <TextField
      size="small"
      type={isPassword ? (showPassword ? "text" : "password") : "text"}
      onChange={handleChange}
      helperText={helperText || " "}
      InputProps={{
        startAdornment: isSearch && (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: isPassword && (
          <InputAdornment position="end">
            {showPassword ? (
              <IconButton sx={{ p: ".2rem" }} onClick={handlePassword}>
                <VisibilityOffIcon />
              </IconButton>
            ) : (
              <IconButton sx={{ p: ".2rem" }} onClick={handlePassword}>
                <VisibilityIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default Input;
