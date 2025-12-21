import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { GameHeader } from './components/GameHeader';

const cardValues = [
  '🍇',
  '🍈',
  '🍊',
  '🍋',
  '🍌',
  '🍍',
  '🍎',
  '🍒',
  '🍇',
  '🍈',
  '🍊',
  '🍋',
  '🍌',
  '🍍',
  '🍎',
  '🍒',
];
function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    //Shuffle the cards

    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  //Handle Card Click
  const handleCardClick = (card) => {
    //Don't allow clicking if the card is already flipped or matched
    if (card.isFlipped || card.isMatched) {
      return;
    }

    //Updating Card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    setCards(newCards);

    //Create a new flipped cards array to keep track
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    setTimeout(() => {
      //Checking if 2 cards are a match
      if (flippedCards.length === 1) {
        const firstFlippedCard = cards[flippedCards[0]];

        if (firstFlippedCard.value === card.value) {
          setTimeout(() => {
            setMatchedCards((prev) => [...prev, firstFlippedCard.id, card.id]);
            const newMatchedCards = cards.map((c) => {
              if (c.id === card.id || c.id === firstFlippedCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            });

            setCards((prev) =>
              prev.map((c) => {
                if (c.id === card.id || c.id === firstFlippedCard.id) {
                  return { ...c, isMatched: true };
                } else {
                  return c;
                }
              })
            );
            setFlippedCards([]);
          }, 500);

          //Handling failed matching
        } else {
          //Flip back the two cards
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id)) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setCards(flippedBackCards);
          setFlippedCards([]);
        }
      }
    }, 1000);
    setMoves((prev) => prev + 1);
  };

  return (
    <div className='app'>
      <GameHeader score={score} moves={moves} />

      <div className='cards-grid'>
        {cards.map((card) => (
          <Card key={card.id} card={card} cardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
