import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser } from "../../api/authApi";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Login
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return alert("Please fill all fields.");
    }

    try {
      const response = await loginUser(formData);

      alert(response.data.message);

      // Save Token

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Redirect

      if (response.data.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed."
      );
    }
  };

  return (
    <section className="login-page">

      <div className="login-card">

        <h2>Login</h2>

        <p>
          Login to your AI Career & Study Growth Platform
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="input-group">

            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          {/* Password */}

          <div className="input-group">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          {/* Show Password */}

          <div className="show-password">

            <label>

              <input
                type="checkbox"
                checked={showPassword}
                onChange={() =>
                  setShowPassword(!showPassword)
                }
              />

              Show Password

            </label>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
};

export default Login;