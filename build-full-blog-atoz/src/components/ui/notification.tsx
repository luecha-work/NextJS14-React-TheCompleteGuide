import ReactDOM from "react-dom";

import classes from "./notification.module.css";

interface NotificationProps {
  title: string;
  message: string;
  status: string;
}

function Notification(props: NotificationProps) {
  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications") as HTMLElement
  );
}

export default Notification;
