import Message from "@components/Message";
import { useEffect, useRef } from "react";

export default function MessageContainer({ messages }) {
  const messageContainer = useRef(null);
  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={messageContainer}
      className="h-64 scroll-smooth overflow-y-scroll bg-white rounded-lg p-4 space-y-3"
    >
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}
