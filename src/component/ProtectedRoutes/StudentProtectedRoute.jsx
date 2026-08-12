import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "User") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default StudentProtectedRoute;