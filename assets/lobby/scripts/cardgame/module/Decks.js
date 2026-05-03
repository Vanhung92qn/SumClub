var Types = require('Types');

//numberOfDecks = so luong bo bai
function Decks (numberOfDecks) {
    this._numberOfDecks = numberOfDecks;
    this._cardIds = new Array(numberOfDecks * 52);

    this.reset();
}

/**
 * @method reset
 */
Decks.prototype.reset = function () {
    this._cardIds.length = this._numberOfDecks * 52;
    var index = 0;
    var fromId = Types.Card.fromId;
    for (var i = 0; i < this._numberOfDecks; ++i) {
        for (var cardId = 0; cardId < 52; ++cardId) {
            this._cardIds[index] = fromId(cardId);
            ++index;
        }
    }
};

/**
 * Rut the random -> tra ve null neu ko co
 * @method draw
 * @return {Card}
 */
Decks.prototype.draw = function () {
    var cardIds = this._cardIds;
    var len = cardIds.length;
    if (len === 0) {
        return null;
    }

    var random = Math.random();
    var index = (random * len) | 0;
    var result = cardIds[index];

    // toi uu mang nho gon
    var last = cardIds[len - 1];
    cardIds[index] = last;
    cardIds.length = len - 1;

    return result;
};

/**
* @method deal
* @return {Card}
*/
Decks.prototype.deal = function () {
   this._cardIds.pop();
};

/**
* @method shuffle
*/
Decks.prototype.shuffle = function () {
   shuffleArray(this._cardIds);
};

/**
* Randomize array element order in-place.
* Using Durstenfeld shuffle algorithm.
* http://stackoverflow.com/a/12646864
*/
function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
       var j = (Math.random() * (i + 1)) | 0;
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }
   return array;
}

module.exports = Decks;
