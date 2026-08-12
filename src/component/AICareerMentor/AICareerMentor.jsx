import { useState, useEffect, useCallback } from "react";
import "./AICareerMentor.css";

import {
  FaRobot,
  FaArrowLeft,
  FaBars,
} from "react-icons/fa";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import EmptyChat from "./EmptyChat";
import ChatSidebar from "./ChatSidebar";

import {
  sendMessage,
  getChatHistory,
  getChatSessions,
} from "../../api/ChatApi";

import {
  getCurrentTechnology,
} from "../../api/studyPlannerApi";

// ==========================================
// Helpers
// ==========================================

const createSessionId = () =>
  `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const AICareerMentor = ({ onClose }) => {

  // ==========================================
  // States
  // ==========================================

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [currentTechnology, setCurrentTechnology] =
    useState(null);

  const [sessionId, setSessionId] = useState(() => createSessionId());

  const [sessions, setSessions] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================================
  // Load Current Technology
  // ==========================================

  const loadCurrentTechnology = async () => {

    try {

      const res =
        await getCurrentTechnology();

      if (res.success) {

        setCurrentTechnology(
          res.planner
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================================
  // Load Chat Sessions (Chat History List)
  // ==========================================

  const loadSessions = useCallback(async () => {

    try {

      const res = await getChatSessions();

      if (res.success) {
        setSessions(res.sessions || []);
      }

    } catch (error) {

      console.log(error);

    }

  }, []);

  // ==========================================
  // Load A Session's Messages
  // ==========================================

  const loadSession = useCallback(async (id) => {

    try {

      const res = await getChatHistory(id);

      if (res.success && res.messages) {

        const history = res.messages.map((item) => ({
          _id: item._id,
          sender: item.sender,
          text: item.text,
          createdAt: item.createdAt,
        }));

        setMessages(history);

      } else {

        setMessages([]);

      }

    } catch (error) {

      console.log(error);
      setMessages([]);

    }

  }, []);

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {

    const initialize = async () => {

      setPageLoading(true);

      await Promise.all([

        loadCurrentTechnology(),

        loadSessions(),

      ]);

      setPageLoading(false);

    };

    initialize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================
  // New Chat
  // ==========================================

  const handleNewChat = () => {

    setSessionId(createSessionId());
    setMessages([]);
    setSidebarOpen(false);

  };

  // ==========================================
  // Select An Existing Chat From History
  // ==========================================

  const handleSelectSession = async (id) => {

    setSessionId(id);
    setSidebarOpen(false);
    await loadSession(id);

  };

  // ==========================================
  // Send Message
  // ==========================================

  const handleSend = async (text, replaceFromId = null) => {

    const trimmed = text.trim();

    if (!trimmed || loading)
      return;

    const isFirstMessageOfSession = messages.length === 0;

    if (replaceFromId) {

      // Edit & resend: keep everything up to (and including)
      // the edited message, drop whatever came after it.
      setMessages((prev) => {

        const index = prev.findIndex((m) => m._id === replaceFromId);

        if (index === -1) return prev;

        const updated = prev.slice(0, index + 1);

        updated[index] = {
          ...updated[index],
          text: trimmed,
        };

        return updated;

      });

    } else {

      const userMessage = {

        _id: `user-${Date.now()}`,

        sender: "user",

        text: trimmed,

        createdAt: new Date().toISOString(),

      };

      setMessages((prev) => [

        ...prev,

        userMessage,

      ]);

    }

    setLoading(true);

    try {

      const res =
        await sendMessage(trimmed, sessionId);

      const aiMessage = {

        _id: `ai-${Date.now()}`,

        sender: "ai",

        text: res.success
          ? res.reply
          : "Unable to generate response.",

        createdAt: new Date().toISOString(),

        isNew: true,

        isError: !res.success,

      };

      setMessages((prev) => [

        ...prev,

        aiMessage,

      ]);

      // Refresh Current Technology
      await loadCurrentTechnology();

      // A brand new session just got its first exchange —
      // refresh the sidebar so it shows up in history.
      if (isFirstMessageOfSession || replaceFromId) {
        await loadSessions();
      }

    } catch (error) {

      console.log(error);

      setMessages((prev) => [

        ...prev,

        {

          _id: `error-${Date.now()}`,

          sender: "ai",

          text:
            "Unable to connect to AI Mentor. Please check your network and try again.",

          createdAt: new Date().toISOString(),

          isNew: true,

          isError: true,

          retryText: trimmed,

        },

      ]);

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // Retry A Failed Message
  //
  // Resends the same user message without adding
  // a duplicate user bubble — only the AI reply
  // is (re)fetched, exactly like resending a
  // message that failed to deliver.
  // ==========================================

  const handleRetry = async (msg) => {

    const textToRetry = msg?.retryText || "";

    if (!textToRetry || loading) return;

    // Drop the failed AI bubble before retrying.
    setMessages((prev) =>
      prev.filter((m) => m._id !== msg._id)
    );

    setLoading(true);

    try {

      const res = await sendMessage(textToRetry, sessionId);

      const aiMessage = {

        _id: `ai-${Date.now()}`,

        sender: "ai",

        text: res.success
          ? res.reply
          : "Unable to generate response.",

        createdAt: new Date().toISOString(),

        isNew: true,

        isError: !res.success,

      };

      setMessages((prev) => [...prev, aiMessage]);

      await loadCurrentTechnology();
      await loadSessions();

    } catch (error) {

      console.log(error);

      setMessages((prev) => [

        ...prev,

        {

          _id: `error-${Date.now()}`,

          sender: "ai",

          text:
            "Unable to connect to AI Mentor. Please check your network and try again.",

          createdAt: new Date().toISOString(),

          isNew: true,

          isError: true,

          retryText: textToRetry,

        },

      ]);

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // Edit A User Message & Resend
  // ==========================================

  const handleEditResend = (msg, newText) => {

    handleSend(newText, msg._id);

  };

  // ==========================================
  // Loading
  // ==========================================

  if (pageLoading) {

    return (

      <div className="mentor-loading">

        Loading AI Mentor...

      </div>

    );

  }

  return (

    <div className="mentor-page">

      {/* ==================================
            Header
      =================================== */}

      <header className="mentor-header">

        <button

          className="mentor-back"

          onClick={onClose}

        >

          <FaArrowLeft />

        </button>

        <button

          className="mentor-history-toggle"

          onClick={() => setSidebarOpen((prev) => !prev)}

          title="Chat History"

        >

          <FaBars />

        </button>

        <div className="mentor-title">

          <div className="mentor-avatar">

            <FaRobot />

          </div>

          <div>

            <h2>

              AI Career Mentor

            </h2>

            <p>

              Your Personal AI Learning Assistant

            </p>

          </div>

        </div>

      </header>

      {/* ==================================
          Body (Sidebar + Chat)
      =================================== */}

      <div className="mentor-body">

        <ChatSidebar

          open={sidebarOpen}

          sessions={sessions}

          activeSessionId={sessionId}

          onNewChat={handleNewChat}

          onSelectSession={handleSelectSession}

          onClose={() => setSidebarOpen(false)}

        />

        <div className="mentor-main">

          {/* ==================================
              Chat Area
          =================================== */}

          <div className="mentor-content">

            {

              messages.length === 0

                ?

                <EmptyChat

                  onQuestion={handleSend}

                />

                :

                <ChatMessages

                  messages={messages}

                  loading={loading}

                  onRetry={handleRetry}

                  onEditResend={handleEditResend}

                />

            }

          </div>

          {/* ==================================
                Chat Input
          =================================== */}

          <ChatInput

            loading={loading}

            onSend={handleSend}

          />

        </div>

      </div>

    </div>

  );

};

export default AICareerMentor;
