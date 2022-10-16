import React from "react";
import styles from "./login.module.css";
import MainLogo from "../../assets/Image/home/mainLogo.png";
import CustomInputText from "../../components/FormComponents/CustomInputText";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
// import { Dispatcher } from "../../Redux/Dispatcher";

const initialValues = {
  userName: "",
};

function ForgotPassword() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.section1}>
        <div className={styles.cardContainer}>
          <div className={styles.loginCard}>
            <h1>Forgot Password</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => console.log(values)}
            >
              {(formik) => {
                return (
                  <Form className={styles.formContainer}>
                    <div className={styles.field}>
                      <CustomInputText
                        label="Email id/userName"
                        name="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <Button
                      type="submit"
                      sx={{ mt: 3, bgcolor: "#00a1e5" }}
                      variant="contained"
                    >
                      submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
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

export default ForgotPassword;
