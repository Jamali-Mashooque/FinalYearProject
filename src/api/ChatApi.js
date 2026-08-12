import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const sendMessage = async (message, sessionId) => {
  const res = await API.post("/ai-chat/message", {
    message,
    sessionId,
  });

  return res.data;
};

export const getChatHistory = async (sessionId) => {
  const res = await API.get("/ai-chat/history", {
    params: sessionId ? { sessionId } : {},
  });
  return res.data;
};

export const getChatSessions = async () => {
  const res = await API.get("/ai-chat/sessions");
  return res.data;
};
