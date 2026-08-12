import "./Contact.css";

import { useNavigate } from "react-router-dom";

import {

FaRobot,
FaEnvelope,
FaPhoneAlt,
FaMapMarkerAlt,
FaClock,
FaArrowRight,
FaComments,
FaCheckCircle,
FaPaperPlane,
FaHeadset,
FaQuestionCircle

} from "react-icons/fa";
import Footer from "../Footer/Footer";

const Contact = () => {

const navigate = useNavigate();

const contactCards=[

{
icon:<FaMapMarkerAlt/>,
title:"Address",
text:"Sindh University Jamshoro, Pakistan"
},

{
icon:<FaPhoneAlt/>,
title:"Phone",
text:"+92 XXX XXXXXXX"
},

{
icon:<FaEnvelope/>,
title:"Email",
text:"support@aicareer.com"
},

{
icon:<FaClock/>,
title:"Working Hours",
text:"Monday - Saturday (9:00 AM - 6:00 PM)"
}

];

const support=[

"Career Guidance",
"Study Planner Help",
"AI Career Mentor",
"Technical Support",
"Account Recovery",
"Feedback & Suggestions"

];

return(

<div className="contact-page">

{/* Hero Section */}

<section className="contact-hero">

<div className="contact-left">

<span className="contact-badge">

<FaRobot/>

Contact Our Team

</span>

<h1>

Need Help?

<span>

We're Here For You

</span>

</h1>

<p>

Whether you have questions about AI Career Recommendation,
Study Planner, AI Mentor or your learning roadmap,
our team is always ready to help you succeed.

</p>

<div className="hero-buttons">

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
.getElementById("contactForm")
?.scrollIntoView({
behavior:"smooth"
});

}}

>

Send Message

</button>

</div>

</div>

<div className="contact-right">

<div className="contact-card">

<div className="robot-circle">

<FaRobot/>

</div>

<h2>

AI Career Platform

</h2>

<p>

Your intelligent companion for learning,
career guidance and professional growth.

</p>

<div className="contact-mini">

<div>

<FaEnvelope/>

support@aicareer.com

</div>

<div>

<FaComments/>

24/7 AI Mentor

</div>

<div>

<FaCheckCircle/>

Always Ready To Help

</div>

</div>

</div>

</div>

</section>

{/* Contact Cards */}

<section className="contact-info">

{

contactCards.map((item,index)=>(

<div
className="info-card"
key={index}
>

<div className="info-icon">

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

</section>
      {/* =====================================
            Contact Form
      ===================================== */}

      <section
        id="contactForm"
        className="contact-form-section"
      >

        <div className="form-left">

          <span>

            Send Us A Message

          </span>

          <h2>

            We'd Love To Hear From You

          </h2>

          <p>

            Have questions about career recommendations,
            AI Mentor, Study Planner or technical issues?
            Fill out the form and we'll get back to you
            as soon as possible.

          </p>

          <div className="support-list">

            {

              support.map((item,index)=>(

                <div key={index}>

                  <FaCheckCircle/>

                  {item}

                </div>

              ))

            }

          </div>

        </div>

        <div className="form-right">

          <form>

            <div className="input-group">

              <input
                type="text"
                placeholder="Full Name"
              />

              <input
                type="email"
                placeholder="Email Address"
              />

            </div>

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="7"
              placeholder="Write your message..."
            />

            <button
              type="submit"
              className="primary-btn"
            >

              <FaPaperPlane/>

              Send Message

            </button>

          </form>

        </div>

      </section>

      {/* =====================================
            Why Contact Us
      ===================================== */}

      <section className="help-section">

        <div className="section-title">

          <span>

            Why Contact Us

          </span>

          <h2>

            We're Always Ready To Help

          </h2>

          <p>

            Whether you're a beginner or already learning,
            our platform provides complete assistance at
            every stage of your career journey.

          </p>

        </div>

        <div className="help-grid">

          <div className="help-card">

            <FaRobot/>

            <h3>

              AI Career Mentor

            </h3>

            <p>

              Receive personalized guidance and answers
              from your intelligent AI learning assistant.

            </p>

          </div>

          <div className="help-card">

            <FaHeadset/>

            <h3>

              Technical Support

            </h3>

            <p>

              Facing any issue while using the platform?
              Our support team is ready to help.

            </p>

          </div>

          <div className="help-card">

            <FaQuestionCircle/>

            <h3>

              Career Guidance

            </h3>

            <p>

              Get help understanding your career
              recommendations, roadmap and study plan.

            </p>

          </div>

        </div>

      </section>  
            {/* =====================================
            Frequently Asked Questions
      ===================================== */}

      <section className="faq-section">

        <div className="section-title">

          <span>

            Frequently Asked Questions

          </span>

          <h2>

            Find Answers To Common Questions

          </h2>

          <p>

            Here are some common questions students ask
            about our AI Career Learning Platform.

          </p>

        </div>

        <div className="faq-container">

          <div className="faq-card">

            <h3>

              How do I get a Career Recommendation?

            </h3>

            <p>

              Simply register, complete your student
              profile and take the AI Skill Assessment.
              Our AI will analyze your profile and
              generate a personalized career
              recommendation.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              Can I change my learning roadmap?

            </h3>

            <p>

              Yes. Whenever your skills improve or you
              complete technologies, the platform can
              generate a new personalized roadmap based
              on your latest progress.

            </p>

          </div>

          <div className="faq-card">

            <h3>

              How does the AI Mentor help me?

            </h3>

            <p>

              The AI Mentor teaches concepts, answers
              programming questions, continues your
              lessons, provides quizzes and guides you
              throughout your learning journey.

            </p>

          </div>

        </div>

      </section>

      {/* =====================================
            Call To Action
      ===================================== */}

      <section className="contact-cta">

        <div className="cta-content">

          <span>

            Ready To Start?

          </span>

          <h2>

            Build Your Career With Artificial Intelligence

          </h2>

          <p>

            Join thousands of learners who are improving
            their technical skills through personalized
            AI recommendations, study planning and
            intelligent mentoring.

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

      {/* =====================================
            Footer
      ===================================== */}

      
    <Footer/>
    </div>

  );

};

export default Contact;