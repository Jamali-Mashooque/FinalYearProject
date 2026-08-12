import { FaPlus, FaComments, FaTimes } from "react-icons/fa";
import "./ChatSidebar.css";

const ChatSidebar = ({
  open,
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onClose,
}) => {
  return (
    <>
      {open && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`chat-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <button className="new-chat-btn" onClick={onNewChat}>
            <FaPlus />
            <span>New Chat</span>
          </button>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close chat history"
          >
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-label">Chat History</div>

        <div className="sidebar-list">
          {sessions.length === 0 && (
            <p className="sidebar-empty">No previous chats yet.</p>
          )}

          {sessions.map((session) => (
            <button
              key={session.sessionId}
              className={`sidebar-item ${
                session.sessionId === activeSessionId ? "active" : ""
              }`}
              onClick={() => onSelectSession(session.sessionId)}
            >
              <FaComments className="sidebar-item-icon" />
              <span className="sidebar-item-text">
                {session.title || "New Chat"}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
