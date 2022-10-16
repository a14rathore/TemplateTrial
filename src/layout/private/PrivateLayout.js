import React from "react";
import style from "./private.module.css";
import BottomNavigationbar from "../../components/bottomNavigationbar/BottomNavigationbar";
import TemporaryDrawer from "../../components/Drawer/Drawer";
import Header from "../../components/header/Header";

const PrivateLayout = (props) => {
  const [toggleDrawer, setToggleDrawer] = React.useState(true);
  const [toggleDrawerMobile, setToggleDrawerMobile] = React.useState(false);
  console.log("P");
  return (
    <div className={style.MainRoot}>
      <TemporaryDrawer
        toggleDrawer={toggleDrawer}
        setToggleDrawer={setToggleDrawer}
        toggleDrawerMobile={toggleDrawerMobile}
        setToggleDrawerMobile={setToggleDrawerMobile}
      />
      <div
        className={
          toggleDrawer
            ? style.repsonsiveness_content1
            : style.repsonsiveness_content2
        }
      >
        <Header
          toggleDrawer={toggleDrawer}
          setToggleDrawer={setToggleDrawer}
          toggleDrawerMobile={toggleDrawerMobile}
          setToggleDrawerMobile={setToggleDrawerMobile}
        />
        <div className={style.MainContainer}>{props.component}</div>
        <BottomNavigationbar toggleDrawer={toggleDrawer} />
      </div>
    </div>
  );
};

export default PrivateLayout;
