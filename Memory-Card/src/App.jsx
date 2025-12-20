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
