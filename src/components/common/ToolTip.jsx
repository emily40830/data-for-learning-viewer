import React from "react";
import { Tooltip, withStyles } from "@material-ui/core";

const ToolTip = withStyles(() => ({
  tooltip: {
    boxShadow: "1px 1px",
    backgroundColor: "#555",
    fontSize: ".5rem",
    lineHeight: "1rem",
    maxWidth: 300,
  },
}))(Tooltip);

export default ToolTip;
