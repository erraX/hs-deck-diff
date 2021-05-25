export type Rarity =
    | 'COMMON'
    | 'RARE'
    | 'EPIC'
    | 'LEGEND';

export interface Card {
    add?: boolean;
    delete?: boolean;
    id: string;
    name: string;  
    cost: number;
    rarity: Rarity;
}