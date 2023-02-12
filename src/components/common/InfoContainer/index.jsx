import { Box, useTheme } from "@mui/material";

const InfoContainer = ({ children, sx }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        borderRadius: ".8rem",
        padding: "1rem",
        backgroundColor: theme.palette.background.paper,
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07))",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default InfoContainer;
