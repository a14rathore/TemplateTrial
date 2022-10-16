import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Dashboard/dashboard.module.css";
import style1 from "./ServiceBoard.module.css";
import { Grid, IconButton } from "@mui/material";
import Cards from "../Dashboard/component/Cards";
import add from "../../../assets/Image/home/add.png";
import Search from "../../../assets/Image/home/search.png";
import List from "../../../assets/Image/home/checklist.png";
import My_Task from "../../../assets/Image/home/myTask.png";
import Alerts from "../../../assets/Image/home/alert.png";
import goBack from "../../../assets/Image/home/goBack.svg";
import lgbg from "../../../assets/Image/loginBackGround.jpg";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Dispatcher } from "../../../Redux/Dispatcher";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/AppLoader";

function ServiceBoard() {
  const Navigate = useNavigate();
  const data = useSelector((state) => state.token);
  const { id, CompairSchema } = useSelector((state) =>
    state?.app?.listCardDetail ? state?.app?.listCardDetail : ""
  );

  console.log(CompairSchema);

  const [serviceData, setServiceData] = useState();

  const [loading, setLoading] = useState(false);
  const [personData, setPersonData] = useState({});

  const fetchPersonData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${data?.token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://infohubinnovations.com/moon/api/trackedEntityInstances/${id}.json`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          Dispatcher.logout();
          Navigate("/");
        }
      })
      .then((result) => {
        const PersonData = JSON.parse(result);
        setPersonData(PersonData);
        setLoading(false);
      })
      .catch((error) => {
        // Dispatcher.logout();
        // Navigate("/");
        console.log("error", error);
        setLoading(false);
      });
  };

  const getServicesData = () => {
    const data = JSON.parse(localStorage.getItem("metaData"));
    const parsedData = JSON.parse(data);
    const dataArray = parsedData.programs[0].programStages;
    setServiceData(dataArray);
  };

  const carditems = serviceData?.map((cardObj) => {
    return {
      src: add,
      text: cardObj?.name,
      id: cardObj?.id,
      subtext: "",
    };
  });

  const OnCardClick = (Text, id) => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 10 ? `0${today.getDate()}` : today.getDate());
    console.log(date);
    Dispatcher.SetServicePageId({ id: id, name: Text, date: date });
    Navigate("/services/serviceform");
  };

  useEffect(() => {
    getServicesData();
    fetchPersonData();
  }, []);

  return (
    <div className={style1.P_con_service}>
      {loading && <Loader />}
      <div className={style1.mainContainer}>
        {/* <IconButton
          sx={{ height: "fit-content" }}
          aria-label="delete"
          size="small"
          onClick={() => Navigate(-1)}
        >
          <KeyboardBackspaceIcon />
        </IconButton> */}
        <div className={style1.con1}>
          <div className={style1.profile}>
            <img src={lgbg} alt="profile" className={style1.p_img} />
            <h1>Name</h1>
            <h3>Role</h3>
          </div>
          <div className={style1.card}>
            <div className={style1.subcardcontainer}>
              {personData.attributes?.map((val, i) => (
                <div key={i} className={style1.cardDetails}>
                  {CompairSchema[val.attribute] && (
                    <>
                      <div className={style1.cardDetailsCon1}>
                        <h4>{CompairSchema[val.attribute]?.name}:</h4>
                      </div>
                      <div className={style1.cardDetailsCon2}>
                        <h4>
                          {CompairSchema[val.attribute]?.options
                            ? CompairSchema[val.attribute]?.options[val.value]
                            : val.value}
                        </h4>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={style1.card}>
            {personData.attributes?.map((val, i) => (
              <div key={i} className={style1.cardDetails}>
                {CompairSchema[val.attribute] && (
                  <>
                    <div className={style1.cardDetailsCon1}>
                      <h4>{CompairSchema[val.attribute]?.name}:</h4>
                    </div>
                    <div className={style1.cardDetailsCon2}>
                      <h4>
                        {CompairSchema[val.attribute]?.options
                          ? CompairSchema[val.attribute]?.options[val.value]
                          : val.value}
                      </h4>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={style1.con2}>
          <Grid
            container
            justifyContent="space-evenly"
            textAlign="center"
            alignItems="center"
            rowSpacing={4}
            columnSpacing={2}
          >
            {carditems?.map((val, index) => (
              <Grid item key={index}>
                <Cards
                  count={val.count}
                  src={val.src}
                  text={val.text}
                  id={val.id}
                  subtext={val.subtext}
                  OnCardClick={OnCardClick}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ServiceBoard;
