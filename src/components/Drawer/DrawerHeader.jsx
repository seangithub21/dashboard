import { Box } from "@mui/material";

import getStyles from "./styles";

const DrawerHeader = ({ sx, children }) => {
  const classes = getStyles();

  return <Box sx={{ ...classes.drawerHeader, ...sx }}>{children}</Box>;
};

export default DrawerHeader;
