import { Box } from "@mui/material";

const InfoContainer = ({ children, sx }) => {
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
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default InfoContainer;
