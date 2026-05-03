/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.EffectView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeEffect: cc.Node,

            nodeJackpot: cc.Node,
            nodeBigWin: cc.Node,
            nodeNormalWin: cc.Node,

            particleJackpot: cc.ParticleSystem,
            particleBigWin: cc.ParticleSystem,
            particleWin: cc.ParticleSystem,

            lbiTotalWins: [cc.LabelIncrement],
        },

        onLoad: function () {
            cc.EffectController.getInstance().setEffectView(this);
            this.animationWin = this.nodeNormalWin.getComponent(cc.Animation);
            this.animationBigWin = this.nodeBigWin.getComponent(cc.Animation);
            this.animationJackpot = this.nodeJackpot.getComponent(cc.Animation);
        },

        playEffect: function (effectType, totalWin, tweenTime) {
            this.nodeJackpot.active = false;
            this.nodeBigWin.active = false;
            this.nodeNormalWin.active = false;
            switch (effectType)  {
                case cc.EffectType.JACKPOT:
                    this.nodeJackpot.active = true;
                    this.animationJackpot.play('openWinFx');
                    this.particleJackpot.resetSystem();
                    this.lbiTotalWins[0].setValue(0);
                    this.lbiTotalWins[0].tweenValueto(totalWin, tweenTime);
                    break;
                case cc.EffectType.BIG_WIN:
                    this.nodeBigWin.active = true;
                    this.animationBigWin.play('openWinFx');
                    this.particleBigWin.resetSystem();
                    this.lbiTotalWins[1].setValue(0);
                    this.lbiTotalWins[1].tweenValueto(totalWin, tweenTime);
                    break;
                case cc.EffectType.NORMAL_WIN:
                    this.nodeNormalWin.active = true;
                    this.animationWin.play('openWinFx');
                    this.particleWin.resetSystem();
                    this.lbiTotalWins[2].setValue(0);
                    this.lbiTotalWins[2].tweenValueto(totalWin, tweenTime);
                    break;
            }
            this.nodeEffect.active = true;
        },

        stopEffect: function () {
            this.unscheduleAllCallbacks();
            this.nodeEffect.active = false;
        },

        //tiep tuc animation (truong hop an Jackpot. User phai touch moi tiep tuc animation)
        continueClicked: function () {
            this.stopEffect();
            cc.PayLinesController.getInstance().hideAllLines();

            //neu ko phai freespin thi moi chay tiep hieu ung sau khi an jackpot
            if (!cc.FreeSpinController.getInstance().getStateFreeSpin()) {
                cc.PayLinesController.getInstance().startEffect();
            }
        },
    });
}).call(this);
