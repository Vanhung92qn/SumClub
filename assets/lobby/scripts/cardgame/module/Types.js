var Suit = cc.Enum({
    Spade: 0,   // Bích
    Club: 13,    // Tép (Chuồn)
    Diamond: 26, // Rô
    Heart: 39,   // Cơ
});

var CARD_NUMBER_2_10JQKA = '2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',');

//number - 0 -> 12
function Card (number, suit) {
    Object.defineProperties(this, {
        number: {
            value: number,
            writable: false
        },
        suit: {
            value: suit,
            writable: false
        },

        //id = 0 -> 51
        id: {
            value: number + suit,
            writable: false
        },
        //
        pointName: {
            get: function () {
                return CARD_NUMBER_2_10JQKA[this.number];
            }
        },
        suitName: {
            get: function () {
                return Suit[this.suit];
            }
        },
        isBlackSuit: {
            get: function () {
                return this.suit === Suit.Spade || this.suit === Suit.Club;
            }
        },
        isRedSuit: {
            get: function () {
                return this.suit === Suit.Heart || this.suit === Suit.Diamond;
            }
        },
    });
}

Card.prototype.toString = function () {
    return this.suitName + ' ' + this.pointName;
};

// luu 52 the bai
var cards = new Array(52);

//lay ve card theo id
Card.fromId = function (id) {
    return cards[id];
};

//tao bo bai
(function createCards () {
    for (var s = 0; s <= 39; s+=13) {
        for (var p = 0; p <= 12; p++) {
            var card = new Card(p, s);
            cards[card.id] = card;
        }
    }
})();

var ActorPlayingState = cc.Enum({
    Normal: -1,
    Stand: -1,
    Report: -1,
    Bust: -1,
});

//Ket qua
var Outcome = cc.Enum({
    Win: -1,
    Lose: -1,
    Tie: -1,
});

// Loai bai
var Hand = cc.Enum({
    Normal: -1,
    BlackJack: -1,
    FiveCard: -1,
});

module.exports = {
    Suit: Suit,
    Card: Card,
    ActorPlayingState: ActorPlayingState,
    Hand: Hand,
    Outcome: Outcome,
};
