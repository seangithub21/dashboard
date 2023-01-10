import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2709C",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontSize: "1.4rem",
    },
    body2: {
      fontSize: "1.2rem",
    },
    caption: {
      fontSize: "1.4rem !important",
    },
    button: {
      fontSize: "1.4rem",
      fontWeight: "600",
    },
    tooltip: {
      fontSize: "1.2rem",
    },
    h6: {
      fontSize: "2rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ".8rem",
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          borderRadius: ".8rem",
        },
      },
    },
  },
});

export default theme;
