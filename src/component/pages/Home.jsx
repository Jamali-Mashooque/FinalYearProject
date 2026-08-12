import "./Home.css";

import { useNavigate } from "react-router-dom";

import {
  FaRobot,
  FaArrowRight,
  FaGraduationCap,
  FaBrain,
  FaRoad,
  FaChartLine,
  FaCheckCircle,
  FaBookOpen,
  FaUserGraduate,
  FaLaptopCode,
  FaBullseye,
  FaAward,
  FaLightbulb,
} from "react-icons/fa";
import Footer from "../Footer/Footer";

const Home = () => {
  const navigate = useNavigate();

const scrollToFeatures = () => {

  document
    .getElementById("features")
    ?.scrollIntoView({
      behavior: "smooth",
    });

};

  const features = [

    {
      icon: <FaRobot />,
      title: "AI Career Mentor",
      text: "Chat with an intelligent AI mentor that understands your profile, learning progress and career goals.",
    },

    {
      icon: <FaBrain />,
      title: "Skill Assessment",
      text: "Evaluate your technical knowledge through AI-powered quizzes and personalized assessments.",
    },

    {
      icon: <FaRoad />,
      title: "Personalized Roadmap",
      text: "Receive a unique technology roadmap tailored to your current skills and future career.",
    },

    {
      icon: <FaGraduationCap />,
      title: "Smart Study Planner",
      text: "Learn one technology at a time with structured daily lessons and practical exercises.",
    },

    {
      icon: <FaChartLine />,
      title: "Progress Tracking",
      text: "Track completed technologies, monitor daily progress and stay motivated throughout your journey.",
    },

    {
      icon: <FaLaptopCode />,
      title: "Career Recommendation",
      text: "Our AI analyzes your profile and recommends the career path that best matches your skills.",
    },

  ];

  const stats = [

    {
      number: "6+",
      title: "Core Modules",
    },

    {
      number: "AI",
      title: "Powered Learning",
    },

    {
      number: "24/7",
      title: "Career Mentor",
    },

    {
      number: "100%",
      title: "Personalized",
    },

  ];

  return (

    <div className="home-page">

      {/* ===========================================
            Hero
      ============================================ */}

     {/* ===========================================
Hero Section
=========================================== */}

<section className="hero-section">

  <div className="hero-left">

    <div className="hero-badge">

      <FaRobot />

      AI Powered Career Guidance Platform

    </div>

    <h1>

      Learn Smarter.

      <span>

        Grow Faster.

      </span>

      Build Your Career with AI.

    </h1>

    <p>

      Discover your ideal career path, receive
      personalized AI recommendations, follow an
      intelligent study roadmap, practice with skill
      assessments, and learn from your personal AI
      mentor — all in one modern learning platform.

    </p>

    <div className="hero-buttons">

      <button
        className="primary-btn"
        onClick={() =>
          navigate("/register")
        }
      >

        Get Started

        <FaArrowRight />

      </button>

      <button
        className="secondary-btn"
        onClick={scrollToFeatures}
      >

        Learn More

      </button>

    </div>

    <div className="hero-stats">

      <div>

        <h3>

          24/7

        </h3>

        <span>

          AI Mentor

        </span>

      </div>

      <div>

        <h3>

          100%

        </h3>

        <span>

          Personalized

        </span>

      </div>

      <div>

        <h3>

          7+

        </h3>

        <span>

          AI Modules

        </span>

      </div>

    </div>

  </div>

  {/* ====================================== */}

  <div className="hero-right">

    <div className="dashboard-card">

      <div className="dashboard-header">

        <div className="robot-avatar">

          <FaRobot />

        </div>

        <div>

          <h2>

            AI Career Mentor

          </h2>

          <p>

            Your Personal Learning Assistant

          </p>

        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-item">

          <FaChartLine />

          <div>

            <span>

              Career Match

            </span>

            <strong>

              92%

            </strong>

          </div>

        </div>

        <div className="dashboard-item">

          <FaGraduationCap />

          <div>

            <span>

              Study Planner

            </span>

            <strong>

              Active

            </strong>

          </div>

        </div>

        <div className="dashboard-item">

          <FaBrain />

          <div>

            <span>

              AI Mentor

            </span>

            <strong>

              Online

            </strong>

          </div>

        </div>

        <div className="dashboard-item">

          <FaRoad />

          <div>

            <span>

              Roadmap

            </span>

            <strong>

              Personalized

            </strong>

          </div>

        </div>

      </div>

      <div className="dashboard-progress">

        <div className="progress-top">

          <span>

            Learning Progress

          </span>

          <strong>

            65%

          </strong>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: "65%" }}
          />

        </div>

      </div>

    </div>

    {/* Floating Cards */}

    <div className="floating-card floating-1">

      <FaCheckCircle />

      HTML Completed

    </div>

    <div className="floating-card floating-2">

      <FaBookOpen />

      Next: CSS

    </div>

    <div className="floating-card floating-3">

      <FaUserGraduate />

      Career Recommendation Ready

    </div>

  </div>

</section>
      {/* ===========================================
            Statistics
      ============================================ */}

      <section className="stats-section">

        {

          stats.map((item,index)=>(

            <div
              className="stat-card"
              key={index}
            >

              <h2>

                {item.number}

              </h2>

              <p>

                {item.title}

              </p>

            </div>

          ))

        }

      </section>

      {/* ===========================================
            Features
      ============================================ */}

      <section
  id="features"
  className="features-section"
>

        <div className="section-title">

          <span>

            Platform Features

          </span>

          <h2>

            Everything You Need To Grow Your Career

          </h2>

          <p>

            Our platform combines Artificial Intelligence,
            structured learning and career guidance to help
            students become industry-ready professionals.

          </p>

        </div>

        <div className="feature-grid">

          {

            features.map((item,index)=>(

              <div
                className="feature-card"
                key={index}
              >

                <div className="feature-icon">

                  {item.icon}

                </div>

                <h3>

                  {item.title}

                </h3>

                <p>

                  {item.text}

                </p>

              </div>

            ))

          }

        </div>

      </section>
            {/* ===========================================
            How It Works
      ============================================ */}

      <section className="workflow-section">

        <div className="section-title">

          <span>

            How It Works

          </span>

          <h2>

            Your Learning Journey In Six Simple Steps

          </h2>

          <p>

            Start with your profile, let Artificial Intelligence
            understand your abilities, then follow a personalized
            learning journey until you're career ready.

          </p>

        </div>

        <div className="workflow-grid">

          <div className="workflow-card">

            <div className="workflow-number">

              01

            </div>

            <FaUserGraduate className="workflow-icon"/>

            <h3>

              Create Profile

            </h3>

            <p>

              Register and complete your educational background,
              technical skills and career interests.

            </p>

          </div>

          <div className="workflow-card">

            <div className="workflow-number">

              02

            </div>

            <FaBrain className="workflow-icon"/>

            <h3>

              AI Assessment

            </h3>

            <p>

              Evaluate your knowledge through intelligent
              assessments that identify strengths and
              improvement areas.

            </p>

          </div>

          <div className="workflow-card">

            <div className="workflow-number">

              03

            </div>

            <FaBullseye className="workflow-icon"/>

            <h3>

              Career Recommendation

            </h3>

            <p>

              Receive an AI-generated career recommendation
              based on your profile, skills and performance.

            </p>

          </div>

          <div className="workflow-card">

            <div className="workflow-number">

              04

            </div>

            <FaRoad className="workflow-icon"/>

            <h3>

              Personalized Roadmap

            </h3>

            <p>

              Follow a structured technology roadmap designed
              specifically for your recommended career path.

            </p>

          </div>

          <div className="workflow-card">

            <div className="workflow-number">

              05

            </div>

            <FaRobot className="workflow-icon"/>

            <h3>

              Learn With AI Mentor

            </h3>

            <p>

              Ask questions, solve coding problems,
              revise concepts and receive guidance
              whenever you need it.

            </p>

          </div>

          <div className="workflow-card">

            <div className="workflow-number">

              06

            </div>

            <FaAward className="workflow-icon"/>

            <h3>

              Track Progress

            </h3>

            <p>

              Monitor your completed technologies,
              learning progress and career growth
              through an interactive dashboard.

            </p>

          </div>

        </div>

      </section>

      {/* ===========================================
            Why Choose Us
      ============================================ */}

      <section className="why-section">

        <div className="why-left">

          <span>

            Why Choose Our Platform

          </span>

          <h2>

            More Than A Learning Platform

          </h2>

          <p>

            We combine Artificial Intelligence,
            personalized education and career guidance
            into one platform so every student receives
            a unique learning experience.

          </p>

          <div className="why-list">

            <div>

              <FaCheckCircle/>

              Personalized AI Recommendations

            </div>

            <div>

              <FaCheckCircle/>

              Dynamic Learning Roadmaps

            </div>

            <div>

              <FaCheckCircle/>

              Interactive AI Career Mentor

            </div>

            <div>

              <FaCheckCircle/>

              Smart Daily Study Planner

            </div>

            <div>

              <FaCheckCircle/>

              Career Focused Learning

            </div>

            <div>

              <FaCheckCircle/>

              Progress Tracking Dashboard

            </div>

          </div>

        </div>

        <div className="why-right">

          <div className="glass-card">

            <FaLightbulb/>

            <h3>

              Smart Learning Experience

            </h3>

            <p>

              Every recommendation is generated
              specifically for the student.
              No generic roadmap.
              No unnecessary technologies.
              Just a personalized journey toward
              your dream career.

            </p>

          </div>

        </div>

      </section>

      {/* ===========================================
            Student Journey
      ============================================ */}

      <section className="journey-section">

        <div className="section-title">

          <span>

            Student Journey

          </span>

          <h2>

            From Beginner To Professional

          </h2>

        </div>

       <div className="journey-line">

  <div className="journey-step">
    <div className="journey-circle">1</div>
    <h4>Register</h4>
  </div>

  <div className="journey-step">
    <div className="journey-circle">2</div>
    <h4>Profile Setup</h4>
  </div>

  <div className="journey-step">
    <div className="journey-circle">3</div>
    <h4>Skill Assessment</h4>
  </div>

  <div className="journey-step">
    <div className="journey-circle">4</div>
    <h4>AI Recommendation</h4>
  </div>

  <div className="journey-step">
    <div className="journey-circle">5</div>
    <h4>Learning Roadmap</h4>
  </div>

  <div className="journey-step">
    <div className="journey-circle">6</div>
    <h4>Daily Learning</h4>
  </div>

  <div className="journey-step">
    <div className="journey-circle">7</div>
    <h4>AI Mentor</h4>
  </div>

  <div className="journey-step">
    <div className="journey-circle">8</div>
    <h4>Career Ready</h4>
  </div>

</div>

      </section>
            {/* ===========================================
            Call To Action
      ============================================ */}

      <section className="cta-section">

        <div className="cta-content">

          <span>

            Ready To Build Your Career?

          </span>

          <h2>

            Start Your AI Learning Journey Today

          </h2>

          <p>

            Discover your ideal career path, learn with an AI mentor,
            complete personalized study plans, and become industry-ready
            through an intelligent learning experience designed just for you.

          </p>

          <div className="cta-buttons">

             <button
        className="primary-btn"
        onClick={() =>
          navigate("/register")
        }
      >

              Get Started

              <FaArrowRight />

            </button>

            <button className="secondary-btn">

              Learn More

            </button>

          </div>

        </div>

      </section>

      {/* ===========================================
            Footer
      ============================================ */}

      <Footer/>

    </div>

  );

};

export default Home;