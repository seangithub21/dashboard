import { Autocomplete, Box } from "@mui/material";

import Input from "../Input";

const FormAutocomplete = ({
  options,
  form: { setFieldValue },
  field: { name },
  meta: { touched, error },
  disabled,
  label,
  sx,
  ...props
}) => {
  return (
    <Autocomplete
      onChange={(event, newValue) => {
        setFieldValue(name, newValue.symbol);
      }}
      sx={{ width: 300, ...sx }}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.symbol}
      renderOption={(props, option) => <Box {...props}>{option.symbol}</Box>}
      renderInput={(params) => (
        <Input
          {...params}
          label={label}
          helperText={error}
          error={!!error}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          size="small"
        />
      )}
      disabled={disabled}
    />
  );
};

export default FormAutocomplete;
