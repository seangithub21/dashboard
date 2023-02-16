import { Button as MuiButton } from "@mui/material";
import MuiLoadingButton from "@mui/lab/LoadingButton";

const Button = ({ sx, ...props }) => {
  return <MuiButton variant="contained" sx={sx} {...props} />;
};

export const LoadingButton = ({ sx, loading, ...props }) => {
  return (
    <MuiLoadingButton
      loading={loading}
      variant="contained"
      sx={sx}
      {...props}
    />
  );
};

export default Button;
