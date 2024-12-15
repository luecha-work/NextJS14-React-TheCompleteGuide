import { useRef } from "react";

export default function HomePage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const feedback = feedbackRef.current!.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email, feedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackRef} />
        </div>
        <button>Sent Feedback</button>
      </form>
    </div>
  );
}
