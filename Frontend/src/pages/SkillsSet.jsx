// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSkills } from "../context/SkillsContext";
// import { useAuth } from "../context/AuthContext";

// const SkillsSet = () => {
//   const { skillsList, setSkillsList } = useSkills();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       setSkillsList([]); // clear list
//       navigate("/"); // go to dashboard
//       return;
//     }

//     const fetchSkills = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/api/skills");
//     const userSkills = res.data.filter(skill => skill.user?._id === user._id);
//     setSkillsList(userSkills);
//   } catch (err) {
//     console.error("Error fetching skills:", err);
//   }
// };


//     fetchSkills();
//   }, [user, setSkillsList, navigate]);

//   if (!user) return null; // don't render content while redirecting

//   return (
//     <div className="container mt-5">
//       <h2 className="text-primary fw-bold mb-4">📋 All Skills</h2>
//       {skillsList.length === 0 ? (
//         <p>No skills added yet.</p>
//       ) : (
//         <div className="row">
//           {skillsList.map((skill, index) => (
//             <div key={index} className="col-md-4 mb-3">
//               <div className="card p-3 shadow-sm">
//                 <h5>{skill.title}</h5>
//                 <p>{skill.description}</p>
//                 {skill.category && (
//                   <div>
//                     {skill.category.split(",").map((tag, i) => (
//                       <span key={i} className="badge bg-primary me-2">
//                         {tag.trim()}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//                 <br />
//                 <strong>- {skill.user?.name || "Unknown"}</strong>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillsSet;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSkills } from "../context/SkillsContext";
import { useAuth } from "../context/AuthContext";
import "./SkillsSet.css";

const SkillsSet = () => {
  const { skillsList, setSkillsList } = useSkills();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setSkillsList([]); 
      navigate("/"); 
      return;
    }

    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skills");
        const userSkills = res.data.filter((skill) => skill.user?._id === user._id);
        setSkillsList(userSkills);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, [user, setSkillsList, navigate]);

  if (!user) return null;

  return (
    <div className="skills-container">
      <h2 className="skills-heading">📋 My Skills</h2>
      {skillsList.length === 0 ? (
        <p className="no-skills">No skills added yet.</p>
      ) : (
        <div className="skills-grid">
          {skillsList.map((skill, index) => (
            <div key={index} className={`skill-card card-${(index % 6) + 1}`}>
              <h3>{skill.title || skill.skill}</h3>
              <p>{skill.description}</p>
              {skill.category && (
                <div className="tags">
                  {skill.category.split(",").map((tag, i) => (
                    <span key={i} className="tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              <strong className="author">– {skill.user?.name || "Unknown"}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSet;
