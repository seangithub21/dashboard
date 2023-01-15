import { useState } from "react";
import { Box } from "@mui/material";

import AppBar from "components/AppBar";
import Drawer from "components/Drawer";

import getStyles from "./styles";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = getStyles({ open: drawerOpen });

  return (
    <Box sx={classes.container}>
      <AppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Drawer open={drawerOpen} />
      <Box sx={classes.content}>{children}</Box>
    </Box>
  );
};

export default Layout;
