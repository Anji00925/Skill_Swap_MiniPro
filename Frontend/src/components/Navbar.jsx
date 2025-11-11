// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import './Navbar.css';
// import logo from '../assets/logo.jpeg';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/signin");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
//       <div className="container-fluid px-3">
//         {/* Brand Logo */}
//         <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold me-auto me-lg-0">
//           <img src={logo} alt="logo" className="brand-logo" />
//           SkillSwap
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <button className="navbar-toggler bg-light" type="button" onClick={toggleMenu}>
//           <span className="navbar-toggler-icon" />
//         </button>

//         {/* Nav Links */}
//         <div className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`}>
//           <ul className="navbar-nav gap-lg-4 text-center my-2 my-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link nav-link-style" to="/">Dashboard</Link>
//             </li>

//             {user && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link nav-link-style" to="/offer">Offer a Skill</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link nav-link-style" to="/seek">Seek a Skill</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link nav-link-style" to="/my-journey">My Journey</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>

//         {/* Profile & Auth Buttons */}
//         <div className={`d-flex align-items-center gap-3 ${isOpen ? 'w-100 justify-content-center mt-2' : ''}`}>
//           {user ? (
//             <>
//               <Link to="/profile" className="nav-link nav-link-style text-white">👤</Link>
//               <button onClick={handleLogout} className="btn btn-outline-light logout-btn">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link className="btn btn-light logout-btn" to="/signin">Sign In</Link>
//               <Link className="btn btn-outline-light logout-btn" to="/signup">Sign Up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// ###########################################################################################################################################


import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  console.log("NAVBAR USER:", user);


  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container-fluid px-3">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold me-auto me-lg-0">
          <img src={logo} alt="logo" className="brand-logo" />
          SkillSwap
        </Link>

        <button className="navbar-toggler bg-light" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav gap-lg-4 text-center my-2 my-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-style" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-style" to="/offer">Offer a Skill</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-style" to="/seek">Seek a Skill</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-style" to="/my-journey">My Journey</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-style" to="/skillsset">Skills Set</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={`d-flex align-items-center gap-3 ${isOpen ? 'w-100 justify-content-center mt-2' : ''}`}>
          {user ? (
            <>
              <span className="text-white">Hi, {user.name}</span>

              <button onClick={logout} className="btn btn-outline-light logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline-light">Sign In</Link>
              <Link to="/signup" className="btn btn-light">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
