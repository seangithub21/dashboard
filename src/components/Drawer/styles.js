import theme from "configs/theme";

const getStyles = ({ open } = {}) => ({
  drawer: {
    width: "24rem",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 4),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  logo: {
    fontWeight: "700",
    cursor: "pointer",
    color: theme.palette.primary.main,
    fontSize: "3rem",
  },
  menuItem: {
    display: "block",
    p: "0 .5rem .5rem",
  },
  menuItemButton: {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
    borderRadius: ".8rem",
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.hover,
      },
    },
  },
  menuItemIcon: {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  },
});

export const openedMixin = (theme) => ({
  width: "24rem",
  backgroundColor: theme.palette.primary.background,
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme) => ({
  backgroundColor: theme.palette.primary.background,
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export default getStyles;
