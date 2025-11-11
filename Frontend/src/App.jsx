// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Offer from "./pages/Offer";
// import SeekSkill from "./pages/SeekSkill";
// import Profile from "./pages/Profile";
// import Navbar from "./components/Navbar";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Connections from "./pages/Connections";
// import MyJourney from "./pages/MyJourney";
// import SkillsSet from "./pages/Skillsset";

// function App() {
//   return (
//     <>
//       <div className="wave-bg" />
//       <Navbar />
//       <div className="container mt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="Offer" element={<Offer />} />
//           <Route path="skillsset" element={<SkillsSet />} />
//           <Route path="Seek" element={<SeekSkill />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/connections" element={<Connections />} />
//           <Route path="/my-journey" element={<MyJourney />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SeekSkill from "./pages/SeekSkill";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Connections from "./pages/Connections";
import MyJourney from "./pages/MyJourney";
import SkillsSet from "./pages/Skillsset";
import ChatBox from "./components/ChatBox";
import ChatPage from "./pages/ChatPage";
import ChatsListPage from "./pages/ChatsListPage";
import UserList from "./components/UserList";
import { getUsers } from "./api/users";

function App() {
  return (
    <AuthProvider>
      <div className="wave-bg" />
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="offer" element={<Offer />} />
          <Route path="skillsset" element={<SkillsSet />} />
          <Route path="seek" element={<SeekSkill />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/my-journey" element={<MyJourney />} />
          <Route path="/chat" element={<ChatBox />} />
          {/* <Route path="/chatt" element={<ChatPage />} /> */}

          <Route path="/chats" element={<ChatsListPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
