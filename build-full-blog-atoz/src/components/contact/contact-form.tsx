import { FormState } from "@/type/form-state";
import { useState } from "react";
import classes from "./contact-form.module.css";

function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    name: "",
    message: "",
  });

  function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: formState.email,
        name: formState.name,
        message: formState.message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    </section>
  );
}

export default ContactForm;
