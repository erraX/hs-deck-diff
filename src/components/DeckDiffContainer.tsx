import { useState } from 'react';
import { find } from 'lodash-es';
import axios from 'axios';
import { DeckDefinition } from 'deckstrings';

import Deck from './Deck';
import DeckCodeInput from './DeckCodeInput';

import styles from './DeckDiffContainer.module.scss';

const DeckDiffContainer = () => {
  // const [decks, dispatchDecks] = useReducer(() => ({}));
  const [deck1, setDeck1] = useState<any>([]);
  const [deck2, setDeck2] = useState<any>([]);

  const handleDecode = async (index: number, deck: DeckDefinition) => {
    console.log('deck', deck);

    const countMap: any = deck.cards.reduce(
      (prev, cur) => ({
        ...prev,
        [cur[0]]: cur[1]
      }),
      {}
    );

    const result = await axios.post('/card/get', { ids: deck.cards.map(i => i[0]) });
    const parsedCards = result.data.data.map((card: any) => {
      card.count = countMap[card.uid];
      return card;
    });
    console.log('parsedCards', parsedCards);

    if (index === 0) {
      setDeck1(parsedCards);
      if (deck2.length) {
        setDeck2(reDiff(parsedCards, deck2))
      }
    }
    else if (index === 1) {
      setDeck2(parsedCards);
      if (deck1.length) {
        setDeck2(reDiff(deck1, parsedCards))
      }
    }
  };

  return (
    <div className={styles.deckDiffContainer}>
      <div className={styles.deckContainer}>
        <DeckCodeInput onDecode={deck => handleDecode(0, deck)} />
        <Deck cards={deck1 as any} />
      </div>
      <div>
        <DeckCodeInput onDecode={deck => handleDecode(1, deck)} />
        <Deck cards={deck2 as any} />
      </div>
    </div>
  );
};

function reDiff(baseDeck: any, curDeck: any) {
  const newDeck = [...curDeck];
  
  // find add
  curDeck.forEach((curCard: any) => {
    const baseCard = find(baseDeck, (t: any) => t.uid === curCard.uid);
    // 原来的没有这张卡
    if (!baseCard) {
      curCard.add = true;
    }
    // 原来有一张，现在两张
    else if (baseCard.count === 1 && curCard.count === 2) {
      curCard.count = 1;
      newDeck.push({
        ...curCard,
        add: true,
      });
    }

    // find delete
  });

  baseDeck.forEach((baseCard: any) => {
    const curCard = find(curDeck, (t: any) => t.uid === baseCard.uid);
    // 原来有，现在没有
    if (!curCard) {
      newDeck.push({
        ...baseCard,
        delete: true
      });
    }
    // 原来有两张，现在有一张
    else if (baseCard.count === 2 && curCard.count === 1) {
      newDeck.push({
        ...baseCard,
        count: 1,
        delete: true
      });
    }
  });

  return newDeck.sort((a, b) => (Number(a.cost) - Number(b.cost)) || (Number(a.uid) - Number(b.uid)));;
}

export default DeckDiffContainer;
