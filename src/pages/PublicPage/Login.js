import React from "react";
import styles from "./login.module.css";
import MainLogo from "../../assets/Image/home/mainLogo.png";
import CustomInputText from "../../components/FormComponents/CustomInputText";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { Dispatcher } from "../../Redux/Dispatcher";
import { useNavigate } from "react-router-dom";

const initialValues = {
  userName: "",
  password: "",
};

function Login() {
  const Navigate = useNavigate();

  const handleLogin = async (val) => {
    console.log(val);
    const token = btoa(`${val.userName}:${val.password}`);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${token}`);

    Dispatcher.SetUserToken(token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "https://infohubinnovations.com/moon/api/me?fields=organisationUnits[id,name,programs[trackedEntityType,attributeValues[value,attribute[id,name]],id,name,translations[id,name]],translations[id,name]],displayName,firstName,surname,translations[id,name],email,userCredentials[id,username,userRoles[id,name],userInfo[id,introduction],disabled],whatsApp,twitter,telegram,skype,nationality,jobTitle,introduction,interests,gender,facebookMessenger,education,birthday,avatar[id]",
      requestOptions
    );
    if (response.ok) {
      const Data = await response.text();
      Dispatcher.login(JSON.parse(Data));
      const checkMetaData = localStorage.getItem("metaData");
      if (checkMetaData === null) {
        const metaReponse = await fetch(
          "https://infohubinnovations.com/moon/api/metadata?programs:filter=id:eq:EFCWA9HTiPi&programs:fields=displayName,programTrackedEntityAttributes[:all,trackedEntityAttribute[id,name,optionSet[id,options[id,name,code]]]],programStages[id,name,programStageDataElements[:all,dataElement[id,name,valueType,optionSet[id,options[id,name,code]]]]],trackedEntityType",
          requestOptions
        );
        if (metaReponse.ok) {
          const metaData = await metaReponse.text();
          localStorage.setItem("metaData", JSON.stringify(metaData));
        } else {
          alert("metaData fail");
        }
      } else {
        alert("data already hai");
      }
    } else {
      alert("login fail");
    }
  };

  const handleForgotPassword = () => {
    Navigate("/forgotpassword");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.section1}>
        <div className={styles.cardContainer}>
          <div className={styles.loginCard}>
            <h1>LOGIN HERE</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleLogin(values)}
            >
              {(formik) => {
                return (
                  <Form className={styles.formContainer}>
                    <div className={styles.field}>
                      <CustomInputText
                        label="User Name"
                        name="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className={styles.field}>
                      <CustomInputText
                        label="Password"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <Button
                      type="submit"
                      sx={{ mt: 3, bgcolor: "#00a1e5" }}
                      variant="contained"
                    >
                      Login
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div>
            <div style={{ cursor: "pointer" }} onClick={handleForgotPassword}>
              Forgot Password?
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        <div className={styles.imgContainer}>
          <img src={MainLogo} alt="logo" className={styles.img} />
        </div>
      </div>
    </div>
  );
}

export default Login;
