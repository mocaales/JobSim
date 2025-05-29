// app/job/SpecUrgMed/game/_layout.jsx
import React from 'react';
import { Slot } from 'expo-router';
import { GameProvider } from './GameContext';

export default function GameLayout() {
  return (
    <GameProvider>
      <Slot />
    </GameProvider>
  );
}
