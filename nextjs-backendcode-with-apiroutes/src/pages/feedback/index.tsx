import { Feedback } from "@/models/feedback";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

interface FeedbackPageProps {
  feedbackItems: Feedback[];
}

function FeedbackPage(props: FeedbackPageProps) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
