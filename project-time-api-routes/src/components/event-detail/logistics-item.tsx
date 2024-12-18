import { ReactNode } from "react";
import classes from "./logistics-item.module.css";

interface LogisticsItemProps {
  icon: React.ComponentType;
  children: ReactNode;
}

function LogisticsItem(props: LogisticsItemProps) {
  const { icon: Icon, children } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
