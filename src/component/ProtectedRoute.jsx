import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authCheck } from "../api/authApi";

const ProtectedRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const checkUser = async () => {

      try {

        const res = await authCheck();

        if (res.data.success) {
          setIsAuth(true);
        }

      } catch (error) {

        setIsAuth(false);

      } finally {

        setLoading(false);

      }

    };

    checkUser();

  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;