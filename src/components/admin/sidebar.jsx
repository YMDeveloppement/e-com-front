import {useState} from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar
} from "@mui/material";

import Collapse from '@mui/material/Collapse';

import {
  MoveToInbox as InboxIcon,
  Drafts as DraftsIcon,
  Send as SendIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from '@mui/icons-material';

import {
  Dashboard,
  Inventory2,
  Category,
  ShoppingCart,
  People,
  LocalOffer,
  Settings,
  Logout,
  ChevronLeft,
  ChevronRight,
  Storefront,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

import "@/assets/css/admin/sidebar.scss";

const menuItems = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
  {
    title: "Products",
    icon: <Inventory2 />,
    path: "/admin/products",
  },
  {
    title: "Categories",
    icon: <Category />,
    path: "/categories",
  },
  {
    title: "Orders",
    icon: <ShoppingCart />,
    path: "/orders",
  },
  {
    title: "Customers",
    icon: <People />,
    path: "/customers",
  },
  {
    title: "Coupons",
    icon: <LocalOffer />,
    path: "/coupons",
  },
];

const bottomItems = [
  {
    title: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
  {
    title: "Logout",
    icon: <Logout />,
    path: "/logout",
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {

  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };
  
  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${collapsed ? "collapsed" : ""
        }`}
    >
      <Toolbar className="sidebar-header">
        {!collapsed && (
          <Box className="sidebar-logo">
            <Box className="logo-icon">
              <Storefront />
            </Box>

            <Box>
              <Typography className="logo-title">
                ShopAdmin
              </Typography>

              <Typography className="logo-subtitle">
                E-commerce
              </Typography>
            </Box>
          </Box>
        )}

        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-btn"
        >
          {collapsed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )}
        </IconButton>
      </Toolbar>

      <Box className="sidebar-content">
        <List className="menu-list">
          {menuItems.map((item) => (
            <Tooltip
              title={collapsed ? item.title : ""}
              placement="right"
              key={item.title}
            >
              <ListItemButton
                component={NavLink}
                to={item.path}
                className="menu-item"
              >
                <ListItemIcon sx={{ color: "white !important" }}>
                  {item.icon}
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText classes={{ primary: "menu-text" }} primary={item.title} />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
          <ListItemButton onClick={() => handleToggle("inbox1")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>

            <ListItemText primary="Inbox 1" />

            {openMenu === "inbox1" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse
            in={openMenu === "inbox1"}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>

                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Inbox 2 */}
          <ListItemButton onClick={() => handleToggle("inbox2")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>

            <ListItemText primary="Inbox 2" />

            {openMenu === "inbox2" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse
            in={openMenu === "inbox2"}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>

                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        <Box>
          {!collapsed && (
            <Box className="user-box">
              <Avatar className="user-avatar">
                Y
              </Avatar>

              <Box>
                <Typography className="user-name">
                  Yassine
                </Typography>

                <Typography className="user-role">
                  Administrator
                </Typography>
              </Box>
            </Box>
          )}

          <List className="menu-list">
            {bottomItems.map((item) => (
              <ListItemButton
                component={NavLink}
                to={item.path}
                className="menu-item"
                key={item.title}
              >
                <ListItemIcon className="menu-icon">
                  {item.icon}
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText primary={item.title} />
                )}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}