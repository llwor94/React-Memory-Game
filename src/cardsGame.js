import React, {useState, useContext} from "react";
import "./App.css";
import clsx from "clsx";
import {GameCtx} from './gameCtx'

function Game() {
  const {cards, currentlyFlipped, gameComplete} = useContext(GameCtx)

  return (
    <div className='game_wrapper'>
    {gameComplete && <h3>Yay gerd jerb</h3>}
    <div className='card_wrapper'>
      {cards.length ? (
        cards.map((card, i) => <Card key={i} image={{...card, index: i}} index={i} currentlyFlipped={currentlyFlipped} />)
      ) : (
        <div>Loading</div>
      )}
    </div>
    </div>
  );
}

function Card({image, index}) {
  //const [isFlipped, setIsFlipped] = useState(false);
  const {cards, currentlyFlipped, handleFlip} = useContext(GameCtx);
  console.log(currentlyFlipped)
  const isFlipped = currentlyFlipped.some(card => card.index === index)


  return (
    <div className='card_container' onClick={() =>  handleFlip(image)}>
      <div className={clsx("card_inner", isFlipped && "is-flipped")}>
        <div className={clsx("card", "front")}><h3>{index + 1}</h3></div>
        <div className={clsx("card", "back")}>
          <img className='image' alt={image.id} src={image.download_url} />
        </div>
      </div>
    </div>
  );
}

export default Game;
