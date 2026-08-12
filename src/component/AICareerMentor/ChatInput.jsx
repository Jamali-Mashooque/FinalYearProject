import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./ChatInput.css";

const MAX_HEIGHT = 180;

const ChatInput = ({ onSend, loading }) => {

  const [text, setText] = useState("");

  const textareaRef = useRef(null);

  // ==========================================
  // Auto-grow the textarea as the user types,
  // capped at MAX_HEIGHT (matches the CSS
  // max-height so the box scrolls after that).
  // ==========================================

  useEffect(() => {

    const node = textareaRef.current;

    if (!node) return;

    node.style.height = "auto";

    const nextHeight = Math.min(node.scrollHeight, MAX_HEIGHT);

    node.style.height = `${nextHeight}px`;

  }, [text]);

  const handleSend = () => {

    const message = text.trim();

    if (!message || loading) return;

    onSend(message);

    setText("");

    // Reset height back to a single line after sending.
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleSend();

    }

  };

  return (

    <div className="chat-input-wrapper">

      <div className="chat-input">

        <textarea

          ref={textareaRef}

          rows={1}

          value={text}

          placeholder="Ask anything about your career..."

          onChange={(e) => setText(e.target.value)}

          onKeyDown={handleKeyDown}

          disabled={loading}

        />

        <button

          onClick={handleSend}

          disabled={loading || !text.trim()}

        >
          <FaPaperPlane />
        </button>

      </div>

      <p className="chat-note">
        AI can make mistakes. Verify important information.
      </p>

    </div>

  );

};

export default ChatInput;
