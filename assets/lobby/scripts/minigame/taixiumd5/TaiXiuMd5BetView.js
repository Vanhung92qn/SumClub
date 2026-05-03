/**
 * Dat cuoc
 */

(function () {
    cc.TaiXiuMd5BetView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbBetTai: cc.Label,
            lbBetXiu: cc.Label,
        },

        onLoad: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5BetView(this);
            //this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5BetView(null);
        },

        reset: function () {
            this.lbBetTai.string = '';
            this.lbBetXiu.string = '';
        },

        updateBetInfo: function (betInfo) {
            this.betSide = betInfo.BetSide;

            if (betInfo.BetSide === cc.TaiXiuMd5BetSide.TAI) {
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
