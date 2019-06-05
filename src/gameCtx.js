import React, {createContext, useState, useEffect} from "react";
import useAxios from "axios-hooks";

export const GameCtx = createContext();

function GameContext({children}) {
  const [pairCount, setPairCount] = useState(4);
  const [cards, setCards] = useState([]);
  const [currentlyFlipped, setCurrentlyFlipped] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [{data}] = useAxios("https://picsum.photos/v2/list?limit=50");

  const handleFlip = card => {
    if (currentlyFlipped.length % 2 === 0) {
      setCurrentlyFlipped([...currentlyFlipped, card]);
      return;
    }
    const isMatch = currentlyFlipped.some(c => c.id === card.id);
    if (isMatch) {
      setCurrentlyFlipped([...currentlyFlipped, card]);
      return true;
    } else {
      setCurrentlyFlipped([...currentlyFlipped, card]);
      setTimeout(() => {
        currentlyFlipped.pop();
        setCurrentlyFlipped(currentlyFlipped);
      }, 1500);
      return false;
    }
  };

  const handleLevelChange = (level) => {
    switch (level){
      case 'medium':
        setPairCount(7);
        break;
      case 'hard':
        setPairCount(15);
        break;
      case 'easy':
      default: 
        setPairCount(4)
    }
      
  }

  useEffect(
    () => {
      if (currentlyFlipped.length && currentlyFlipped.length === cards.length) {
        setGameComplete(true);
      }
    },
    [currentlyFlipped]
  );

  useEffect(
    () => {
      if (data) {
        let cards = data
          .filter(card => card.width < card.height)
          .splice(0, pairCount);
        cards = [...cards, ...cards];
        cards.forEach((card, i) => {
          let newIndex = Math.floor(Math.random() * cards.length);
          let temp = cards[newIndex];
          cards[newIndex] = card;
          cards[i] = temp;
        });
        setCards(cards);
      }
    },
    [data]
  );

  return (
    <GameCtx.Provider
      value={{currentlyFlipped, cards, handleFlip, gameComplete, handleLevelChange}}
    >
      {children}
    </GameCtx.Provider>
  );
}

export default GameContext;
