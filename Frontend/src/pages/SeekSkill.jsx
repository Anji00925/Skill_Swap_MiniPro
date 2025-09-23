// import './SeekSkill.css';
// import { useState } from 'react';
// import { FaSearch, FaTag, FaMapMarkerAlt, FaUserPlus } from 'react-icons/fa';

// const sampleSkills = [
//   {
//     id: 1,
//     name: 'Ravi Teja',
//     skill: 'UI/UX Design',
//     description: 'I’ll teach you the basics of Figma and how to create landing pages from scratch.',
//     tags: ['Figma', 'Design', 'Portfolio'],
//     location: 'Hyderabad',
//   },
//   {
//     id: 2,
//     name: 'Sneha Agarwal',
//     skill: 'Python for Beginners',
//     description: 'Start your programming journey with Python.',
//     tags: ['Programming', 'Python'],
//     location: 'Remote',
//   },
//   {
//     id: 3,
//     name: 'Mohit Sharma',
//     skill: 'Public Speaking',
//     description: 'Overcome stage fear and speak with confidence.',
//     tags: ['Soft Skills', 'Confidence'],
//     location: 'Mumbai',
//   },
// ];

// const categories = ['All', 'Design', 'Programming', 'Soft Skills', 'Music', 'Languages'];

// const SeekSkill = () => {
//   const [query, setQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const filteredSkills = sampleSkills.filter((skill) => {
//     const inCategory =
//       selectedCategory === 'All' || skill.tags.includes(selectedCategory);
//     const matchesSearch =
//       skill.skill.toLowerCase().includes(query.toLowerCase()) ||
//       skill.description.toLowerCase().includes(query.toLowerCase()) ||
//       skill.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
//     return inCategory && matchesSearch;
//   });

//   return (
//     <div className="container py-5 seek-page">
//       <h2 className="text-center mb-4 fw-bold text-success">🔍 Seek a Skill</h2>

//       {/* Search Input */}
//       <div className="mb-4 d-flex justify-content-center">
//         <div className="input-group w-75 shadow-sm">
//           <span className="input-group-text bg-light">
//             <FaSearch />
//           </span>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search skills like Python, Design, Public Speaking..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Category Chips */}
//       <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className={`btn btn-sm category-btn ${
//               selectedCategory === cat ? 'active' : ''
//             }`}
//             onClick={() => setSelectedCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Results */}
//       <div className="row g-4">
//         {filteredSkills.length > 0 ? (
//           filteredSkills.map((skill) => (
//             <div className="col-12 col-md-6 col-lg-4" key={skill.id}>
//               <div className="card h-100 shadow-sm skill-card border-0 d-flex flex-column">
//                 <div className="card-body flex-grow-1">
//                   <h5 className="card-title fw-bold text-dark">{skill.skill}</h5>
//                   <p className="small text-muted mb-2">By {skill.name}</p>
//                   <p className="card-text">{skill.description}</p>

//                   <div className="d-flex flex-wrap gap-2 mb-2">
//                     {skill.tags.map((tag, i) => (
//                       <span key={i} className="badge bg-success-subtle text-success-emphasis">
//                         <FaTag className="me-1" /> {tag}
//                       </span>
//                     ))}
//                   </div>

//                   <p className="small text-secondary mb-0">
//                     <FaMapMarkerAlt className="me-1" /> {skill.location}
//                   </p>
//                 </div>

//                 <div className="card-footer bg-transparent border-0 text-center mt-auto">
//                   <button
//                     className="btn btn-outline-success rounded-pill px-4 py-2 fw-semibold connect-btn"
//                     onClick={() =>
//                       alert(` Connection request sent to ${skill.name} for "${skill.skill}"`)
//                     }
//                   >
//                     <FaUserPlus className="me-2" /> Connect
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No skills found. Try another search!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SeekSkill;



// src/pages/SeekSkill.jsx
import "./SeekSkill.css";
import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaTag, FaMapMarkerAlt, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { sendConnectionRequest } from "../api/connections";

const categories = ["All", "Design", "Programming", "Soft Skills", "Music", "Languages"];

const SeekSkill = () => {
  const { user, token } = useAuth();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [skills, setSkills] = useState([]);
  const [sendingTo, setSendingTo] = useState(null); // recipientId while sending
  const [requested, setRequested] = useState(() => new Set()); // recipientIds sent this session
  const [toast, setToast] = useState("");

  // Fetch ALL public skills (every user)
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skills");
        // Normalize into what Seek UI expects
        const normalized = res.data.map((s) => ({
  id: s._id,
  name: s.user?.name || "Unknown",
  skill: s.skill || "", // use "skill" from schema
  description: s.description || "",
  tags: (s.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean),
  location: s.location || "",
  ownerId: s.user?._id || null,
}));

        setSkills(normalized);
      } catch (err) {
        console.error("Error loading skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const inCategory =
        selectedCategory === "All" || skill.tags.includes(selectedCategory);
      const needle = query.toLowerCase();
      const matchesSearch =
        skill.skill.toLowerCase().includes(needle) ||
        skill.description.toLowerCase().includes(needle) ||
        skill.tags.some((t) => t.toLowerCase().includes(needle)) ||
        skill.name.toLowerCase().includes(needle);
      return inCategory && matchesSearch;
    });
  }, [skills, query, selectedCategory]);
  console.log("user:", user);
console.log("token:", token);


//   const handleConnect = async (recipientId, displayName, skillTitle) => {
//   if (!user || !token) {
//     alert("Please sign in to send a connection request.");
//     return;
//   }

//   if (!recipientId) return;
//   if (recipientId === user._id) {
//     alert("You can’t connect to yourself.");
//     return;
//   }
//   if (requested.has(recipientId)) {
//     return; // already sent this session
//   }

//   try {
//     setSendingTo(recipientId);
//     await sendConnectionRequest(recipientId, token, skillTitle );
//  // ✅ fixed args
//     const next = new Set(requested);
//     next.add(recipientId);
//     setRequested(next);
//     setToast(`✅ Connection request sent successfully to ${displayName} for “${skillTitle}”`);
//     setTimeout(() => setToast(""), 3000);
//   } catch (err) {
//     console.error("Send request failed:", err);
//     alert(err?.response?.data?.message || "Failed to send request.");
//   } finally {
//     setSendingTo(null);
//   }
// };

const handleConnect = async (recipientId, displayName, skill) => {
  if (!user || !token) {
    alert("Please sign in to send a connection request.");
    return;
  }

  if (!recipientId) return;
  if (recipientId === user._id) {
    alert("You can’t connect to yourself.");
    return;
  }
  if (requested.has(recipientId)) {
    return; // already sent this session
  }

  try {
    setSendingTo(recipientId);
    // ✅ pass skillTitle as string
    await sendConnectionRequest(recipientId, token, skill);

    const next = new Set(requested);
    next.add(recipientId);
    setRequested(next);

    setToast(
      `✅ Connection request sent successfully to ${displayName} for “${skill}”`
    );
    setTimeout(() => setToast(""), 3000);
  } catch (err) {
    console.error("Send request failed:", err);
    alert(err?.response?.data?.message || "Failed to send request.");
  } finally {
    setSendingTo(null);
  }
};




  return (
    <div className="container py-5 seek-page">
      <h2 className="text-center mb-4 fw-bold text-success">🔍 Seek a Skill</h2>

      {/* Toast */}
      {toast && (
        <div className="alert alert-success text-center mb-4">{toast}</div>
      )}

      {/* Search Input */}
      <div className="mb-4 d-flex justify-content-center">
        <div className="input-group w-75 shadow-sm">
          <span className="input-group-text bg-light">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search skills like Python, Design, Public Speaking..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="row g-4">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div className="col-12 col-md-6 col-lg-4" key={skill.id}>
              <div className="card h-100 shadow-sm skill-card border-0 d-flex flex-column">
                <div className="card-body flex-grow-1">
                  <h5 className="card-title fw-bold text-dark">{skill.skill}</h5>
                  <p className="small text-muted mb-2">By {skill.name}</p>
                  <p className="card-text">{skill.description}</p>

                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {skill.tags.map((tag, i) => (
                      <span key={i} className="badge bg-success-subtle text-success-emphasis">
                        <FaTag className="me-1" /> {tag}
                      </span>
                    ))}
                  </div>

                  {skill.location && (
                    <p className="small text-secondary mb-0">
                      <FaMapMarkerAlt className="me-1" /> {skill.location}
                    </p>
                  )}
                </div>

                <div className="card-footer bg-transparent border-0 text-center mt-auto">
                  <button
                    className="btn btn-outline-success rounded-pill px-4 py-2 fw-semibold connect-btn"
                    disabled={
                      !user ||
                      !skill.ownerId ||
                      skill.ownerId === user._id ||
                      requested.has(skill.ownerId) ||
                      sendingTo === skill.ownerId
                    }
                    onClick={() =>
                      handleConnect(skill.ownerId, skill.name, skill.skill)
                    }
                  >
                    <FaUserPlus className="me-2" />
                    {requested.has(skill.ownerId)
                      ? "Requested"
                      : sendingTo === skill.ownerId
                      ? "Sending..."
                      : "Connect"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No skills found. Try another search!</p>
        )}
      </div>
    </div>
  );
};

export default SeekSkill;
