


// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       const storedToken = localStorage.getItem("token");

//       if (storedUser && storedUser !== "undefined" && storedToken) {
//         setUser(JSON.parse(storedUser));
//         setToken(storedToken);
//       }
//     } catch (err) {
//       console.error("Invalid user JSON in localStorage:", err);
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     }
//   }, []);

//   const login = (data) => {
//   const { user, token } = data;
//   setUser(user);
//   setToken(token);
//   localStorage.setItem("user", JSON.stringify(user));
//   localStorage.setItem("token", token);
// };


//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedUser !== "undefined" && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Invalid user JSON in localStorage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const login = (data) => {
    // Some backends return `data.user`, others `data`
    const loggedInUser = data.user || data;
    const loggedInToken = data.token;

    if (!loggedInUser || !loggedInUser._id || !loggedInToken) {
      console.error("Invalid login response", data);
      return;
    }

    setUser(loggedInUser);
    setToken(loggedInToken);

    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("token", loggedInToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
