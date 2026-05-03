/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.PayLinesViewBase = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeLines: [cc.Node],
            iconSkeletons: [sp.Skeleton],
        },

        start: function () {
            this.currentLine = this.nodeLines[0];
            this.scheduler = cc.director.getScheduler();
            this.isEffect = false;
            this.interval = 2;
        },

        onDestroy: function () {
            this.scheduler = null;
        },

        hideAllLines: function () {
            this.nodeLines.forEach(function (nodeLine) {
                nodeLine.active = false;
            });
        },

        showAllLines: function () {
            this.nodeLines.forEach(function (nodeLine) {
                nodeLine.active = true;
            });
        },

        //Hien tat ca cac line thang
        playEffect: function (prizeLines, delay) {
            //An hieu ung tien thang khi bat dau hieu ung line
            this.isEffect = true;
            this.index = 0;
            this.totalPrizes = prizeLines.length;
            this.prizeLines = prizeLines;
            var self = this;

            //Hien tat ca line thang
            prizeLines.forEach(function (prize) {
                self.nodeLines[prize.LineID - 1].active = true;
            });

            //delay < 0 -> trung jackpot -> se ko tu stop Effect den khi user tac dong
            if (delay >= 0) {
                //dat lich an hieu ung hien tat ca -> bat dau hien tung line thang
                this.scheduler.schedule(function () {
                    self.stopGameEffect();
                    self.hideAllLines();
                    self.startEffect(delay);
                }, this, 0, 0, delay, false);
            }
        },

        stopGameEffect: function () {

        },

        //bat dau chay effect tung line thang mot
        startEffect: function () {
            this.showLine();
            var self = this;
            this.scheduler.schedule(function () {
                if (self.isEffect) {
                    self.startEffect();
                } else {

                }
            }, this, this.interval, 0, 0, false);

        },

        showLine: function () {
            var self = this;
            var prize = this.prizeLines[this.index];
            var items = prize.Items;
            this.showLineID(prize.LineID);
            this.stopHighlight();

            if (self.iconSkeletons.length > 0) {
                items.forEach(function (iconId) {
                    //self.animationIcons[iconId - 1].play('slotHighlight');
                    self.iconSkeletons[iconId - 1].setAnimation(0, 'animation', true);
                });
            }

            this.index++;
            if (this.index === this.totalPrizes) {
                this.index = 0;
            }
        },

        showLineID: function (lineID) {
            this.currentLine.active = false;
            this.nodeLines[lineID - 1].active = true;
            this.currentLine = this.nodeLines[lineID - 1];
        },

        stopHighlight: function () {

            if (this.iconSkeletons.length > 0) {
                this.iconSkeletons.forEach(function (iconSkeleton) {
                    iconSkeleton.clearTracks();
                    iconSkeleton.setToSetupPose();
                });
            }
        },

        stopEffect: function () {
            this.unscheduleAllCallbacks();
            this.isEffect = false;
            this.hideAllLines();
            this.stopHighlight();
        },
    });
}).call(this);
