import "./AboutUs.css";

import { useNavigate } from "react-router-dom";

import {

FaRobot,
FaBrain,
FaRoad,
FaGraduationCap,
FaChartLine,
FaCheckCircle,
FaArrowRight,
FaLightbulb,
FaBullseye,
FaLaptopCode,
FaUserGraduate,
FaAward

} from "react-icons/fa";
import Footer from "../footer/Footer";

const AboutUs = () => {

const navigate = useNavigate();

const features = [

{
icon:<FaRobot/>,
title:"AI Career Mentor",
text:"Your intelligent learning companion that teaches concepts, answers questions, evaluates solutions and guides you throughout your learning journey."
},

{
icon:<FaBrain/>,
title:"Skill Assessment",
text:"AI-powered assessments evaluate your strengths and weaknesses to recommend the most suitable career path."
},

{
icon:<FaRoad/>,
title:"Personalized Roadmap",
text:"Every student receives a unique technology roadmap based on their profile, goals and assessment results."
},

{
icon:<FaGraduationCap/>,
title:"Study Planner",
text:"Daily learning plans ensure consistent progress with practical exercises and structured lessons."
},

{
icon:<FaChartLine/>,
title:"Progress Tracking",
text:"Track completed technologies, monitor daily learning and visualize your career growth."
},

{
icon:<FaLaptopCode/>,
title:"Career Recommendation",
text:"Artificial Intelligence analyzes your profile and recommends the best career according to your abilities."
}

];

const process=[

"Create Account",
"Complete Profile",
"Skill Assessment",
"AI Career Recommendation",
"Learning Roadmap",
"Study Planner",
"Learn With AI Mentor",
"Become Career Ready"

];

return(

<div className="about-page">

{/* =========================
Hero
========================= */}

<section className="about-hero">

<div className="about-left">

<span className="about-badge">

<FaRobot/>

About Our Platform

</span>

<h1>

Building Careers Through

<span>Artificial Intelligence</span>

</h1>

<p>

AI Career Learning Platform is an intelligent web application
designed to help students discover the right career path,
improve their technical skills and become industry-ready
through personalized AI guidance.

</p>

<div className="about-buttons">

<button
className="primary-btn"
onClick={()=>navigate("/register")}
>

Get Started

<FaArrowRight/>

</button>

<button
className="secondary-btn"
onClick={()=>{

document
.getElementById("mission")
?.scrollIntoView({
behavior:"smooth"
});

}}
>

Learn More

</button>

</div>

</div>

<div className="about-right">

<div className="hero-card">

<FaRobot/>

<h2>AI Career Platform</h2>

<p>

Personalized Learning

Career Recommendation

AI Mentor

Roadmaps

Study Planner

</p>

</div>

</div>

</section>

{/* =========================
Mission Vision
========================= */}

<section
id="mission"
className="mission-section"
>

<div className="mission-card">

<FaBullseye/>

<h2>

Our Mission

</h2>

<p>

To empower every student with Artificial Intelligence by providing personalized career recommendations, structured learning paths, intelligent mentoring and continuous guidance that transforms learning into career success.

</p>

</div>

<div className="mission-card">

<FaLightbulb/>

<h2>

Our Vision

</h2>

<p>

To become one of the leading AI-powered educational platforms where every student receives customized learning experiences, practical knowledge and career guidance regardless of their background.

</p>

</div>

</section>
      {/* ==========================================
            Platform Features
      ========================================== */}

      <section className="about-features">

        <div className="section-title">

          <span>Platform Features</span>

          <h2>

            Everything You Need To Build Your Career

          </h2>

          <p>

            Our platform combines Artificial Intelligence,
            career guidance and structured learning to help
            students become confident professionals.

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

      {/* ==========================================
            How It Works
      ========================================== */}

      <section className="process-section">

        <div className="section-title">

          <span>

            How Our Platform Works

          </span>

          <h2>

            Your Complete AI Learning Journey

          </h2>

          <p>

            Every student follows a structured pathway
            from registration to becoming career ready.

          </p>

        </div>

        <div className="process-grid">

          {

            process.map((step,index)=>(

              <div
                className="process-card"
                key={index}
              >

                <div className="process-number">

                  {String(index+1).padStart(2,"0")}

                </div>

                <h3>

                  {step}

                </h3>

              </div>

            ))

          }

        </div>

      </section>

      {/* ==========================================
            Why Choose Us
      ========================================== */}

      <section className="choose-section">

        <div className="choose-left">

          <span>

            Why Students Choose Us

          </span>

          <h2>

            One Platform.

            Complete Career Growth.

          </h2>

          <p>

            Instead of using multiple websites for
            learning, assessment, planning and guidance,
            our platform combines everything into one
            intelligent system.

          </p>

          <div className="choose-list">

            <div>

              <FaCheckCircle/>

              AI Powered Career Recommendation

            </div>

            <div>

              <FaCheckCircle/>

              Personalized Technology Roadmap

            </div>

            <div>

              <FaCheckCircle/>

              Daily Study Planner

            </div>

            <div>

              <FaCheckCircle/>

              AI Career Mentor

            </div>

            <div>

              <FaCheckCircle/>

              Progress Tracking Dashboard

            </div>

            <div>

              <FaCheckCircle/>

              Skill Assessments

            </div>

          </div>

        </div>

        <div className="choose-right">

          <div className="glass-card">

            <FaAward/>

            <h3>

              Learn Smarter With AI

            </h3>

            <p>

              Every recommendation, roadmap and lesson
              is generated specifically according to
              each student's educational background,
              current skills and career goals.

            </p>

          </div>

        </div>

      </section>
            {/* ==========================================
            Technologies
      ========================================== */}

      <section className="technology-section">

        <div className="section-title">

          <span>Technology Stack</span>

          <h2>

            Modern Technologies Behind The Platform

          </h2>

          <p>

            Our AI Career Learning Platform is built using
            modern web technologies to provide a fast,
            secure and intelligent learning experience.

          </p>

        </div>

        <div className="technology-grid">

          <div className="technology-card">

            <h3>

              Frontend

            </h3>

            <p>

              React.js

            </p>

            <p>

              HTML5

            </p>

            <p>

              CSS3

            </p>

          </div>

          <div className="technology-card">

            <h3>

              Backend

            </h3>

            <p>

              Node.js

            </p>

            <p>

              Express.js

            </p>

            <p>

              REST API

            </p>

          </div>

          <div className="technology-card">

            <h3>

              Database

            </h3>

            <p>

              MongoDB

            </p>

            <p>

              Mongoose

            </p>

          </div>

          <div className="technology-card">

            <h3>

              Artificial Intelligence

            </h3>

            <p>

              Groq API

            </p>

            <p>

              Llama 3.3 70B

            </p>

            <p>

              AI Career Mentor

            </p>

          </div>

        </div>

      </section>

      {/* ==========================================
            Student Journey
      ========================================== */}

      <section className="journey-section">

        <div className="section-title">

          <span>

            Student Journey

          </span>

          <h2>

            From Beginner To Professional

          </h2>

          <p>

            Our platform guides students through every
            important stage of their learning journey.

          </p>

        </div>

        <div className="journey-line">

          {

            process.map((step,index)=>(

              <div
                className="journey-step"
                key={index}
              >

                <div className="journey-circle">

                  {index+1}

                </div>

                <h4>

                  {step}

                </h4>

              </div>

            ))

          }

        </div>

      </section>

      {/* ==========================================
            Call To Action
      ========================================== */}

      <section className="cta-section">

        <div className="cta-content">

          <span>

            Ready To Build Your Career?

          </span>

          <h2>

            Start Your AI Learning Journey Today

          </h2>

          <p>

            Register today, complete your profile,
            receive AI-powered career recommendations,
            learn through personalized roadmaps and
            become industry ready with the help of
            your personal AI Career Mentor.

          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/register")}
          >

            Get Started

            <FaArrowRight/>

          </button>

        </div>

      </section>

      {/* ==========================================
            Footer
      ========================================== */}

     
   <Footer/>
    </div>

  );

};

export default AboutUs;