import "./ProgressBar.css";

const steps = [
  "Personal",
  "Academic",
  "Skills",
  "Review",
];

const ProgressBar = ({ step }) => {
  return (
    <div className="progress-container">

      {steps.map((item, index) => (

        <div
          key={index}
          className="progress-step"
        >

          <div
            className={`circle ${
              step >= index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </div>

          <p>{item}</p>

          {index !== steps.length - 1 && (

            <div
              className={`line ${
                step > index + 1 ? "active" : ""
              }`}
            ></div>

          )}

        </div>

      ))}

    </div>
  );
};

export default ProgressBar;