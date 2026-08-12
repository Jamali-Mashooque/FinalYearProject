import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { setPassword } from "../../api/authApi";
import "./SetPassword.css";

const SetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      return alert("Please fill all fields.");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      const response = await setPassword(
        token,
        formData.password
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to set password."
      );
    }
  };

  return (
    <section className="set-password">
      <div className="password-card">

        <h2>Create Your Password</h2>

        <p>
          Create a strong password to activate your account.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Password */}

          <div className="input-group">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          {/* Confirm Password */}

          <div className="input-group">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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
            className="password-btn"
          >
            Set Password
          </button>

        </form>

      </div>
    </section>
  );
};

export default SetPassword;