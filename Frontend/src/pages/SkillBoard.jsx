import './SkillBoard.css';
import { FaMapMarkerAlt, FaTag, FaUserPlus } from 'react-icons/fa';

const sampleSkills = [
  {
    id: 1,
    name: 'Ravi Teja',
    skill: 'UI/UX Design',
    description: 'I’ll teach you the basics of Figma and how to create landing pages from scratch.',
    tags: ['Figma', 'Design', 'Portfolio'],
    location: 'Hyderabad',
  },
  {
    id: 2,
    name: 'Sneha Agarwal',
    skill: 'Python for Beginners',
    description: 'I’ll help you get started with Python, variables, loops, and basic projects.',
    tags: ['Python', 'Programming', 'Logic'],
    location: 'Remote',
  },
  {
    id: 3,
    name: 'Mohit Sharma',
    skill: 'Public Speaking',
    description: 'Want to get over stage fear? I’ll teach you techniques to speak with confidence.',
    tags: ['Communication', 'Confidence', 'Voice'],
    location: 'Mumbai',
  },
];

const SkillBoard = () => {
  const handleConnect = (name, skill) => {
    alert(` Connection request sent to ${name} for "${skill}"`);
  };

  return (
    <div className="container py-5 skillboard-container">
      <h2 className="text-center fw-bold mb-4 text-primary">🎯 Explore Shared Skills</h2>
      <div className="row g-4">
        {sampleSkills.map((skill) => (
          <div className="col-12 col-md-6 col-lg-4" key={skill.id}>
            <div className="card skill-card h-100 shadow-sm border-0 d-flex flex-column">
              <div className="card-body flex-grow-1">
                <h5 className="card-title text-dark">{skill.skill}</h5>
                <p className="text-muted small">By <strong>{skill.name}</strong></p>
                <p className="card-text">{skill.description}</p>

                <div className="d-flex flex-wrap gap-2 mb-2">
                  {skill.tags.map((tag, index) => (
                    <span className="badge rounded-pill text-bg-primary small-tag" key={index}>
                      <FaTag className="me-1" /> {tag}
                    </span>
                  ))}
                </div>

                <p className="small text-secondary mb-0">
                  <FaMapMarkerAlt className="me-1" /> {skill.location}
                </p>
              </div>

              <div className="card-footer bg-transparent border-0 text-center mt-auto">
                <button
                  className="btn btn-outline-success rounded-pill px-4 py-2 fw-semibold connect-btn"
                  onClick={() => handleConnect(skill.name, skill.skill)}
                >
                  <FaUserPlus className="me-2" /> Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBoard;
