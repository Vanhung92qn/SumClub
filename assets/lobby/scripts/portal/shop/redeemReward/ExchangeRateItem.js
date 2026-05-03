/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.ExchangeRateItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbCardValue: cc.Label,
            lbValue: cc.Label,
        },

        updateItem: function (item) {
            this.lbCardValue.string = cc.Tool.getInstance().formatNumber(item.CardValue);
            this.lbValue.string = cc.Tool.getInstance().formatNumber(item.CardValue * item.ExchangeRate);
        },
    });
}).call(this);
