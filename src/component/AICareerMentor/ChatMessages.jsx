import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import "./ChatMessages.css";

const formatTime = (value) => {
  const date = value ? new Date(value) : new Date();

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ChatMessages = ({
  messages = [],
  loading = false,
  onRetry,
  onEditResend,
}) => {
  const bottomRef = useRef(null);
  const rowRefs = useRef({});
  const prevCountRef = useRef(0);

  useEffect(() => {
    const prevCount = prevCountRef.current;
    const lastMessage = messages[messages.length - 1];

    // ------------------------------------------------
    // A new AI reply just arrived — scroll so the TOP
    // of that reply is visible (like ChatGPT), instead
    // of jumping straight to the bottom of a long reply.
    // ------------------------------------------------
    if (
      messages.length > prevCount &&
      lastMessage?.sender === "ai"
    ) {
      const node = rowRefs.current[lastMessage._id];

      if (node) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // The user just sent a message (or typing indicator
      // appeared) — keep the usual "scroll to bottom" feel.
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    prevCountRef.current = messages.length;
  }, [messages, loading]);

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={msg._id || `${msg.sender}-${index}-${msg.text?.slice(0, 20)}`}
          ref={(node) => {
            if (msg._id) rowRefs.current[msg._id] = node;
          }}
        >
          <MessageBubble
            sender={msg.sender}
            text={msg.text}
            time={formatTime(msg.createdAt)}
            isNew={Boolean(msg.isNew)}
            isError={Boolean(msg.isError)}
            onRetry={() => onRetry?.(msg)}
            onEditResend={(newText) => onEditResend?.(msg, newText)}
          />
        </div>
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
