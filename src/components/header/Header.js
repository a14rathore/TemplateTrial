import React from "react";
import style from "./header.module.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Dispatcher } from "../../Redux/Dispatcher";
import { useSelector } from "react-redux";

const iconstyle = {
  color: "#2d6eae",
  borderRight: "1px solid #2d6eae",
  borderRadius: 0,
  "@media screen and (max-width: 767px)": {
    display: "none",
  },
};
const iconstyleMobile = {
  color: "#2d6eae",
  borderRight: "1px solid #2d6eae",
  borderRadius: 0,
  "@media screen and (min-width: 767px)": {
    display: "none",
  },
};
const belliconstyle = {
  color: "#2d6eae",
};

const Header = ({
  heading = "Dashboard",
  toggleDrawer,
  setToggleDrawer,
  toggleDrawerMobile,
  setToggleDrawerMobile,
}) => {
  const Navigate = useNavigate();

  const user = useSelector((state) => state.app.user);

  const handleLogout = () => {
    Dispatcher.logout();
    Navigate("/");
  };

  return (
    <div className={style.HeadermainContainer}>
      <nav className={style.navbar}>
        <ul>
          <li>
            <IconButton
              sx={iconstyle}
              aria-label="Menu"
              disableRipple
              onClick={() => setToggleDrawer(!toggleDrawer)}
            >
              {toggleDrawer && <ArrowLeftIcon fontSize="large" />}
              <MenuIcon fontSize="large" />
              {!toggleDrawer && <ArrowRightIcon fontSize="large" />}
            </IconButton>
            <IconButton
              sx={iconstyleMobile}
              aria-label="Menu"
              onClick={() => setToggleDrawerMobile(!toggleDrawerMobile)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </li>

          <li>
            <div className={style.heading}>Welcome {user?.firstName}</div>
            <IconButton sx={belliconstyle} aria-label="Bell">
              <NotificationsIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                mr: "8px",
                "&:hover": { bgcolor: "white" },
              }}
              color="secondary"
              onClick={handleLogout}
            >
              <PowerSettingsNewIcon sx={{ color: "#2d6eae" }} />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
