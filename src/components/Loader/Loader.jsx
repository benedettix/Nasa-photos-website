import React from "react";
import "./Loader.scss";
import { CircularProgress } from "@mui/material";
function Loader({ mini }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        style={{ margin: "0 auto", width: "65px", height: "65px" }}
      />
    </div>
  );
}

export default Loader;
