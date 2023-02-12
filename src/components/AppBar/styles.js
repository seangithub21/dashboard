const getStyles = ({ drawerOpen, theme }) => ({
  appBar: {
    borderRadius: "0rem 0rem .8rem .8rem",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(drawerOpen && {
      marginLeft: "24rem",
      width: `calc(100% - 24rem)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
  toolBar: { justifyContent: "space-between" },
  menuButton: {
    cursor: "pointer",
    fontSize: "3rem",
  },
  switchTheme: { fontSize: "2rem" },
  signOutButton: { fontSize: "2rem" },
});

export default getStyles;
