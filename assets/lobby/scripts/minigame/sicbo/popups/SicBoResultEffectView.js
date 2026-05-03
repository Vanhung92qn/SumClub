/**
 * Hieu ung ket qua thang (text +amount truot xuong) khi ket thuc phien.
 * Ported from TaiXiuSicboResultEffectView.
 */

(function () {
    cc.SicBoResultEffectView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTaiWin: cc.Label,
            lbXiuWin: cc.Label,
        },

        onLoad: function () {
            cc.SicBoController.getInstance().setSicBoResultEffectView(this);

            this.rootPosTai = this.lbTaiWin.node.position;
            this.rootPosXiu = this.lbXiuWin.node.position;

            var posY = 70;

            this.endPosTai = cc.v2(this.rootPosTai.x, posY);
            this.endPosXiu = cc.v2(this.rootPosXiu.x, posY);

            this.duration = 5;

            this.animationTaiWin = this.lbTaiWin.node.getComponent(cc.Animation);
            this.animationXiuWin = this.lbXiuWin.node.getComponent(cc.Animation);
        },

        onDestroy: function () {
            cc.SicBoController.getInstance().setSicBoResultEffectView(null);
        },

        reset: function () {
            this.lbTaiWin.node.active = false;
            this.lbXiuWin.node.active = false;
            this.lbTaiWin.node.position = this.rootPosTai;
            this.lbXiuWin.node.position = this.rootPosXiu;
        },

        playEffectWin: function (amount) {
            if (cc.SicBoController.getInstance().getBetSide() === cc.SicBoBetSide.TAI) {
                this.lbTaiWin.node.active = true;
                this.animationTaiWin.play('winFade');
                this.lbTaiWin.string = '+' + cc.Tool.getInstance().formatNumber(amount);
                this.action = cc.moveTo(this.duration, this.endPosTai);
                this.action.easing(cc.easeOut(3.0));
                this.lbTaiWin.node.runAction(this.action);
            } else {
                this.lbXiuWin.node.active = true;
                this.animationXiuWin.play('winFade');
                this.lbXiuWin.string = '+' + cc.Tool.getInstance().formatNumber(amount);
                this.action = cc.moveTo(this.duration, this.endPosXiu);
                this.action.easing(cc.easeOut(3.0));
                this.lbXiuWin.node.runAction(this.action);
            }
        }
    });
}).call(this);
