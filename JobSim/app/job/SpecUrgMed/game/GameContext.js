// app/job/SpecUrgMed/game/GameContext.jsx
import React, { createContext, useState } from 'react';

export const GameContext = createContext({
  flags: {},
  visited: [],
  setFlag: () => {},
  pushVisited: () => {},
});

export function GameProvider({ children }) {
  const [flags, setFlags] = useState({});
  const [visited, setVisited] = useState([]);

  const setFlag = (key, value = true) =>
    setFlags(f => ({ ...f, [key]: value }));
  const pushVisited = id =>
    setVisited(v => (v.includes(id) ? v : [...v, id]));

  return (
    <GameContext.Provider value={{ flags, visited, setFlag, pushVisited }}>
      {children}
    </GameContext.Provider>
  );
}
