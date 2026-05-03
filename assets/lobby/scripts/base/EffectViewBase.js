/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.EffectViewBase = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeJackpot: cc.Node,
            nodeBigWin: cc.Node,
            nodeNormalWin: cc.Node,

            particleJackpot: cc.ParticleSystem,
            particleBigWin: cc.ParticleSystem,
            particleNormalWin: cc.ParticleSystem,

            lbiJackpotWin: cc.LabelIncrement,
            lbiBigWin: cc.LabelIncrement,
            lbiNormalWin: cc.LabelIncrement,
        },


        playEffect: function (type, spinResponse, time) {
            var amount = spinResponse.PaylinePrize;
            this.prizeLines = spinResponse.PrizeLines;

            switch (type) {
                case cc.EffectType.JACKPOT:
                    this.nodeJackpot.active = true;
                    this.particleJackpot.resetSystem();
                    this.lbiJackpotWin.tweenValue(0, amount);
                    break;
                case cc.EffectType.BIG_WIN:
                    this.nodeBigWin.active = true;
                    this.particleBigWin.resetSystem();
                    this.lbiBigWin.tweenValue(0, amount, time);
                    break;
                case cc.EffectType.NORMAL_WIN:
                    this.nodeNormalWin.active = true;
                    this.particleNormalWin.resetSystem();
                    this.lbiNormalWin.tweenValue(0, amount, time);
                    break;
            }
        },

        stopEffect: function () {
            this.nodeJackpot.active = false;
            this.nodeBigWin.active = false;
            this.nodeNormalWin.active = false;
        },
    });
}).call(this);
