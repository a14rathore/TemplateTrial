import React from "react";

function FieldLabel({ title }) {
  const titleStyle = {
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 0px",
    color: "#6a6a6a",
  };
  return <div style={titleStyle}>{title}</div>;
}

export default FieldLabel;
