/**
 * Created by Nofear on 3/21/2019.
 */

(function () {
    cc.PKHand = cc.Enum({
        ROYAL_FLUSH: 10, //Sảnh rồng
        STRAIGHT_FLUSH: 9, //thùng phá sảnh
        FOUR_OF_A_KIND: 8, //tứ quý
        FULL_HOUSE: 7, //cù lũ
        FLUSH: 6, //thùng
        STRAIGHT: 5, // sảnh
        THREE_OF_A_KIND: 4, //sám
        TWO_PAIRS: 3,
        PAIR: 2,
        HIGH_CARD: 1,
    });

}).call(this);
