import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/Buttons/CustomButton";
import CustomSelect from "../../../components/FormComponents/CustomSelect";
import CustomTextFiled from "../../../components/FormComponents/CustomTextField";
import Date from "../../../components/FormComponents/Date";
import FieldLabel from "../../../components/FormComponents/FieldLabel";
import Loader from "../../../components/Loader/AppLoader";
import styles from "./registration.module.css";

function RegistraionForm() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const data = useSelector((state) => state.token);

  const [formData, setFormData] = useState([]);
  const [initialValue, setIntialValue] = useState();
  const [isOnline, setIsOnline] = useState(false);

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
  };

  const getPayLoad = (obj) => {
    const array = [];

    for (const key in obj) {
      if (obj[key] !== "") array.push({ attribute: key, value: obj[key] });
    }

    const payload = {
      attributes: array,
      enrollments: [
        {
          incidentDate: "2022-06-01",
          enrollmentDate: "2022-06-27",
          program: user?.organisationUnits?.[0]?.programs?.[0]?.id,
          orgUnit: user?.organisationUnits?.[0]?.id,
          status: "ACTIVE",
        },
      ],
      orgUnit: user?.organisationUnits?.[0]?.id,
      trackedEntityType:
        user?.organisationUnits?.[0]?.programs?.[0]?.trackedEntityType?.id,
    };

    if (isOnline) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Basic ${data?.token}`);
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow",
      };

      fetch(
        `https://infohubinnovations.com/moon/api/trackedEntityInstances`,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            Navigate("/");
            return response.text();
          } else {
            // Dispatcher.logout();
            // Navigate("/");
          }
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      const getofflineData = localStorage.getItem("offlineData")
        ? JSON.parse(localStorage.getItem("offlineData"))
        : [];
      getofflineData.push(payload);
      localStorage.setItem("offlineData", JSON.stringify(getofflineData));
      Navigate("/");
    }
  };

  useEffect(() => {
    getmetaData();
    window.addEventListener("online", (event) => {
      setIsOnline(true);
      console.log(event, "online");
    });
    window.addEventListener("offline", (event) => {
      setIsOnline(false);
      console.log(event, "offline");
    });
  }, []);

  useEffect(() => {
    if (!isOnline) {
      console.log("offline");
    }
  }, [isOnline]);

  return (
    <>
      {!formData && <Loader />}
      <div className={styles.RegMainContainer}>
        <div className={styles.RegsubContainer}>
          <div>Registraion From</div>

          <Formik
            initialValues={initialValue}
            enableReinitialize={true}
            onSubmit={(val) => {
              getPayLoad(val);
            }}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={2}>
                  {formData &&
                    formData?.map((item, i) => (
                      <Fragment key={i}>
                        {item.valueType === "TEXT" &&
                          !item?.trackedEntityAttribute?.optionSet && (
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                              <FieldLabel
                                title={item?.trackedEntityAttribute?.name}
                              />
                              <CustomTextFiled
                                id={item?.trackedEntityAttribute?.id}
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
                        {item.valueType === "TEXT" &&
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
                                  item?.trackedEntityAttribute?.optionSet
                                    .options
                                }
                                value={
                                  formik.values?.item?.trackedEntityAttribute
                                    ?.id
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
                        {item.valueType === "AGE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "COORDINATE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "EMAIL" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "FILE_RESOURCE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "IMAGE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "ORGANISATION_UNIT" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "PHONE_NUMBER" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "INTEGER_POSITIVE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "URL" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "USERNAME" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <CustomTextFiled
                              placeholder={item?.trackedEntityAttribute?.name}
                            />
                          </Grid>
                        )}
                        {item.valueType === "NUMBER" && (
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
                        {item.valueType === "DATE" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <Date
                              type={item.valueType}
                              name={item?.trackedEntityAttribute?.id}
                              formik={formik}
                            />
                          </Grid>
                        )}
                        {item.valueType === "DATETIME" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <Date
                              type={item.valueType}
                              name={item?.trackedEntityAttribute?.id}
                              formik={formik}
                            />
                          </Grid>
                        )}
                        {item.valueType === "TIME" && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel
                              title={item?.trackedEntityAttribute?.name}
                            />
                            <Date
                              type={item.valueType}
                              name={item?.trackedEntityAttribute?.id}
                              formik={formik}
                            />
                          </Grid>
                        )}
                        {item.valueType === "LONG_TEXT" && (
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
      </div>
    </>
  );
}

export default RegistraionForm;
