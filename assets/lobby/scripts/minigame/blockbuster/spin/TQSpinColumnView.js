/**
 * Created by Nofear on 3/22/2019.
 */

(function () {
    cc.TQSpinColumnView = cc.Class({
        "extends": cc.Component,
        properties: {
            skeletonIcons: [sp.Skeleton],
            spriteIcons: [cc.Sprite],
        },

        onLoad: function () {
            this.scheduler = cc.director.getScheduler();
            this.animCol = this.getComponent(cc.Animation);
        },

        start: function () {
            this.colId = parseInt(this.node.name) - 1;
            this.skeletonDataIcons = cc.TQSpinController.getInstance().getSkeletonDataIcons();

            this.sfIcons = cc.TQSpinController.getInstance().getSFIcons();
            this.totalIcons = this.skeletonDataIcons.length;
            this.totalRow = 4;
            this.randomAllIcon();
        },

        randomAllIcon: function () {
            for (var i = 0; i < this.totalRow; i++) {
                this.randomIcon2(i);
            }
        },

        //ham nay goi trong animation spin
        randomIcon: function (indexIcon) {
            // var iconId = Math.floor((Math.random() * this.totalIcons) + 1);
            // this.setIcon(parseInt(indexIcon.toString()), iconId);
        },

        randomIcon2: function (indexIcon) {
            if (this.colId >= 3) {
                //2 cot cuoi chi random icon 6 -> 9
                var iconId = Math.floor((Math.random() * 4) + 6);
            } else {
                var iconId = Math.floor((Math.random() * 5) + 1);
            }
            this.setIcon(parseInt(indexIcon.toString()), iconId);
        },

        setIcon: function (indexIcon, iconId) {
            switch (iconId) {
                case 1:
                case 2:
                case 3:
                case 4:
                    this.skeletonIcons[indexIcon].node.active = true;
                    this.spriteIcons[indexIcon].node.active = false;

                    this.skeletonIcons[indexIcon].skeletonData = this.skeletonDataIcons[iconId - 1];
                    this.skeletonIcons[indexIcon].setAnimation(0, 'Idle', true);
                    break;
                default:
                    this.skeletonIcons[indexIcon].node.active = false;
                    this.spriteIcons[indexIcon].node.active = true;

                    this.spriteIcons[indexIcon].spriteFrame = this.sfIcons[iconId - 1];
            }
        },

        //set du lieu tu server
        setData: function () {
            var slotsData = cc.TQSpinController.getInstance().getSpinResponse().SlotsData;
            var kernelData = cc.TQSpinController.getInstance().getSpinResponse().KernelData;

            //chuyen list data -> matrix
            this.matrixData = cc.Tool.getInstance().listToMatrix(slotsData, 3);

            if (this.colId >= 3) {
                //set icon cot thu 4 va thu 5 theo kernel Data
                var icon1 = Math.floor(Math.random() * 4 + 6);
                var icon2 = Math.floor(Math.random() * 4 + 6);
                this.setIcon(1, icon1);
                var iconId = kernelData[this.colId - 3];
                this.setIcon(2, iconId);
                this.setIcon(3, icon2);
            } else {
                //cot tu 1 -> 3 set theo slotsData binh thuong
                for (var i = 1; i <= 3; i++) {
                    var iconId = this.matrixData[i - 1][this.colId];
                    this.setIcon(i, iconId);
                }
            }
        },

        finishStart: function () {
            cc.TQSpinController.getInstance().startSpinFinish();
        },

        finishSpin: function () {
            cc.TQSpinController.getInstance().stopSpinFinish();
        },

        startSpin: function () {
            this.unscheduleAllCallbacks();
            this.animCol.play('columnStart');
        },

        spin: function () {
            this.unscheduleAllCallbacks();
            this.animCol.play('columnSpin');
        },

        fastSpin: function () {
            this.unscheduleAllCallbacks();
            this.animCol.play('columnSpin2');
        },

        stop:  function () {
            this.isFastSpin = false;
            this.animCol.play('columnStop');
            this.setData();
        },

        fastStop:  function () {
            this.isFastSpin = true;
            this.animCol.play('columnStop2');
            this.setData();
        },
    });

}).call(this);