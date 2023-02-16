import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { ColorModeContext } from "core/App";

import getStyles from "./styles";

const AppBar = ({ drawerOpen, setDrawerOpen }) => {
  const theme = useTheme();
  const classes = getStyles({ drawerOpen, theme });
  const { toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleDrawer = () => {
    setDrawerOpen((state) => !state);
  };

  return (
    <MuiAppBar position="fixed" sx={classes.appBar}>
      <Toolbar sx={classes.toolBar}>
        <MenuIcon onClick={handleDrawer} sx={classes.menuButton} />
        <Box>
          <Tooltip
            title={
              theme.palette.mode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <IconButton
              onClick={() => {
                toggleColorMode();
              }}
              sx={{ mr: "1rem" }}
            >
              {theme.palette.mode === "dark" ? (
                <LightModeRoundedIcon sx={classes.switchTheme} />
              ) : (
                <DarkModeRoundedIcon sx={classes.switchTheme} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign out">
            <IconButton
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              <LogoutRoundedIcon sx={classes.signOutButton} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
