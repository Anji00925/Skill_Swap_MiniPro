import '../styles/journey.css';
import { FaCheckCircle, FaLaptopCode, FaGuitar, FaTrophy } from 'react-icons/fa';

const journeyData = [
  {
    icon: <FaLaptopCode color="#1d4ed8" />,
    title: 'Learned React Basics',
    date: 'March 2025',
    description: 'Completed a swap session with Alex to learn React fundamentals.',
  },
  {
    icon: <FaGuitar color="#16a34a" />,
    title: 'Taught Guitar to Jane',
    date: 'April 2025',
    description: 'Helped Jane get started with acoustic guitar in 3 sessions.',
  },
  {
    icon: <FaTrophy color="#f59e0b" />,
    title: 'Top SkillSwapper Badge',
    date: 'May 2025',
    description: 'Awarded badge for completing 5+ successful skill swaps.',
  },
  {
    icon: <FaCheckCircle color="#9333ea" />,
    title: 'Joined Design Collab',
    date: 'June 2025',
    description: 'Collaborated with UI/UX designer for app prototype revamp.',
  },
];

export default function MyJourney() {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">📍 My Journey</h2>
      <div className="timeline">
        {journeyData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-icon">{item.icon}</div>
            <div className="timeline-content shadow-sm">
              <h5>{item.title}</h5>
              <small className="text-muted">{item.date}</small>
              <p className="mb-0">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
