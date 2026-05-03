/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.TQPayLinesView = cc.Class({
        "extends": cc.PayLinesViewBase,
        properties: {

        },

        onLoad: function () {
            cc.TQPayLinesController.getInstance().setTQPayLinesView(this);
            this.animationLines = [];
            var childrenLines = this.node.children;
            for (var i = 0; i < 27; i++) {
                this.nodeLines.push(childrenLines[i]);
                this.animationLines.push(childrenLines[i].getComponent(cc.Animation));
            }
        },

        showAllLines: function () {
            this.nodeLines.forEach(function (nodeLine) {
                nodeLine.active = true;
                nodeLine.opacity = 255;
            });
        },

        showLine: function () {
            var self = this;
            var prize = this.prizeLines[this.index];
            var items = prize.Items;
            this.showLineID(prize.LineID);
            this.nodeLines[prize.LineID - 1].opacity = 0;
            this.animationLines[prize.LineID - 1].play('payline');

            this.stopHighlight();

            // items.forEach(function (iconId) {
            //     //self.animationIcons[iconId - 1].play('slotHighlight');
            //     if (self.iconSkeletons[iconId - 1].node.active) {
            //         self.iconSkeletons[iconId - 1].setAnimation(1, 'win', false);
            //         cc.director.getScheduler().schedule(function () {
            //             self.iconSkeletons[iconId - 1].setAnimation(0, 'animation', true);
            //         }, self, 0, 0, 1, false);
            //     }
            // });


            this.index++;
            if (this.index === this.totalPrizes) {
                this.index = 0;
            }
        },

        stopGameEffect: function () {
            cc.TQEffectController.getInstance().stopEffect();
        },
    });
}).call(this);
