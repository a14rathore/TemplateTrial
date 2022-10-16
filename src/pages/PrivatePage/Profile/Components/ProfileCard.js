import React from "react";
import styles from "./profilecard.module.css";
import profile from "../../../../assets/Image/home/profile.svg";
import { Grid } from "@mui/material";

export const ProfileCard = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={4} container justifyContent="space-between">
          <img src={profile} alt="profile" width={22} height={22} />
          <div>
            <h3>Edit</h3>
          </div>
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
      </Grid>
    </Grid>
  );
};
