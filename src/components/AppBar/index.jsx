import { useNavigate } from "react-router-dom";
import { AppBar as MuiAppBar, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Button from "components/common/Button";

import getStyles from "./styles";

const AppBar = ({ drawerOpen, setDrawerOpen }) => {
  const classes = getStyles({ drawerOpen });
  const navigate = useNavigate();

  const handleDrawer = () => {
    setDrawerOpen((state) => !state);
  };

  return (
    <MuiAppBar position="fixed" sx={classes.appBar}>
      <Toolbar sx={classes.toolBar}>
        <MenuIcon onClick={handleDrawer} sx={classes.menuButton} />
        <Button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          sx={classes.signOutButton}
        >
          Sign out
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
