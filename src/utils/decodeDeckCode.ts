import { decode, DeckDefinition } from 'deckstrings';

/**
 * AAEBAQcAAAQBAwIDAwMEAw==
 * {
 *    cards: [[1, 3], [2, 3], [3, 3], [4, 3]], // [dbfid, count] pairs
 *    heroes: [7], // Garrosh Hellscream
 *    format: 1, 
 * }
 */
export const decodeDeckCode = (deckCodeStr: string) => {
	let deck: DeckDefinition | null = null;

	try {
		deck = decode(deckCodeStr);
	}
	catch (ex) {
		console.error('decode deck code error:', ex);
	}

	return deck;
};