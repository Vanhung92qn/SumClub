/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.TopupRateItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbCardValue: cc.Label,
            //lbPromotion: cc.Label,
            lbValue: cc.Label,
        },

        updateItem: function (item, promotionRate) {
            this.lbCardValue.string = cc.Tool.getInstance().formatNumber(item.CardValue);

            // if (promotionRate) {
            //     this.lbPromotion.string = Math.round(promotionRate * 100) + '%';
            // } else {
            //     this.lbPromotion.string = '0%';
            // }

            // item.ChargeRate = 1.25;

            var percent = (((item.CardValue * item.ChargeRate) - item.CardValue) / item.CardValue) * 100;

            // console.log(item.CardValue * item.ChargeRate, ((item.CardValue * item.ChargeRate) - item.CardValue), percent);

            //this.lbPromotion.string = percent >= 0 ? (percent + '%') : (percent + '%');

            this.lbValue.string = cc.Tool.getInstance().formatNumber(item.CardValue * item.ChargeRate);
        },
    });
}).call(this);
