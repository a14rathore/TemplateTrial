import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
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
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Dispatcher } from "../../Redux/Dispatcher";
import CustomizedAccordions from "./Accordian";
import AccountMenu from "./Menu";

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

  const list = () => (
    <Box sx={{ width: 250, height: "100%" }} role="presentation">
      <List>
        {sideButtons.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ "&:hover": { bgcolor: "#163d64" } }}
          >
            {toggleDrawer ? (
              <CustomizedAccordions item={item} index={index} />
            ) : (
              <AccountMenu item={item} index={index} />
            )}
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

const sideButtons = [
  {
    src: Home,
    text: "Home",
    subtitle: [
      {
        src: Home,
        title: "Admin",
        onClick: () => {
          console.log("admin");
        },
      },
      {
        src: Home,
        title: "Student",
        onClick: () => {
          console.log("Student");
        },
      },
    ],
  },
  {
    src: add,
    text: "Add",
    subtitle: [
      {
        src: Home,
        title: "Trail",
        onClick: () => {
          console.log("Trail");
        },
      },
      {
        src: Home,
        title: "add trial",
        onClick: () => {
          console.log("add Trail");
        },
      },
    ],
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
