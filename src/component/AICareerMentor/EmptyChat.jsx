import {
  FaRobot,
  FaCompass,
  FaRoute,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

import "./EmptyChat.css";

const EmptyChat = ({ onQuestion }) => {
  const suggestions = [
    {
      icon: <FaCompass />,
      text: "Suggest the best career for my skills",
    },
    {
      icon: <FaRoute />,
      text: "Create a complete career roadmap",
    },
    {
      icon: <FaGraduationCap />,
      text: "Recommend learning resources",
    },
    {
      icon: <FaBriefcase />,
      text: "How can I prepare for interviews?",
    },
  ];

  return (
    <div className="empty-chat">

      <div className="empty-logo">
        <FaRobot />
      </div>

      <h2>AI Career Mentor</h2>

      <p>
        Your intelligent assistant for career planning,
        learning and growth.
      </p>

      <span>
        Ask anything about careers, skills, roadmaps,
        interview preparation and learning resources.
      </span>

      <div className="quick-grid">

        {suggestions.map((item, index) => (

          <div
            key={index}
            className="quick-card"
            onClick={() => onQuestion(item.text)}
          >

            <div className="quick-icon">
              {item.icon}
            </div>

            <p>{item.text}</p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default EmptyChat;