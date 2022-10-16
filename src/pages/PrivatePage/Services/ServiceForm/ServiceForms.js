import { Button, Grid, IconButton } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FieldLabel from "../../../../components/FormComponents/FieldLabel";
import CustomTextFiled from "../../../../components/FormComponents/CustomTextField";
import CustomSelect from "../../../../components/FormComponents/CustomSelect";
import CustomButton from "../../../../components/Buttons/CustomButton";
import Date from "../../../../components/FormComponents/Date";
import styles from "./ServiceForm.module.css";
import styles1 from "../../RegistrationForm/registration.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function ServiceForms() {
  const Navigate = useNavigate();

  const servicePageid = useSelector((state) => state.app.servicePageid);
  const user = useSelector((state) => state.app.user);

  const { id } = useSelector((state) =>
    state?.app?.listCardDetail ? state?.app?.listCardDetail : ""
  );

  const data = useSelector((state) => state.token);

  const [serviceForm, setServiceForm] = useState([]);
  const [initialValue, setIntialValue] = useState();

  const getPayLoad = (obj) => {
    const array = [];

    for (const key in obj) {
      if (obj[key] !== "") array.push({ dataElement: key, value: obj[key] });
    }

    console.log(servicePageid);

    const payload = {
      dataValues: array,
      program: user?.organisationUnits?.[0]?.programs?.[0]?.id,
      programStage: servicePageid?.id,
      orgUnit: user?.organisationUnits?.[0]?.id,
      trackedEntityInstance: id,
      status: "COMPLETED",
      eventDate: servicePageid?.date,
      completedDate: servicePageid?.date,
    };

    console.log(payload);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${data?.token}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    fetch(`https://infohubinnovations.com/moon/api/events`, requestOptions)
      .then((response) => {
        if (response.ok) {
          Navigate("/services");
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
  };

  const getServicesData = () => {
    const data = JSON.parse(localStorage.getItem("metaData"));
    const parsedData = JSON.parse(data);
    const dataArray = parsedData.programs[0].programStages;

    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id === servicePageid.id) {
        setServiceForm(dataArray[i]);
        getinitialValue(dataArray[i]?.programStageDataElements);
        break;
      }
    }
  };

  const getinitialValue = (dataArray) => {
    let val = {};
    dataArray.forEach((item) => {
      val = {
        ...val,
        [item?.id]: "",
      };
    });
    setIntialValue(val);
  };

  useEffect(() => {
    getServicesData();
  }, []);

  return (
    <div className={`${styles1.RegsubContainer} ${styles.mainContainer}`}>
      <div className={styles.btnHeading}>
        <IconButton
          aria-label="delete"
          size="small"
          sx={{ color: "#3990c0" }}
          onClick={() => Navigate(-1)}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <h3>{servicePageid.name}</h3>
      </div>

      <div className={styles.formContianer}>
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
                {serviceForm.programStageDataElements &&
                  serviceForm.programStageDataElements?.map((item, i) => (
                    <Fragment key={i}>
                      {item?.dataElement?.valueType === "TEXT" &&
                        !item?.dataElement?.optionSet && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel title={item?.dataElement?.name} />
                            <CustomTextFiled
                              name={item?.dataElement?.id}
                              placeholder={item?.dataElement?.name}
                              {...formik.getFieldProps(
                                `${item?.dataElement?.id}`
                              )}
                            />
                          </Grid>
                        )}
                      {item?.dataElement?.valueType === "TEXT" &&
                        item?.dataElement?.optionSet && (
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <FieldLabel title={item?.dataElement?.name} />
                            <CustomSelect
                              name={item?.item?.dataElement?.id}
                              onBlur={formik.handleBlur(
                                `${item?.item?.dataElement?.id}`
                              )}
                              value={formik.values?.item?.dataElement?.id}
                              onChange={formik.handleChange}
                              options={item?.dataElement?.optionSet.options}
                            />
                          </Grid>
                        )}
                      {item?.dataElement?.valueType === "AGE" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "COORDINATE" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "EMAIL" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "FILE_RESOURCE" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            placeholder={item?.dataElement?.name}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "IMAGE" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            placeholder={item?.dataElement?.name}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "ORGANISATION_UNIT" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "PHONE_NUMBER" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "INTEGER_POSITIVE" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "URL" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "USERNAME" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "NUMBER" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "DATE" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <Date
                            type={item?.dataElement?.valueType}
                            name={item?.dataElement?.id}
                            formik={formik}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "DATETIME" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <Date
                            type={item?.dataElement?.valueType}
                            name={item?.dataElement?.id}
                            formik={formik}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "TIME" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <Date
                            type={item?.dataElement?.valueType}
                            name={item?.dataElement?.id}
                            formik={formik}
                          />
                        </Grid>
                      )}
                      {item?.dataElement?.valueType === "LONG_TEXT" && (
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <FieldLabel title={item?.dataElement?.name} />
                          <CustomTextFiled
                            multiline
                            rows={4}
                            name={item?.dataElement?.id}
                            placeholder={item?.dataElement?.name}
                            {...formik.getFieldProps(
                              `${item?.dataElement?.id}`
                            )}
                          />
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
  );
}

export default ServiceForms;
