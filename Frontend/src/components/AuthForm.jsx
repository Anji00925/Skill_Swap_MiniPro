
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; 

// export default function AuthForm({ type }) {
//   const isSignIn = type === 'signin';
//   const [formData, setFormData] = useState({ email: '', password: '', name: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const { login } = useAuth(); 

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//   e.preventDefault();
//   try {
//     let res;
//     if (isSignIn) {
//       res = await axios.post("http://localhost:5000/api/users/login", {
//         email: formData.email,
//         password: formData.password
//       });
//     } else {
//       res = await axios.post("http://localhost:5000/api/users/register", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });
//     }

//     // Pass entire response object to login
//     login(res.data);
//     navigate("/");
//   } catch (error) {
//     setMessage(error.response?.data?.message || "Something went wrong");
//   }
// };


//   return (
//     <form onSubmit={handleSubmit} className="auth-form">
//       <h2 className="mb-4 text-primary">
//         {isSignIn ? 'Welcome Back!' : 'Create Account'}
//       </h2>

//       {!isSignIn && (
//         <input
//           type="text"
//           name="name"
//           className="form-control mb-3 auth-input"
//           placeholder="Full Name"
//           onChange={handleChange}
//           required
//         />
//       )}
//       <input
//         type="email"
//         name="email"
//         className="form-control mb-3 auth-input"
//         placeholder="Email"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         className="form-control mb-4 auth-input"
//         placeholder="Password"
//         onChange={handleChange}
//         required
//       />
//       <button type="submit" className="pill-btn w-100">
//         {isSignIn ? 'Sign In' : 'Sign Up'}
//       </button>

//       {message && <p className="mt-3 text-center">{message}</p>}
//     </form>
//   );
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

export default function AuthForm({ type }) {
  const isSignIn = type === 'signin';
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let res;
      if (isSignIn) {
        res = await axios.post("http://localhost:5000/api/users/login", {
          email: formData.email,
          password: formData.password
        });
      } else {
        res = await axios.post("http://localhost:5000/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      // ✅ split token and user info before saving
      const { token, ...userData } = res.data;
      login({ token, user: userData });


      console.log("LOGIN SUCCESS:", { token, userData });
      navigate("/"); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="mb-4 text-primary">
        {isSignIn ? 'Welcome Back!' : 'Create Account'}
      </h2>

      {!isSignIn && (
        <input
          type="text"
          name="name"
          className="form-control mb-3 auth-input"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        className="form-control mb-3 auth-input"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        className="form-control mb-4 auth-input"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit" className="pill-btn w-100">
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </button>

      {message && <p className="mt-3 text-center text-danger">{message}</p>}
    </form>
  );
}
