import React from "react";
import {
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

import DrawerHeader from "./DrawerHeader";

import getStyles from "./styles";

const sideBarMenuList = [
  { title: "Stock", icon: <PriceCheckIcon /> },
  { title: "Second stock", icon: <PriceCheckIcon /> },
];

const Drawer = ({ open }) => {
  const classes = getStyles({ open });

  return (
    <MuiDrawer variant="permanent" open={open} sx={classes.drawer}>
      <DrawerHeader />
      <List>
        {sideBarMenuList.map((menuItem, index) => (
          <ListItem
            key={menuItem.title}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              selected={false}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&.Mui-selected": {
                  backgroundColor: "red",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                primary={menuItem.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
