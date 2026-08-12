import "./TypingIndicator.css";
import { FaRobot } from "react-icons/fa";

const TypingIndicator = () => {
  return (

    <div className="typing-row">

      <div className="typing-avatar">
        <FaRobot />
      </div>

      <div className="typing-bubble">

        <span></span>
        <span></span>
        <span></span>

      </div>

    </div>

  );
};

export default TypingIndicator;