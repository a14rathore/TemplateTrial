import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import style from "./Drawer.module.css";
import mainLogo from "../../assets/Image/home/mainLogo.svg";
import Home from "../../assets/Image/home/Home.png";
import add from "../../assets/Image/home/add.png";
import Search from "../../assets/Image/home/search.png";
import Lists from "../../assets/Image/home/checklist.png";
import My_Task from "../../assets/Image/home/myTask.png";
import Alerts from "../../assets/Image/home/alert.png";
import QR from "../../assets/Image/home/qr.png";
import profile from "../../assets/Image/home/profile.svg";
import logoutLine from "../../assets/Image/home/logout-line.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Dispatcher } from "../../Redux/Dispatcher";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 12px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 12px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function TemporaryDrawer({
  toggleDrawer,
  setToggleDrawer,
  toggleDrawerMobile,
  setToggleDrawerMobile,
}) {
  const Navigate = useNavigate();
  const OnSideButtonClick = (Text) => {
    switch (Text) {
      case "Home":
        return Navigate("/");
      case "Add":
        return Navigate("/registration");
      case "Search":
        return Navigate("/searchform");
      case "List":
        return Navigate("/list");
      case "My Task":
        return console.log("My Task");
      case "Alerts":
        return console.log("Alerts");
      case "QR":
        return console.log("QR");
      case "Profile":
        return Navigate("/profile");

      default:
        return console.log(Text);
    }
  };

  const sideButtons = [
    {
      src: Home,
      text: "Home",
    },
    {
      src: add,
      text: "Add",
    },
    {
      src: Search,
      text: "Search",
    },
    {
      src: Lists,
      text: "List",
    },
    {
      src: My_Task,
      text: "My Task",
    },
    {
      src: Alerts,
      text: "Alerts",
    },
    {
      src: QR,
      text: "QR",
    },
    {
      src: profile,
      text: "Profile",
    },
  ];

  const list = () => (
    <Box sx={{ width: 250, height: "100%" }} role="presentation">
      <List>
        {sideButtons.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => OnSideButtonClick(item.text)}
            sx={{ "&:hover": { bgcolor: "#163d64" }, margin: "2px 1px" }}
          >
            <ListItemButton>
              <ListItemIcon>
                {
                  <img
                    src={item.src}
                    alt="icn"
                    width={"40px"}
                    height={"40px"}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: 5,
                      borderRadius: 8,
                    }}
                  />
                }
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ marginLeft: "16px", color: "#ffffff" }}
                primaryTypographyProps={{ fontSize: 20 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ position: "absolute", bottom: 20, left: 10 }}>
        {toggleDrawer && (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f4f9fd",
              color: "#3990c0",
              fontWeight: 700,
              "&:hover": { bgcolor: "red", color: "#fff" },
            }}
            onClick={() => {
              Dispatcher.logout();
              Navigate("/");
            }}
          >
            {/* <img
              src={logoutLine}
              alt="logout"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "white",
                marginRight: 5,
              }}
            /> */}
            LOG-OUT
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <div className={style.respoDrawer1}>
        <MuiDrawer
          anchor={"left"}
          open={toggleDrawerMobile}
          onClose={() => setToggleDrawerMobile(!toggleDrawerMobile)}
          PaperProps={{
            sx: {
              bgcolor: "#2d6eae",
            },
          }}
        >
          <div className={style.logoDiv}>
            <div className={style.logoContainer}>
              <img src={mainLogo} alt=" " />
            </div>
          </div>
          {list()}
        </MuiDrawer>
      </div>
      <div className={style.respoDrawer2}>
        <Drawer
          anchor={"left"}
          open={toggleDrawer}
          variant="permanent"
          onClose={() => setToggleDrawer(!toggleDrawer)}
          PaperProps={{
            sx: {
              bgcolor: "#2d6eae",
            },
          }}
        >
          <div className={style.logoDiv}>
            <div className={style.logoContainer}>
              <img src={mainLogo} alt=" " />
            </div>
            <h3 style={{ textAlign: "center", color: "#FFF" }}>Falcon</h3>
          </div>
          <Divider sx={{ bgcolor: "#FFF" }} />
          {list()}
        </Drawer>
      </div>
    </>
  );
}
