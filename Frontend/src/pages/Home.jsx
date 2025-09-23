


import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRocket, FaCompass, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getConnections, 
  getPendingForMe, 
  acceptRequest, 
  rejectRequest 
} from '../api/connections';

const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth(); // ✅ make sure your AuthContext provides token

  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchConnections();
      fetchPending();
    }
  }, [user, token]);

  const fetchConnections = async () => {
    try {
      const data = await getConnections(user._id, token);
      setConnections(data);
    } catch (err) {
      console.error('Error fetching connections:', err);
    }
  };

  const fetchPending = async () => {
    try {
      const data = await getPendingForMe(user._id, token);
      setPending(data);
    } catch (err) {
      console.error('Error fetching pending:', err);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptRequest(id, token);
      fetchConnections();
      fetchPending();
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id, token);
      fetchPending();
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  return (
    <div className="container my-5 px-3 home-page">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Welcome to SkillSwap</h1>
        <p className="lead text-muted">Learn. Teach. Connect — all for free!</p>
      </div>

      {/* Floating Connections Button */}
      <button className="total-connects-btn" onClick={() => setShowModal(true)}>
        <FaHeart color="#dc3545" />
        Connections ({connections.length})
      </button>

      {/* <Link to="/connections" className="total-connects-btn">
          <FaHeart color="#dc3545" />
          Connections ({connections.length})
      </Link> */}

      {/* Connections Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Your Connections</h4>
            <ul>
              {connections.map((c) => (
                <li key={c._id}>
                  {c.requester.name} ↔ {c.recipient.name}
                </li>
              ))}
              {connections.length === 0 && <p className="text-muted">No connections yet</p>}
            </ul>

            <h4 className="mt-3">Pending Requests</h4>
            <ul>
              
              {pending.map((p) => (
  <li key={p._id} className="d-flex justify-content-between align-items-center">
    <span>{p.requester.name} wants to connect "{p.skill}"</span>
    <div>
      <button 
        className="btn btn-sm btn-success me-2" 
        onClick={() => handleAccept(p._id)}
      >
        Accept
      </button>
      <button 
        className="btn btn-sm btn-danger" 
        onClick={() => handleReject(p._id)}
      >
        Reject
      </button>
    </div>
  </li>
))}

              {pending.length === 0 && <p className="text-muted">No pending requests</p>}
            </ul>

            <button className="btn btn-secondary mt-3" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Existing Home Page Content */}
      <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-5">
        <Link 
          to="/offer" 
          className="btn btn-primary px-4 py-2 rounded-pill fw-medium d-flex align-items-center justify-content-center gap-2"
        >
          <FaRocket /> Get Started
        </Link>
        <Link 
          to="/skillboard" 
          className="btn btn-outline-dark px-4 py-2 rounded-pill fw-medium d-flex align-items-center justify-content-center gap-2"
        >
          <FaCompass /> Explore Skills
        </Link>
      </div>

      {/* Cards Section */}
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100 feature-card">
            <div className="card-body">
              <h5 className="card-title text-info">Teach What You Know</h5>
              <p className="card-text text-secondary">
                Share your knowledge in coding, design, language, or any skill you have.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100 feature-card">
            <div className="card-body">
              <h5 className="card-title text-success">Learn What You Love</h5>
              <p className="card-text text-secondary">
                Find and connect with people who can help you grow through their skills.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mx-md-auto">
          <div className="card border-0 shadow-sm h-100 feature-card">
            <div className="card-body">
              <h5 className="card-title text-warning">Make Real Connections</h5>
              <p className="card-text text-secondary">
                Meet learners like you and build strong learning partnerships across campuses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
