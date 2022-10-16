import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./List.module.css";
import noPhoto from "../../../assets/Image/home/nophoto.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import SearchBar from "./Components/SearchBar";
import Loader from "../../../components/Loader/AppLoader";
import { useNavigate } from "react-router-dom";
import { Dispatcher } from "../../../Redux/Dispatcher";

function List() {
  const Navigate = useNavigate();
  const data = useSelector((state) => state.token);

  const [isloading, setIsloading] = useState(false);
  const [list, setList] = useState();
  const [searchParams, setSearchPramas] = useState("");
  const [CompairSchema, setCompairSchema] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getListData = () => {
    setIsloading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${data?.token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://infohubinnovations.com/moon/api/trackedEntityInstances?${searchParams}order=created:desc&page=1&pageSize=15&ou=MCrWZK2eoi5&ouMode=SELECTED&program=EFCWA9HTiPi&fields=trackedEntityInstance,attributes[attribute,value]\n`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          // Dispatcher.logout();
          // Navigate("/");
        }
      })
      .then((result) => {
        const list = JSON.parse(result);
        setList(list?.trackedEntityInstances);
        setIsloading(false);
      })
      .catch((error) => {
        Dispatcher.logout();
        Navigate("/");
        console.log("error", error);
      });
  };

  const getMetaData = () => {
    const data = JSON.parse(localStorage.getItem("metaData"));
    const parsedData = JSON.parse(data);
    const dataArray = parsedData.programs[0].programTrackedEntityAttributes;

    const trackedEntityAttribute = dataArray
      .filter((item) => item.displayInList === true)
      .map((item) => item?.trackedEntityAttribute);
    getSchema(trackedEntityAttribute);
  };

  const getSchema = (meta) => {
    let MainObj = {};
    let optionvalue = {};
    meta?.map((item) => {
      item?.optionSet?.options.map((val) => {
        optionvalue[val.code] = val.name;
      });
      MainObj[item.id] = {
        name: item.name,
        ...(item?.optionSet && { options: optionvalue }),
      };
      optionvalue = {};
    });

    setCompairSchema(MainObj);
  };

  function handleViewMore(item) {
    Dispatcher.SetListCardId({
      id: item?.trackedEntityInstance,
      CompairSchema: CompairSchema,
    });
    Navigate("/services");
  }

  useEffect(() => {
    getMetaData();
  }, []);

  useEffect(() => {
    getListData();
  }, [searchParams]);

  return (
    <div className={styles.mainConatainer}>
      {(!list || isloading) && <Loader />}
      <div className={styles.Filter_Bar}>
        <SearchBar setSearchPramas={setSearchPramas} />
      </div>

      <div className={styles.listContainer}>
        {list?.map((item, index) => (
          <div key={index} className={styles.ListCard}>
            <div>
              <div className={styles.cardHeader}>
                <img src={noPhoto} alt="icon" />
                <div className={styles.HeaderText}>
                  <h2>Person</h2>
                  <h5>description</h5>
                </div>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.32))",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                </Menu>
              </div>
              <Divider />
              {item?.attributes?.map((val, i) => (
                <div key={i} className={styles.cardDetails}>
                  {CompairSchema[val.attribute] && (
                    <>
                      <h4>{CompairSchema[val.attribute]?.name}:</h4>
                      <h4>
                        {CompairSchema[val.attribute]?.options
                          ? CompairSchema[val.attribute]?.options[val.value]
                          : val.value}
                      </h4>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.cardfooter}>
              <Divider />
              <Button onClick={() => handleViewMore(item)}>
                <h4>VIEW MORE</h4>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
