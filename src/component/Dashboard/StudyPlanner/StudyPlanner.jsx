import { useEffect, useState } from "react";
import "./StudyPlanner.css";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaBook,
  FaBullseye,
} from "react-icons/fa";

import {
  generateStudyPlanner,
  getStudyPlanner,
} from "../../../api/studyPlannerApi";


const StudyPlanner = () => {


  const [planner, setPlanner] = useState([]);

  const [loading, setLoading] = useState(true);



  // ==========================================
  // Load Planner
  // ==========================================


  const loadPlanner = async () => {


    try {


      let res = await getStudyPlanner();



      if (!res.planner || res.planner.length === 0) {


        await generateStudyPlanner();


        res = await getStudyPlanner();


      }



      setPlanner(res.planner);



    } catch (error) {


      console.log(error);



    } finally {


      setLoading(false);



    }



  };




  useEffect(() => {


    loadPlanner();



  }, []);




  if (loading) {


    return (

      <div className="planner-loading">

        Loading Study Planner...

      </div>

    );


  }




  const total = planner.length;




  const completed = planner.filter(

    item => item.status === "Completed"

  ).length;




  const inProgress = planner.filter(

    item => item.status === "In Progress"

  ).length;




const progress =
  planner.length === 0
    ? 0
    : Math.round(
        planner.reduce(
          (sum, tech) => sum + tech.progress,
          0
        ) / planner.length
      );
        return (


    <div className="planner-page">



      {/* Banner */}



      <div className="planner-banner">



        <h2>

          <FaCalendarAlt />

          Study Planner

        </h2>



        <p>

          AI automatically updates your learning roadmap after every assessment.

        </p>



      </div>






      {/* Summary */}





      <div className="planner-summary">





        <div className="summary-card">



          <FaBook />



          <h3>{total}</h3>



          <p>Total Technologies</p>



        </div>






        <div className="summary-card">



          <FaCheckCircle />



          <h3>{completed}</h3>



          <p>Completed</p>



        </div>






        <div className="summary-card">



          <FaClock />



          <h3>{inProgress}</h3>



          <p>In Progress</p>



        </div>






        <div className="summary-card">



          <FaBullseye />



          <h3>{progress}%</h3>



          <p>Overall Progress</p>



        </div>






      </div>







      {/* Planner */}





      <div className="planner-card">



        <h3>Your AI Learning Roadmap</h3>





        {



          planner.map((tech) => (



            <div

              key={tech._id}

              className={`technology-card ${

                tech.status === "Completed"

                  ? "completed-card"

                  : tech.status === "In Progress"

                  ? "progress-card"

                  : "locked-card"

              }`}

            >



              {/* Header */}



              <div className="technology-header">

                <h2>{tech.language}</h2>



                <span

                  className={tech.status

                    .toLowerCase()

                    .replace(" ", "-")}

                >

                  {tech.status}

                </span>



              </div>






              {/* Progress Bar */}





              <div className="progress-wrapper">



                <div

                  className="progress-fill"

                  style={{

                    width: `${tech.progress}%`

                  }}

                ></div>



              </div>






              {/* Weeks */}





              <div className="technology-tasks">

                 <h4 className="today-heading">
                    Today's Lesson
                 </h4>

                {



                  tech.tasks.map((task, index) => (



                    <div

                      key={index}

                      className={`task-row ${

                        index + 1 < tech.currentDay

                          ? "completed-task"

                          : index + 1 === tech.currentDay

                          ? "current-task"

                          : "future-task"

                      }`}

                    >




                      <span>



                        Week {index + 1}



                      </span>





                      <p>{task}</p>




                    </div>



                  ))



                }



              </div>







              {/* Footer */}





              <div className="planner-score">





                <div style={{ marginTop: "8px" }}>
                    <strong>Completed :</strong>{" "}
                     {tech.completedDays}/{tech.totalDays}
                  </div>




         <div style={{ marginTop: "8px" }}>
          <strong>Progress :</strong>{" "}
          {tech.progress}%
          </div>






        {
                  tech.quizTaken && (
                   <div style={{ marginTop: "8px" }}>
                  <strong>Assessment Score :</strong>{" "}
                    {tech.quizScore}%
    </div>
           )
        }

              </div>

            </div>
          ))

        }





      </div>





    </div>



  );



};



export default StudyPlanner;