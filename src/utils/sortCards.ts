import { Card } from '../types';

/**
 * Sort by cost, rarity, cost, name
 */
export const sortCards = (cards: Card[]): Card[] => {
    return cards.sort((a, b) => a.cost - b.cost);
}