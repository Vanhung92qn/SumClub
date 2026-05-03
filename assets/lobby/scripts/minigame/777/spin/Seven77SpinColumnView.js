/**
 * Created by Nofear on 3/22/2019.
 */

(function () {
    cc.Seven77SpinColumnView = cc.Class({
        "extends": cc.Component,
        properties: {
            // skeletonIcons: [sp.Skeleton],
            spriteIcons: [cc.Sprite],
        },

        onLoad: function () {
            this.scheduler = cc.director.getScheduler();
            this.animCol = this.getComponent(cc.Animation);
        },

        start: function () {
            this.colId = parseInt(this.node.name) - 1;
            // this.skeletonDataIcons = cc.Seven77SpinController.getInstance().getSkeletonDataIcons();
            this.spriteDataIcons = cc.Seven77SpinController.getInstance().getSpriteIcons();

            this.totalIcons = this.spriteDataIcons.length;
            this.totalRow = 4;
            this.randomAllIcon();
        },

        randomAllIcon: function () {
            for (var i = 0; i < this.totalRow; i++) {
                this.randomIcon2(i);
            }
        },

        //tam thoi bo? -> ham goi tu animation
        randomIcon: function (indexIcon) {
            // var ran = Math.floor((Math.random() * this.totalIcons));
            // this.skeletonIcons[parseInt(indexIcon.toString())].skeletonData = this.skeletonDataIcons[ran];
        },

        randomIcon2: function (indexIcon) {
            var ran = Math.floor((Math.random() * this.totalIcons));
            // this.skeletonIcons[parseInt(indexIcon.toString())].skeletonData = this.skeletonDataIcons[ran];
            this.spriteIcons[parseInt(indexIcon.toString())].spriteFrame = this.spriteDataIcons[ran];
        },

        //set du lieu tu server
        setData: function () {
            var slotsData = cc.Seven77SpinController.getInstance().getSpinResponse().SlotsData;

            //chuyen list data -> matrix
            this.matrixData = cc.Tool.getInstance().listToMatrix(slotsData, 3);

            for (var i = 1; i <= 3; i++) {
                var iconId = this.matrixData[i - 1][this.colId];
                // this.skeletonIcons[i].skeletonData = this.skeletonDataIcons[parseInt(iconId) - 1];

                this.spriteIcons[i].spriteFrame = this.spriteDataIcons[parseInt(iconId) - 1];
            }
        },

        finishSpin: function () {
            cc.Seven77SpinController.getInstance().stopSpinFinish();
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