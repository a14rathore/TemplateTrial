import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import add from "../../assets/Image/home/add.png";
import Lists from "../../assets/Image/home/checklist.png";
import My_Task from "../../assets/Image/home/myTask.png";
import Alerts from "../../assets/Image/home/alert.png";

const BottomNavigationbar = ({ toggleDrawer }) => {
  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        "@media screen and (min-width: 768px)": {
          transition: "all 0.32s",
          display: "none",
        },
        "@media screen and (max-width: 768px)": {
          display: "block",
        },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          bgcolor: "#ffffff",
          padding: 6,
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(event, newValue);
        }}
      >
        <BottomNavigationAction
          label="Add"
          icon={
            <img
              src={add}
              style={{ padding: "5px" }}
              width={"50px"}
              height={"50px"}
            />
          }
        />
        <BottomNavigationAction
          label="Lists"
          icon={
            <img
              src={Lists}
              style={{ padding: "5px" }}
              width={"50px"}
              height={"50px"}
            />
          }
        />
        <BottomNavigationAction
          label="My Task"
          icon={
            <img
              src={My_Task}
              style={{ padding: "5px" }}
              width={"50px"}
              height={"50px"}
            />
          }
        />
        <BottomNavigationAction
          label="Alerts"
          icon={
            <img
              src={Alerts}
              style={{ padding: "5px" }}
              width={"50px"}
              height={"50px"}
            />
          }
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationbar;
