import API from "./api";


// Register User
export const registerUser = async (data) => {

  return await API.post(
    "/auth/registerUser",
    data
  );

};


// Set Password
export const setPassword = async (
  token,
  password
) => {

  return await API.post(
    `/auth/set-password/${token}`,
    {
      password,
    }
  );

};


// Login User
export const loginUser = async (data) => {

  return await API.post(
    "/auth/login",
    data
  );

};


// Logout User
export const logoutUser = async () => {

  return await API.post(
    "/auth/logout"
  );

};


// Auth Check
export const authCheck = async () => {

  return await API.get(
    "/auth/auth-check"
  );

};


// Get Profile
export const getProfile = async () => {

  console.log(
    "Calling Profile API..."
  );

  return await API.get(
    "/user/profile",
    {
      withCredentials:true,
    }
  );

};


// Update Profile
export const updateProfile = async (data) => {

  return await API.put(

    "/user/update-profile",

    data,

    {
      withCredentials:true,
    }

  );

};



// Admin Dashboard
export const getAdminDashboard = async () => {

  return await API.get(

    "/admin/dashboard",

    {
      withCredentials:true,
    }

  );

};