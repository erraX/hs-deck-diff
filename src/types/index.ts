import type { Rarity } from '../constants/Rarity';

export interface Card {
    add?: boolean;
    delete?: boolean;
    id: string;
    count: number;
    name: string;  
    cost: number;
    rarity: Rarity;
}
