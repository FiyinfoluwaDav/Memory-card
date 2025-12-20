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
          alert('Match');
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
  };

  return (
    <div className='app'>
      <GameHeader score={3} moves={10} />

      <div className='cards-grid'>
        {cards.map((card) => (
          <Card key={card.id} card={card} cardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
