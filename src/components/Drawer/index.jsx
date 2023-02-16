import React from "react";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useLocation, useNavigate } from "react-router-dom";

import { privatePaths } from "configs/routePaths";
import DrawerHeader from "./DrawerHeader";
import CryptoIcon from "assets/svg/CryptoIcon";

import getStyles from "./styles";

const sideBarMenuList = [
  {
    title: "Stocks",
    icon: <PriceCheckIcon />,
    path: privatePaths.stocks,
  },
  {
    title: "Crypto",
    icon: <CryptoIcon />,
    path: privatePaths.crypto,
  },
  {
    title: "Currency Converter",
    icon: <CurrencyExchangeIcon />,
    path: privatePaths.currencyConverter,
  },
];

const Drawer = ({ open }) => {
  const theme = useTheme();
  const classes = getStyles({ open, theme });
  const navigate = useNavigate();
  const location = useLocation();

  const isMenuItemActive = (menuItem) =>
    location.pathname.includes(menuItem.path);

  const handleMenuItemClick = (menuItem) => {
    navigate(menuItem.path, { replace: true });
  };

  const handleClickLogo = () => {
    navigate("/", { replace: true });
  };

  return (
    <MuiDrawer variant="permanent" open={open} sx={classes.drawer}>
      <DrawerHeader>
        <Typography sx={classes.logo} onClick={handleClickLogo}>
          Stock Logo
        </Typography>
      </DrawerHeader>
      <List>
        {sideBarMenuList.map((menuItem, index) => (
          <ListItem key={menuItem.title} sx={classes.menuItem}>
            <Tooltip title={menuItem.title} placement="right">
              <ListItemButton
                disableRipple
                selected={isMenuItemActive(menuItem)}
                sx={classes.menuItemButton}
                onClick={() => handleMenuItemClick(menuItem)}
              >
                <ListItemIcon
                  sx={{
                    ...classes.menuItemIcon,
                    color: isMenuItemActive(menuItem) && "#fff",
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menuItem.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
