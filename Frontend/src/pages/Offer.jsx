import './Offer.css';
import { useState } from 'react';
import { FaUser, FaBrain, FaTags, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useSkills } from "../context/SkillsContext";

const Offer = () => {
  const { user, token } = useAuth();
  const { skillsList, setSkillsList } = useSkills();

  const [formData, setFormData] = useState({
    skill: '',
    description: '',
    tags: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token || !user) {
    alert("You must be logged in to publish a skill");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      name: user.name,
      skill: formData.skill,
      description: formData.description,
      tags: formData.tags,
      location: formData.location
    };

    const res = await axios.post(
      "http://localhost:5000/api/skills",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setSkillsList(prev => [...prev, res.data]);
    setSuccessMessage("Skill published successfully!");
    setFormData({ skill: "", description: "", tags: "", location: "" });
    setLoading(false);
  } catch (err) {
    console.error("Error adding skill:", err.response?.data || err);
    alert(err.response?.data?.message || "Failed to add skill");
    setLoading(false);
  }
};


  return (
    <div className="offer-page d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div className="offer-card p-4 rounded shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="mb-4 text-primary fw-bold text-center">Create Your Skill Card</h3>

        {successMessage && (
          <div className="alert alert-success text-center animate__animated animate__fadeInDown">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="offer-form">
          <div className="form-group mb-3">
            <label htmlFor="name" className="offer-label"><FaUser className="me-2" /> Name</label>
            <input type="text" id="name" value={user?.name || ""} className="form-control offer-input" readOnly />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="skill" className="offer-label"><FaBrain className="me-2" /> Skill</label>
            <input type="text" name="skill" id="skill" value={formData.skill} onChange={handleChange} className="form-control offer-input" required />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description" className="offer-label">Description</label>
            <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} className="form-control offer-input" required />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="tags" className="offer-label"><FaTags className="me-2" /> Tags</label>
            <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} className="form-control offer-input" placeholder="e.g., React, Node.js, Design" />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="location" className="offer-label"><FaMapMarkerAlt className="me-2" /> Location</label>
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="form-control offer-input" placeholder="City, Country" />
          </div>

          <button className="btn btn-primary w-100 rounded-pill fw-bold py-2" type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish My Skill'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Offer;
