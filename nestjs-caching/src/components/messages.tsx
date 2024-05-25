interface MessagesProps {
  readonly messages: Message[];
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
