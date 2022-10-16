import { style } from "@mui/system";
import React from "react";
import styles from "./circular.module.css";

const Circular = ({ percent = 0, subtext = "subtext", color = "#2d6eae" }) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.percent}
        style={{ "--clr": color, "--num": `${percent}` }}
      >
        <div className={styles.dot}></div>
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>
        <div className={styles.number}>
          <h2>
            {percent}
            <span>%</span>
          </h2>
          <p>{subtext}</p>
        </div>
      </div>
    </div>
  );
};

export default Circular;
