import React from 'react';
import { Rarity } from '../../types';

export interface CardProps {
    id: string;
    name: string;  
    cost: number;
    rarity: Rarity;
}