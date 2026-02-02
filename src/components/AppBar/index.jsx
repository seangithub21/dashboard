import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { ColorModeContext } from "core/App";

import getStyles from "./styles";

const AppBar = ({ drawerOpen, setDrawerOpen }) => {
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const classes = getStyles({ drawerOpen, theme });
  const { toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleDrawer = () => {
    setDrawerOpen((state) => !state);
  };

  const handleClickLogo = () => {
    navigate("/", { replace: true });
  };

  return (
    <MuiAppBar position="fixed" sx={classes.appBar}>
      <Toolbar sx={classes.toolBar}>
        <MenuIcon onClick={handleDrawer} sx={classes.menuButton} />
        {isTablet && (
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={classes.logo} onClick={handleClickLogo}>
              Stock Logo
            </Typography>
            <Typography sx={classes.createdBy}>©2023 - 2026 Fam. UA</Typography>
          </Box>
        )}
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
