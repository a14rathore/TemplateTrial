import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100,
        top: 0,
        left: 0,
        minHeight: "100%",
        width: "100%",
        backgroundColor: "rgba(235, 239, 255, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderRadius: 8,
          padding: 5,
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={40}
          thickness={4}
        />
      </div>
    </div>
  );
};

export default Loader;
