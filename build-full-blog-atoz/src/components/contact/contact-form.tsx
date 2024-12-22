import { FormState } from "@/type/form-state";
import { useEffect, useState } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

async function sendContactData(contactDetail: FormState) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetail),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    name: "",
    message: "",
  });
  const [requestStatus, setRequestStatus] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
        setRequestError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({ ...formState });

      setRequestStatus("success");

      setFormState({
        email: "",
        name: "",
        message: "",
      });
    } catch (error) {
      setRequestError((error as Error).message);
      setRequestStatus("error");
    }
  }

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={(event) => {
                setFormState((prevState) => ({
                  ...prevState,
                  email: event.target.value,
                }));
              }}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Email</label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={(event) => {
                setFormState((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            value={formState.message}
            onChange={(event) => {
              setFormState((prevState) => ({
                ...prevState,
                message: event.target.value,
              }));
            }}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
