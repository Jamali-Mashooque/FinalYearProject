import API from "./api";

// ======================================
// Generate Study Planner
// ======================================

export const generateStudyPlanner = async () => {
  const res = await API.post("/study-planner/generate");
  return res.data;
};

// ======================================
// Get Study Planner
// ======================================

export const getStudyPlanner = async () => {
  const res = await API.get("/study-planner");
  return res.data;
};

// ======================================
// Get Current Technology
// ======================================

export const getCurrentTechnology = async () => {
  const res = await API.get("/study-planner/current");
  return res.data;
};

// ======================================
// Continue Learning
// ======================================

export const continueLearning = async (language) => {
  const res = await API.post("/study-planner/continue", {
    language,
  });

  return res.data;
};

// ======================================
// Reset Daily Lesson
// ======================================

export const resetDailyTask = async (language) => {
  const res = await API.post("/study-planner/reset", {
    language,
  });

  return res.data;
};