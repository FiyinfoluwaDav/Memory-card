export const Card = ({ card, cardClick }) => {
  return (
    <div
      className={`card ${card.isFlipped ? 'flipped' : ''}`}
      onClick={() => cardClick(card)}
    >
      <div className='card-front'>?</div>
      <div className='card-back'>{card.value}</div>
    </div>
  );
};
