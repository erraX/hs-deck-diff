const { join } = require('path');

const parseXML = require('../utils/parseXML');
const readFile = require('../utils/readFile');

// https://art.hearthstonejson.com/v1/render/latest/zhCN/256x/Story_08_NatureStudies.png
// https://art.hearthstonejson.com/v1/tiles/Story_08_NatureStudies.png

/**
 * Hearthone card model
 */
class CardModel {
  /**
   * model is loaded from data source
   */
  loaded = false;

  /**
   * cards data
   */
  cards = {};

  /**
   * load from data source
   */
  async load(dataPath) {
    const xmlStr = await readFile(dataPath);
    const data = await parseXML(xmlStr, { explicitArray: false });

    this.loaded = true;
    this.cards = this._buildCardMap(data);
  }

  get(id) {
    return this.cards[id];
  }

  _buildCardMap(data) {
    const cards = {};

    const entities = data.CardDefs.Entity;
    for (let i = 0; i < entities.length; i++) {
      const cardData = this._parseCard(entities[i]);
      cards[cardData.uid] = cardData;
    }

    return cards;
  }

  _parseCard(card) {
    const data = {};

    data.id = card.$.CardID;
    data.uid = card.$.ID;

    card.Tag.forEach(tag => {
      switch (tag.$.name) {
        case 'CARDNAME':
          data.name = tag.zhCN;
          break;
        case 'RARITY':
          data.rarity = tag.$.value;
          break;
        case 'COST':
          data.cost = tag.$.value;
          break;
        default:
          break;
      }
    });

    return data;
  }
}

exports.CardModel = CardModel;

let cardModel = new CardModel();
exports.getCardModel = async () => {
  if (!cardModel.loaded) {
    try {
      await cardModel.load(join(__dirname, '../data/CardDefs.xml'));
    }
    catch (ex) {
      console.log('error', ex);
    }
  }

  return cardModel;
}
