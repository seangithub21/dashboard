const getStyles = ({ drawerOpen, theme }) => ({
  appBar: {
    borderRadius: "0rem 0rem .8rem .8rem",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      ...(drawerOpen && {
        marginLeft: "24rem",
        width: `calc(100% - 24rem)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    },
  },
  toolBar: { justifyContent: "space-between" },
  menuButton: {
    cursor: "pointer",
    fontSize: "3rem",
  },
  logo: {
    fontWeight: "700",
    cursor: "pointer",
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
    fontSize: "1.8rem",
  },
  createdBy: {
    fontSize: "1.4rem",
    fontFamily: `${theme.typography.fontFamily}`,
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.contrastText
        : theme.palette.grey[400],
  },
  switchTheme: { fontSize: "2rem" },
  signOutButton: { fontSize: "2rem" },
});

export default getStyles;
