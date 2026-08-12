import { useState } from "react";
import "./MessageBubble.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";
import useTypewriter from "./useTypewriter";

import {
  FaRobot,
  FaUser,
  FaCopy,
  FaCheck,
  FaPen,
  FaRedo,
} from "react-icons/fa";

const MessageBubble = ({
  sender,
  text,
  time,
  isNew = false,
  isError = false,
  onRetry,
  onEditResend,
}) => {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  const { displayedText } = useTypewriter(
    text,
    sender === "ai" && isNew
  );

  const contentToRender = sender === "ai" ? displayedText : text;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } catch (e) {
        // ignore
      }
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const startEdit = () => {
    setDraft(text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(text);
    setEditing(false);
  };

  const submitEdit = () => {
    if (!draft.trim()) return;
    setEditing(false);
    onEditResend?.(draft.trim());
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div className={`message-row ${sender}`}>
      {sender === "ai" && (
        <div className="bubble-avatar ai-avatar">
          <FaRobot />
        </div>
      )}

      <div className={`message ${sender}`}>
        <div className="message-content">
          {editing ? (
            <div className="edit-box">
              <textarea
                className="edit-textarea"
                value={draft}
                autoFocus
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleEditKeyDown}
              />
              <div className="edit-actions">
                <button
                  type="button"
                  className="edit-cancel-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="edit-save-btn"
                  onClick={submitEdit}
                >
                  Save &amp; Send
                </button>
              </div>
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children }) {
                  const match = /language-(\w+)/.exec(
                    className || ""
                  );

                  const codeText = String(children).replace(
                    /\n$/,
                    ""
                  );

                  return !inline ? (
                    <CodeBlock
                      language={match ? match[1] : ""}
                      codeText={codeText}
                    />
                  ) : (
                    <code className="inline-code">
                      {children}
                    </code>
                  );
                },

                p: ({ children }) => (
                  <p className="ai-paragraph">{children}</p>
                ),

                h1: ({ children }) => (
                  <h1 className="ai-heading">{children}</h1>
                ),

                h2: ({ children }) => (
                  <h2 className="ai-heading">{children}</h2>
                ),

                h3: ({ children }) => (
                  <h3 className="ai-heading">{children}</h3>
                ),

                ul: ({ children }) => (
                  <ul className="ai-ul">{children}</ul>
                ),

                ol: ({ children }) => (
                  <ol className="ai-ol">{children}</ol>
                ),

                li: ({ children }) => (
                  <li className="ai-list">{children}</li>
                ),

                table: ({ children }) => (
                  <table className="ai-table">{children}</table>
                ),

                a: ({ children, href }) => (
                  <a href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {contentToRender}
            </ReactMarkdown>
          )}

          {!editing && (
            <div className="message-footer">
              <span className="message-time">{time}</span>

              {(sender === "user" || isError) && (
                <div className="message-actions">
                  {sender === "user" && !isError && (
                    <button
                      type="button"
                      className="msg-action-btn"
                      title="Copy"
                      onClick={handleCopy}
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                    </button>
                  )}

                  {sender === "user" && !isError && (
                    <button
                      type="button"
                      className="msg-action-btn"
                      title="Edit &amp; resend"
                      onClick={startEdit}
                    >
                      <FaPen />
                    </button>
                  )}

                  {isError && (
                    <button
                      type="button"
                      className="msg-action-btn msg-retry-btn"
                      title="Resend"
                      onClick={onRetry}
                    >
                      <FaRedo />
                      <span>Resend</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {sender === "user" && (
        <div className="bubble-avatar user-avatar">
          <FaUser />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
