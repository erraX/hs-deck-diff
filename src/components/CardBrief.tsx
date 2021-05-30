import React from 'react';
import cls from 'classnames';
import ReactTooltip from 'react-tooltip';

import { Rarity } from '../constants/Rarity';

import styles from './CardBrief.module.scss';

export interface CardBriefProps {
  id: string;
  name: string;
  cost: number;
  count: number;
  rarity: Rarity;
  isAdd?: boolean;
  isDelete?: boolean;
}

const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.COMMON]: '#858585',
  [Rarity.EPIC]: '#644c82',
  [Rarity.RARE]: '#315376',
  [Rarity.LEGENDARY]: '#855c25',
};

const CardBrief: React.FC<CardBriefProps> = ({
  id,
  name,
  cost,
  rarity,
  count = 1,
  isAdd = false,
  isDelete = false
}) => {
  return (
    <div
     className={styles.cardBrief}
     data-for={`card-detail-${id}`}
     data-tip
     data-class={styles.cardDetail}
     style={{
       backgroundImage: `url(https://art.hearthstonejson.com/v1/tiles/${id}.png)`
     }}
    >
      <ReactTooltip
        id={`card-detail-${id}`}
        place="right"
        type="light"
        effect="float" 
        getContent={() => <img src={`https://art.hearthstonejson.com/v1/render/latest/zhCN/256x/${id}.png`} alt="card" />}
      />
      <span className={styles.name}>{name}</span>
      <span
       className={styles.info}
       style={{ backgroundColor: RARITY_COLORS[rarity] }}
      >{cost}</span>
      { count > 1 && <span className={styles.count}>{count}</span>}
      {isAdd && <span className={cls(styles.mask, styles.addMask)}></span>}
      {isDelete && <span className={cls(styles.mask, styles.removeMask)}></span>}
    </div>
  );
};

export default CardBrief;
