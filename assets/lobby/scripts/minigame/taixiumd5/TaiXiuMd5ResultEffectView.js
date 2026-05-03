/**
 * effect ket qua,
 */

(function () {
    cc.TaiXiuMd5ResultEffectView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTaiWin: cc.Label,
            lbXiuWin: cc.Label,
        },

        onLoad: function () {
            //setView
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5ResultEffectView(this);
            //luu lai vi tri goc
            this.rootPosTai = this.lbTaiWin.node.position;
            this.rootPosXiu = this.lbXiuWin.node.position;

            const posY = +30; //lay truoc tu giao dien

            this.endPosTai = cc.v2 (this.rootPosTai.x, posY);
            this.endPosXiu = cc.v2 (this.rootPosXiu.x, posY);

            this.duration = 1; //thoi gian anim truot xuong

            this.animationTaiWin = this.lbTaiWin.node.getComponent(cc.Animation);
            this.animationXiuWin = this.lbXiuWin.node.getComponent(cc.Animation);
        },

        onDestroy: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5ResultEffectView(null);
        },

        reset: function () {
            //ẩn text
            this.lbTaiWin.node.active = false;
            this.lbXiuWin.node.active = false;
            //set lai vi tri
            this.lbTaiWin.node.position =  this.rootPosTai;
            this.lbXiuWin.node.position =  this.rootPosXiu;

        },
        
        playEffectWin: function (amount) {
            // console.log('playEffectWin: ' + amount);
            if (cc.TaiXiuMd5Controller.getInstance().getBetSide() === cc.TaiXiuMd5BetSide.TAI) {
                //hien text
                this.lbTaiWin.node.active = true;
                //play anim
                this.animationTaiWin.play('winFade');
                //gan gia tri
                this.lbTaiWin.string = '+' + cc.Tool.getInstance().formatNumber(amount);
                //play effect
                this.action = cc.moveTo(this.duration,  this.endPosTai);
                this.action.easing(cc.easeOut(3.0));
                this.lbTaiWin.node.runAction(this.action);
                // console.log('playEffectWin TAI: ' + amount);
            } else {
                //hien text
                this.lbXiuWin.node.active = true;
                //play anim
                this.animationXiuWin.play('winFade');
                //gan gia tri
                this.lbXiuWin.string = '+' + cc.Tool.getInstance().formatNumber(amount);
                //play effect
                this.action = cc.moveTo(this.duration,  this.endPosXiu);
                this.action.easing(cc.easeOut(3.0));
                this.lbXiuWin.node.runAction(this.action);
                // console.log('playEffectWin XIU: ' + amount);
            }
        }
    });
}).call(this);
