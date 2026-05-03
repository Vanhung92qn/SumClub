/**
 * Dat cuoc
 */

(function () {
    cc.TaiXiuSieuTocBetView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbBetTai: cc.Label,
            lbBetXiu: cc.Label,
        },

        onLoad: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocBetView(this);
            //this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocBetView(null);
        },

        reset: function () {
            this.lbBetTai.string = '';
            this.lbBetXiu.string = '';
        },

        updateBetInfo: function (betInfo) {
            this.betSide = betInfo.BetSide;

            if (betInfo.BetSide === cc.TaiXiuSieuTocBetSide.TAI) {
                this.lbBetTai.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
            } else {
                this.lbBetXiu.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
            }

        },

        getBetSide: function () {
            return this.betSide;
        },
    });
}).call(this);
