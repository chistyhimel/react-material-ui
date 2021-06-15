import React, { useEffect, useState } from "react";
import ToolBar from "@material-ui/core/ToolBar";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  useScrollTrigger,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "8em",

    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "#FFFF",
    borderRadius: "0",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "#FFFF",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    opacity: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Services",
      link: "/services",
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "simple-menu" : undefined,
      mouseOver: (event) => handleClick(event),
    },
    { name: "The Revolution", link: "/revolution", activeIndex: 2 },
    { name: "About", link: "/about", activeIndex: 3 },
    { name: "Contact Us", link: "/contact", activeIndex: 4 },
  ];

  const menuData = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Custom Software",
      link: "custom-software",
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: "Web Application",
      link: "web-application",
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: "Mobile Application",
      link: "mobile-application",
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  useEffect(() => {
    [...menuData, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuData, routes, selectedIndex]);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <ToolBar disableGutters>
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>

            {matches ? (
              <>
                <SwipeableDrawer
                  disableBackdropTransition={!iOS}
                  disableDiscovery={iOS}
                  open={openDrawer}
                  onClose={() => {
                    setOpenDrawer(false);
                  }}
                  onOpen={() => setOpenDrawer(true)}
                  classes={{ paper: classes.drawer }}
                >
                  <List>
                    <ListItem
                      onClick={() => {
                        setOpenDrawer(false);
                        setValue(0);
                      }}
                      divider
                      button
                      component={Link}
                      to="/"
                      selected={value === 0}
                    >
                      <ListItemText
                        disableTypography
                        className={
                          value === 0
                            ? [classes.drawerItem, classes.drawerItemSelected]
                            : [classes.drawerItem]
                        }
                      >
                        Home
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      onClick={() => {
                        setOpenDrawer(false);
                        setValue(1);
                      }}
                      divider
                      button
                      component={Link}
                      to="/services"
                      selected={value === 1}
                    >
                      <ListItemText
                        disableTypography
                        className={
                          value === 1
                            ? [classes.drawerItem, classes.drawerItemSelected]
                            : [classes.drawerItem]
                        }
                      >
                        Services
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      onClick={() => {
                        setOpenDrawer(false);
                        setValue(2);
                      }}
                      divider
                      button
                      component={Link}
                      to="/revolution"
                      selected={value === 2}
                    >
                      <ListItemText
                        disableTypography
                        className={
                          value === 2
                            ? [classes.drawerItem, classes.drawerItemSelected]
                            : [classes.drawerItem]
                        }
                      >
                        The Revolution
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      onClick={() => {
                        setOpenDrawer(false);
                        setValue(3);
                      }}
                      divider
                      button
                      component={Link}
                      to="/about"
                      selected={value === 3}
                    >
                      <ListItemText
                        disableTypography
                        className={
                          value === 3
                            ? [classes.drawerItem, classes.drawerItemSelected]
                            : [classes.drawerItem]
                        }
                      >
                        About
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      onClick={() => {
                        setOpenDrawer(false);
                        setValue(4);
                      }}
                      divider
                      button
                      component={Link}
                      to="/contact"
                      selected={value === 4}
                    >
                      <ListItemText
                        disableTypography
                        className={
                          value === 4
                            ? [classes.drawerItem, classes.drawerItemSelected]
                            : [classes.drawerItem]
                        }
                      >
                        Contact
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      onClick={() => {
                        setOpenDrawer(false);
                        setValue(5);
                      }}
                      divider
                      button
                      component={Link}
                      to="/estimate"
                      selected={value === 5}
                      className={classes.drawerItemEstimate}
                    >
                      <ListItemText
                        disableTypography
                        className={
                          value === 5
                            ? [classes.drawerItem, classes.drawerItemSelected]
                            : [classes.drawerItem]
                        }
                      >
                        Free Estimate
                      </ListItemText>
                    </ListItem>
                  </List>
                </SwipeableDrawer>
                <IconButton
                  className={classes.drawerIconContainer}
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <MenuIcon className={classes.drawerIcon} />
                </IconButton>
              </>
            ) : (
              <>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  className={classes.tabContainer}
                >
                  {routes.map((route, index) => (
                    <Tab
                      key={index}
                      className={classes.tab}
                      component={Link}
                      to={route.link}
                      label={route.name}
                      aria-owns={route.ariaOwns}
                      aria-haspopup={route.ariaPopup}
                      onMouseOver={route.mouseOver}
                    />
                  ))}
                </Tabs>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  component={Link}
                  to="/estimate"
                >
                  Free Estimate
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                  classes={{ paper: classes.menu }}
                  elevation={0}
                >
                  {menuData.map((option, index) => (
                    <MenuItem
                      component={Link}
                      to={option.link}
                      key={index}
                      classes={{ root: classes.menuItem }}
                      onClick={(event) => {
                        handleMenuItemClick(event, index);
                        setValue(1);
                        handleClose();
                      }}
                      selected={index === selectedIndex && value === 1}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}

export default Header;
