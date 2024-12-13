import React from "react";
import classes from "./event-content.module.css";

type EventContentProps = React.PropsWithChildren<Record<string, unknown>>;

function EventContent(props: EventContentProps) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
