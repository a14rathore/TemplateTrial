import React from "react";
import style from "./cards.module.css";

const textStyle = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#3990c0",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const subtextStyle = {
  fontSize: "16px",
  fontWeight: 500,
  color: "#6c6c6c",
};

const Cards = ({
  count,
  text = "text",
  subtext = "subtext",
  src = "#",
  id,
  OnCardClick,
}) => {
  return (
    <div className={style.root} onClick={() => OnCardClick(text, id)}>
      {count && <div className={style.count_container}>{count}</div>}
      <div>
        <div style={{ padding: "15px 0px 0px" }}>
          <img src={src} alt="icon" width="48px" height="48px" />
        </div>
        <div>
          <div style={textStyle}>{text}</div>
          <div style={subtextStyle}>{subtext}</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
