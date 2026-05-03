/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MPEffectView = cc.Class({
        "extends": cc.EffectViewBase,
        properties: {

        },

        onLoad: function () {
            cc.MPEffectController.getInstance().setMPEffectView(this);
            this.effectType = cc.EffectType.NORMAL_WIN;
        },

        playEffect: function (type, amount, time) {
            this.effectType = type;
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
                    this.particleNormalWin.resetSystem();
                    this.lbiNormalWin.tweenValue(0, amount, time);
                    break;
            }
        },

        stopEffect: function () {
            //truong hop trung jackpot se ko tu stop effect -> user phai tac dong
            if (this.effectType === cc.EffectType.JACKPOT) return;

            this.nodeJackpot.active = false;
            this.nodeBigWin.active = false;
            this.nodeNormalWin.active = false;
        },

        //tiep tuc animation (truong hop an Jackpot. User phai touch moi tiep tuc animation)
        continueClicked: function () {
            this.effectType = cc.EffectType.NORMAL_WIN;
            this.stopEffect();
        },
    });
}).call(this);
