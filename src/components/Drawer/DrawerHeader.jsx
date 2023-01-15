import { Box } from "@mui/material";

import getStyles from "./styles";

const DrawerHeader = () => {
  const classes = getStyles();

  return <Box sx={classes.drawerHeader}>Logo</Box>;
};

export default DrawerHeader;
