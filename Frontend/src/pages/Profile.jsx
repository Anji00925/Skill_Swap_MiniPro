import './Profile.css';
import { FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import Virat_Kohli from '../assets/Virat_Kohli.png';

const user = {
  name: 'Virat Kohli',
  bio: 'Aspiring Full Stack Developer | Loves to teach Java & learn UI/UX',
  location: 'Warangal, Telangana',
  profileImg: '/assets/user-placeholder.png',
  offeredSkills: ['Java Basics', 'Data Structures', 'Git & GitHub'],
  learningSkills: ['UI/UX Design', 'Advanced JavaScript', 'Communication Skills'],
};

const Profile = () => {
  return (
    <div className="container py-5 profile-page">
      <div className="d-flex flex-column flex-md-row align-items-center mb-5">
        <img
          src={Virat_Kohli}
          alt="Profile"
          className="rounded-circle profile-pic mb-3 mb-md-0"
        />
        <div className="ms-md-4 text-center text-md-start">
          <h2 className="fw-bold">{user.name}</h2>
          <p className="text-muted">{user.bio}</p>
          <p className="text-secondary">
            <FaMapMarkerAlt className="me-2" />
            {user.location}
          </p>
          <button className="btn btn-outline-primary rounded-pill">
            <FaEdit className="me-2" /> Edit Profile
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="fw-semibold text-success">📤 Skills You’re Offering</h4>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {user.offeredSkills.map((skill, i) => (
            <span className="badge bg-primary-subtle text-primary-emphasis p-2" key={i}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="fw-semibold text-warning">📥 Skills You’re Learning</h4>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {user.learningSkills.map((skill, i) => (
            <span className="badge bg-warning-subtle text-warning-emphasis p-2" key={i}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
