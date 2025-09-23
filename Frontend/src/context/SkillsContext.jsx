// src/context/SkillsContext.jsx
import { createContext, useContext, useState } from "react";

const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [skillsList, setSkillsList] = useState([]);

  return (
    <SkillsContext.Provider value={{ skillsList, setSkillsList }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => useContext(SkillsContext);
