import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./dashboard.module.css";
import { Grid } from "@mui/material";
import Cards from "./component/Cards";
import add from "../../../assets/Image/home/add.png";
import Search from "../../../assets/Image/home/search.png";
import List from "../../../assets/Image/home/checklist.png";
import My_Task from "../../../assets/Image/home/myTask.png";
import Alerts from "../../../assets/Image/home/alert.png";
import QR from "../../../assets/Image/home/qr.png";
import Circular from "../../../components/CircularProgressBar/Circular";

const Dashboard = () => {
  const Navigate = useNavigate();
  const [offlineData, setOfflineData] = useState([]);

  const carditems = [
    {
      src: add,
      text: "Add",
      subtext: "Registration Form",
    },
    {
      src: Search,
      text: "Search",
      subtext: "Find Data Accordingly",
    },
    {
      src: add,
      text: "Offline Data",
      subtext: "You Can Sync This Data",
      count: offlineData.length || 0,
    },
    {
      src: List,
      text: "List",
      subtext: "List Of All Registered Data",
    },
    {
      src: My_Task,
      text: "My Task",
      subtext: "Find Your Task Here",
    },
    {
      src: Alerts,
      text: "Alerts",
      subtext: "Notification Section",
      count: "0",
    },
    {
      src: QR,
      text: "QR",
      subtext: "Find Data With QR",
    },
  ];

  const OnCardClick = (Text) => {
    switch (Text) {
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
      case "Offline Data":
        return Navigate("/offlinedata");
      default:
        return console.log(Text);
    }
  };

  useEffect(() => {
    const getofflineData = localStorage.getItem("offlineData")
      ? JSON.parse(localStorage.getItem("offlineData"))
      : [];
    setOfflineData(getofflineData);
  }, []);

  return (
    <div className={style.cardsContainer}>
      <Grid
        container
        justifyContent="space-evenly"
        textAlign="center"
        alignItems="center"
        rowSpacing={4}
        columnSpacing={2}
      >
        <Circular percent={75} subtext="Html" color="red" />
        <Circular percent={15} subtext="Population" color="#39b54a" />
        <Circular percent={25} subtext="Quantity" />
        <Circular percent={85} subtext="Stock" color="#Fafa" />
        {carditems.map((val, index) => (
          <Grid item key={index}>
            <Cards
              count={val.count}
              src={val.src}
              text={val.text}
              subtext={val.subtext}
              OnCardClick={OnCardClick}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
