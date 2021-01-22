import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import React, { useState, useEffect } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import useStyles from './styles';
  import ImportContactsSharpIcon from '@material-ui/icons/ImportContactsSharp';
  
  export default function Navbar1(props) {
    const classes = useStyles();
    const { header, logo, menuButton, toolbar, drawerContainer } = classes;
        //if accountInfo is not null, the user has successfully register or login
  const {accountInfo, setAccountInfo} = props;
  let headersData = [];
  if (accountInfo){
      headersData = [
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Sell",
            href: "/sell",
          },
          {
            label: "Edit My Listings",
            href: "/myListings",
          },
          {
            label: "Sign out",
            href: "/",
          }
      ]
  }else{
   headersData = [
    {
        label: "Home",
        href: "/",
      },
      {
        label: "Sell",
        href: "/login",
      },
      {
        label: "Edit My Listings",
        href: "/login",
      },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    }
  ];}
  function signOut(label){
      if (label === 'Sign out') {
        setAccountInfo(null);
        sessionStorage.clear();
      }
  }
  
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false,
    });
  
    const { mobileView, drawerOpen } = state;
  
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
    }, []);
  
    const displayDesktop = () => {
      return (
        <Toolbar className={toolbar}>
          {stuBooksLogo}
          
          <div>{accountInfo && <Typography variant='body1' display='inline'>
          Hi, {accountInfo.displayName}! </Typography>}
          {getMenuButtons()}</div>
        </Toolbar>
      );
    };
  
    const displayMobile = () => {
      const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
      const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
      return (
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>
  
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>
  
          <div>{stuBooksLogo}</div>
        </Toolbar>
      );
    };
  
    const getDrawerChoices = () => {
      return headersData.map(({ label, href }) => {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      });
    };
  
    const stuBooksLogo = (
        <div>
      <Typography variant="h6" component="h1" className={logo}>
      <RouterLink to = "/" className={logo}>
        <ImportContactsSharpIcon/>&emsp;StuBooks
        </RouterLink>
      </Typography>
      </div>
    );
  
    const getMenuButtons = () => {
      return headersData.map(({ label, href }) => {
        return (
    <Button onClick = {() => signOut(label)}
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        );
      });
    };
  
    return (
      <header>
        <AppBar className={header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    );
  }