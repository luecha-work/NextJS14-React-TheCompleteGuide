interface MessagesProps {
  readonly messages: Message[];
}

interface Message {
  id: string;
  text: string;
}
export default function Messages({ messages }: MessagesProps) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
