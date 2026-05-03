/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.XJackpotPinView= cc.Class({
        "extends": cc.Component,
        properties: {
            nodeOffset: cc.Node,
            // lbContent: cc.Label,
        },

        onLoad: function () {
            this.isRun = false;
            this.baseDuration = 3;
            // this.rootX = this.lbContent.node.x;
            this.rootDistance = 50;
            // this.rootY = this.lbContent.node.y;

            // this.nodeContent = this.lbContent.node;

            this.spriteXHu = this.nodeOffset.getComponent(cc.Sprite);
        },

        startRun: function (xJackpots) {
            if (xJackpots.length > 0) {
                // var content = '';
                // var index = 0;
                // var multiplier = 0;
                // xJackpots.forEach(function (item) {
                //     if (index < xJackpots.length - 1) {
                //         var space = ', ';
                //     } else {
                //         space = '';
                //     }
                //     index++;
                //     if (item.Multiplier > multiplier) {
                //         multiplier = item.Multiplier;
                //     }
                //     var roomValue = cc.Config.getInstance().getRoomValue(item.GameID, item.RoomID);
                //     content += 'X' + item.Multiplier + ' hũ phòng ' + cc.Tool.getInstance().formatNumber(roomValue) + space;
                // });
                //
                // var logos = cc.LobbyJackpotController.getInstance().getLogoXJackpot();
                //
                // //gan logo x Hu tuong ung
                // this.spriteXHu.spriteFrame = logos[multiplier - 2];
                //
                // this.content = content;

                this.nodeOffset.active = true;

                // bo code chay chu
                // this.lbContent.string = this.content;
                // if (!this.isRun) {
                //     this.runText();
                // }
            } else {
                this.stopRun();
            }
        },

        stopRun: function () {
            this.isRun = false;
            this.nodeOffset.active = false;

            // bo code chay chu
            // this.unscheduleAllCallbacks();
        },

        reRunText: function () {
            this.runText();
        },

        runText: function () {
            this.isRun = true;

            this.lbContent.node.x = this.rootX;

            var distance = this.rootDistance + this.lbContent.node.width;
            var duration = (this.baseDuration / this.rootDistance) * distance;

            this.nodeContent.x = this.rootX;
            this.action = cc.moveTo(duration, cc.v2(-distance, this.rootY));

            this.nodeContent.runAction(this.action);

            var self = this;
            setTimeout(function(){
                self.reRunText();
            }, duration * 1000);
        }
    });
}).call(this);
