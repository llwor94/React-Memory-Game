import React, {useState} from 'react';
import './App.css';
import Game from './cardsGame'
import GameContext from './gameCtx';
function App() {
 
  return (
    <div className="App">
    <h1>Flippy Time</h1>
    <GameContext>
    <Game />
    </GameContext>
     
    </div>
  );
}

export default App;
