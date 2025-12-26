import { useEffect, useState } from 'react';

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffledArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    //Shuffle the cards
    const shuffled = shuffledArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
      isWrong: false,
    }));

    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  //Handle Card Click
  const handleCardClick = (card) => {
    //Don't allow clicking if the card is already flipped, matched or locked
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
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

    // If this completes a pair, count it as one move and lock input while evaluating
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);
    }

    setTimeout(() => {
      //Checking if 2 cards are a match using the fresh arrays
      if (newFlippedCards.length === 2) {
        const firstFlippedCard = newCards.find(
          (c) => c.id === newFlippedCards[0]
        );
        const secondFlippedCard = newCards.find(
          (c) => c.id === newFlippedCards[1]
        );

        if (firstFlippedCard && secondFlippedCard) {
          if (firstFlippedCard.value === secondFlippedCard.value) {
            setMatchedCards((prev) => [
              ...prev,
              firstFlippedCard.id,
              secondFlippedCard.id,
            ]);
            setScore((prev) => prev + 1);
            setCards((prev) =>
              prev.map((c) => {
                if (
                  c.id === secondFlippedCard.id ||
                  c.id === firstFlippedCard.id
                ) {
                  return { ...c, isMatched: true };
                } else {
                  return c;
                }
              })
            );
            setFlippedCards([]);
            setIsLocked(false);
          } else {
            // Mark them wrong so UI can show a red flash, then flip back after a short delay
            const markedWrongCards = newCards.map((c) => {
              if (newFlippedCards.includes(c.id)) {
                return { ...c, isWrong: true };
              } else {
                return c;
              }
            });

            setCards(markedWrongCards);

            // Keep input locked while showing the red flash, then flip back
            setTimeout(() => {
              const flippedBackCards = markedWrongCards.map((c) => {
                if (newFlippedCards.includes(c.id)) {
                  return { ...c, isFlipped: false, isWrong: false };
                } else {
                  return c;
                }
              });

              setCards(flippedBackCards);
              setIsLocked(false);
              setFlippedCards([]);
            }, 800);
          }
        }
      }
    }, 1000);
  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return {
    cards,
    score,
    moves,
    isGameComplete,
    initializeGame,
    handleCardClick,
  };
};
