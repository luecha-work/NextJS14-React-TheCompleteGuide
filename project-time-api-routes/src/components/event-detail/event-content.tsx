import React from "react";
import classes from "./event-content.module.css";

function EventContent(props: React.PropsWithChildren<object>) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
