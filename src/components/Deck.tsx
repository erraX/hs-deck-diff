import React from 'react';
import CardBrief from './CardBrief';

import styles from './Deck.module.scss';

import type { Card } from '../types';
export interface DeckProps {
  cards: Card[];
}

const Deck: React.FC<DeckProps> = ({ cards }) => <div className={styles.deck}>
  {cards.map(card => (
    <CardBrief
      key={`${card.id}-${!!card.add}-${!!card.delete}`}
      id={card.id}
      name={card.name}
      cost={card.cost}
      count={card.count}
      rarity={card.rarity}
      isAdd={card.add}
      isDelete={card.delete}
    />
  ))}
</div>;

export default Deck;
