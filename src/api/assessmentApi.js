import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});


export const getAssessmentHistory = () => {
  return API.get("/assessment/history");
};


export const generateAssessment = () => {
  return API.post("/assessment/generate");
};


export const submitAssessment = (id, answers) => {
  return API.post(`/assessment/submit/${id}`, {
    answers,
  });
};


export const getLatestAssessment = () => {
  return API.get("/assessment/latest");
};