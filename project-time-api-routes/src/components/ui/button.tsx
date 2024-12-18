import Link from "next/link";
import { ReactNode } from "react";
import classes from "./button.module.css";

interface ButtonProps {
  link?: string;
  onClick?: () => void;
  children: ReactNode;
}

function Button(props: ButtonProps) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
