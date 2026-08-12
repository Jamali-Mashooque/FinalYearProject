import API from "./api";


// Generate AI Recommendation

export const generateRecommendation = async () => {

  const res = await API.post(
    "/ai-career/generate"
  );

  return res.data;

};



// Get Recommendation History

export const getRecommendationHistory = async () => {

  const res = await API.get(
    "/ai-career/history"
  );

  return res.data;

};