import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/Buttons/CustomButton";
import CustomSelect from "../../../components/FormComponents/CustomSelect";
import CustomTextFiled from "../../../components/FormComponents/CustomTextField";
import Date from "../../../components/FormComponents/Date";
import FieldLabel from "../../../components/FormComponents/FieldLabel";
import Loader from "../../../components/Loader/AppLoader";
import styles from "../RegistrationForm/registration.module.css";
import styles1 from "../List/List.module.css";
import noPhoto from "../../../assets/Image/home/nophoto.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { Dispatcher } from "../../../Redux/Dispatcher";

function SearchForm({ listing, setSearchPramas }) {
  const data = useSelector((state) => state.token);
  const Navigate = useNavigate();

  const [isloader, setIsLoader] = useState(false);
  const [formData, setFormData] = useState([]);
  const [initialValue, setIntialValue] = useState();
  const [qrshow, setQrShow] = React.useState("01");
  const [serchFormdataParam, setSearchForDataParam] = useState("");
  const [list, setList] = useState();
  const [CompairSchema, setCompairSchema] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const RadioHandleChange = (event) => {
    setQrShow(event.target.value);
  };

  const getinitialValue = (dataArray) => {
    let val = {};
    dataArray.forEach((item) => {
      val = {
        ...val,
        [item?.trackedEntityAttribute?.id]: "",
      };
    });
    setIntialValue(val);
  };

  const getmetaData = () => {
    const data = JSON.parse(localStorage.getItem("metaData"));
    const parsedData = JSON.parse(data);
    const dataArray = parsedData.programs[0].programTrackedEntityAttributes;
    setFormData(dataArray);
    getinitialValue(dataArray);

    const dataArray2 = parsedData.programs[0].programTrackedEntityAttributes;
    const trackedEntityAttribute = dataArray2
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

  const CreatePayloadSchema = (obj) => {
    const dataValues = [];
    console.log(obj);
    Object.entries(obj).map((item) => {
      item[1] !== "" &&
        dataValues.push({
          attribute: item[0],
          value: item[1],
        });
    });

    let url = "";
    dataValues.forEach((ele, i) => {
      if (i === 0) url = "filter=";
      url = url + `${ele.attribute}:like:${ele.value}&`;
    });
    setSearchPramas && setSearchPramas(url);
    !setSearchPramas && setSearchForDataParam(url);
  };

  const getListData = () => {
    setIsLoader(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${data?.token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://infohubinnovations.com/moon/api/trackedEntityInstances?${serchFormdataParam}order=created:desc&page=1&pageSize=15&ou=MCrWZK2eoi5&ouMode=SELECTED&program=EFCWA9HTiPi&fields=trackedEntityInstance,attributes[attribute,value]\n`,
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
        setIsLoader(false);
      })
      .catch((error) => {
        Dispatcher.logout();
        Navigate("/");
        console.log("error", error);
      });
  };

  useEffect(() => {
    getmetaData();
  }, []);

  useEffect(() => {
    if (serchFormdataParam) {
      getListData();
    }
  }, [serchFormdataParam]);

  return (
    <>
      {console.log(list)}
      {!formData && <Loader />}
      <div className={styles.RegsubContainer} style={listing && { margin: 0 }}>
        <div>Search From</div>
        {!listing && (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={qrshow}
              onChange={RadioHandleChange}
            >
              <FormControlLabel
                value="01"
                control={<Radio />}
                label="Search-Form"
              />
              <FormControlLabel value="02" control={<Radio />} label="QR" />
            </RadioGroup>
          </FormControl>
        )}
        <Formik
          initialValues={initialValue}
          enableReinitialize={true}
          onSubmit={(val) => {
            CreatePayloadSchema(val);
          }}
        >
          {(formik) => (
            <Form>
              {/* {console.log(formik)} */}
              <Grid container spacing={2}>
                {formData &&
                  formData?.map((item, i) => (
                    <Fragment key={i}>
                      {item.searchable &&
                        qrshow != "01" &&
                        item?.trackedEntityAttribute?.name === "QRCode" &&
                        item.valueType === "TEXT" &&
                        !item?.trackedEntityAttribute?.optionSet && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              name={item?.trackedEntityAttribute?.id}
                              placeholder={item?.trackedEntityAttribute?.name}
                              {...formik.getFieldProps(
                                `${item?.trackedEntityAttribute?.id}`
                              )}
                            />

                            {/* {formik.touched[
                              item?.trackedEntityAttribute?.id
                            ] ? (
                              <div>*required</div>
                            ) : (
                              <Box sx={{ height: 22 }}></Box>
                            )} */}
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item?.trackedEntityAttribute?.name !== "QRCode" &&
                        item.valueType === "TEXT" &&
                        !item?.trackedEntityAttribute?.optionSet && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              name={item?.trackedEntityAttribute?.id}
                              placeholder={item?.trackedEntityAttribute?.name}
                              {...formik.getFieldProps(
                                `${item?.trackedEntityAttribute?.id}`
                              )}
                            />

                            {/* {formik.touched[
                              item?.trackedEntityAttribute?.id
                            ] ? (
                              <div>*required</div>
                            ) : (
                              <Box sx={{ height: 22 }}></Box>
                            )} */}
                          </Grid>
                        )}

                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "TEXT" &&
                        item?.trackedEntityAttribute?.optionSet && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomSelect
                              name={item?.trackedEntityAttribute?.id}
                              onBlur={formik.handleBlur(
                                `${item?.trackedEntityAttribute?.id}`
                              )}
                              options={
                                item?.trackedEntityAttribute?.optionSet.options
                              }
                              value={
                                formik.values?.item?.trackedEntityAttribute?.id
                              }
                              onChange={formik.handleChange}
                            />
                            {/* {formik.touched[
                              item?.trackedEntityAttribute?.id
                            ] ? (
                              <div>*required</div>
                            ) : (
                              <Box sx={{ height: 22 }}></Box>
                            )} */}
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "AGE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "COORDINATE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "EMAIL" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "FILE_RESOURCE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "IMAGE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "ORGANISATION_UNIT" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "PHONE_NUMBER" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "INTEGER_POSITIVE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "URL" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "USERNAME" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "NUMBER" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              name={item?.trackedEntityAttribute?.id}
                              placeholder={item?.trackedEntityAttribute?.name}
                              {...formik.getFieldProps(
                                `${item?.trackedEntityAttribute?.id}`
                              )}
                            />
                            {/* {formik.touched[item?.trackedEntityAttribute?.id] ? (
                            <div>*required</div>
                          ) : (
                            <Box sx={{ height: 22 }}></Box>
                          )} */}
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "DATE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <Date type={item.valueType} />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "DATETIME" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <Date type={item.valueType} />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "TIME" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <Date type={item.valueType} />
                          </Grid>
                        )}
                      {item.searchable &&
                        qrshow === "01" &&
                        item.valueType === "LONG_TEXT" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              multiline
                              rows={4}
                              name={item?.trackedEntityAttribute?.id}
                              placeholder={item?.trackedEntityAttribute?.name}
                              {...formik.getFieldProps(
                                `${item?.trackedEntityAttribute?.id}`
                              )}
                            />
                            {/* {formik.touched[item?.trackedEntityAttribute?.id] ? (
                            <div>*required</div>
                          ) : (
                            <Box sx={{ height: 22 }}></Box>
                          )} */}
                          </Grid>
                        )}
                    </Fragment>
                  ))}
              </Grid>

              <CustomButton
                variant="contained"
                disableFocusRipple
                type="submit"
              >
                Submit
              </CustomButton>
            </Form>
          )}
        </Formik>
      </div>

      <div className={`${styles1.listContainer}`}>
        {isloader && <Loader />}
        {list?.map((item, index) => (
          <div key={index} className={styles1.ListCard}>
            <div>
              <div className={styles1.cardHeader}>
                <img src={noPhoto} alt="icon" />
                <div className={styles1.HeaderText}>
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
                <div key={i} className={styles1.cardDetails}>
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

            <div className={styles1.cardfooter}>
              <Divider />
              <Button onClick={() => handleViewMore(item)}>
                <h4>VIEW MORE</h4>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchForm;
