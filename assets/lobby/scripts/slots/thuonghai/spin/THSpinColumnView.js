/**
 * Created by Nofear on 3/22/2019.
 */

(function () {
    cc.THSpinColumnView = cc.Class({
        "extends": cc.Component,
        properties: {
            skeletonIcons: [sp.Skeleton],
        },

        onLoad: function () {
            this.scheduler = cc.director.getScheduler();
            this.animCol = this.getComponent(cc.Animation);

            this.colId = parseInt(this.node.name) - 1;

            this.totalIcons = 7;
            this.totalRow = 4;

            this.skeletonDataIcon = cc.SpinController.getInstance().getIconView().skeletonDataIcons;
        },

        onEnable: function () {

            //Lay roomIndex
            this.roomIndex = cc.RoomController.getInstance().getRoomId() - 1;
        },

        randomAllIcon: function () {
            for (var i = 0; i < this.totalRow; i++) {
                this.randomIcon2(i);
            }
        },

        //ham nay goi trong animation spin (bo? -> ko set lai icon khi quay)
        randomIcon: function (indexIcon) {
            // var ran = Math.floor((Math.random() * this.totalIcons));
            // this.skeletonIcons[parseInt(indexIcon.toString())].skeletonData = this.skeletonDataIcons[this.roomIndex][ran];
        },

        randomIcon2: function (indexIcon) {
            var ran = Math.floor((Math.random() * this.totalIcons));
            var skeleton = this.skeletonIcons[parseInt(indexIcon.toString())];
            skeleton.skeletonData = this.skeletonDataIcon[ran];
            skeleton.setAnimation(0, 'animation', true);
        },

        //set du lieu tu server
        setData: function () {
            var slotsData = cc.SpinController.getInstance().getSpinResponse().SpinData.SlotsData;

            //chuyen list data -> matrix
            this.matrixData = cc.Tool.getInstance().listToMatrix(slotsData, 5);

            for (var i = 1; i <= 3; i++) {
                var iconId = this.matrixData[i - 1][this.colId];
                this.skeletonIcons[i].skeletonData = this.skeletonDataIcon[parseInt(iconId) - 1];
                this.skeletonIcons[i].setAnimation(0, 'animation', true);
            }
        },

        finishSpin: function () {
            cc.SpinController.getInstance().stopSpinFinish();
            switch (this.colId) {
                case 0:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_1);
                    break;
                case 1:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_2);
                    break;
                case 2:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_3);
                    break;
                case 3:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_4);
                    break;
                case 4:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_5);
                    break;
            }
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