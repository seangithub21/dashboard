const theme = {
  palette: {
    primary: {
      main: "#F2709C",
      contrastText: "#fff",
      hover: "#a34968",
      background: "#f9f9f9",
    },
    marketOpen: "#00873c",
    marketClosed: "#fc0303",
    priceRise: "#00873c",
    priceFall: "#fc0303",
  },
  typography: {
    fontFamily: [
      "UbuntuRegular",
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
      fontSize: "1.6rem",
    },
    body2: {
      fontSize: "1.2rem",
    },
    caption: {
      fontSize: "1rem !important",
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
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: ".8rem",
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: ".8rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: ".3rem",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "0",
          marginTop: "0",
        },
      },
    },
  },
};

export const darkMode = {
  palette: {
    ...theme.palette,
    primary: { main: theme.palette.primary.main },
    background: {
      default: "#07071c",
      paper: "#08091f",
    },
  },
};

export const mobile = {
  typography: {
    ...theme.typography,
  },
};

export default theme;
