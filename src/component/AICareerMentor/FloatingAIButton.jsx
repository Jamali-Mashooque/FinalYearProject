import { FaRobot } from "react-icons/fa";
import "./FloatingAIButton.css";

const FloatingAIButton = ({ onClick }) => {

  return (

    <button
      className="floating-ai-btn"
      onClick={onClick}
    >

      <FaRobot />

    </button>

  );

};

export default FloatingAIButton;