/**
 * Created by Nofear on 3/22/2019.
 */

var slotsConfig = require('CowboyConfig');

(function () {
    cc.CBSpinColumnView = cc.Class({
        "extends": cc.Component,
        properties: {
            /*
             spriteBgs: [cc.Sprite],
             spriteHls: [cc.Sprite],*/
            spriteIcons: [cc.Sprite],
            skeletonIcons: [sp.Skeleton],
            // animCol: cc.Animation,
        },

        onLoad: function () {
            this.scheduler = cc.director.getScheduler();

            this.colId = parseInt(this.node.name) - 1;

            this.icons = cc.SpinController.getInstance().getIconView().icons;
            this.skeletonDataIcons = cc.SpinController.getInstance().getIconView().skeletonDataIcons;
            this.animCol = this.node.getComponent(cc.Animation);
        },

        start: function () {
            this.freeSpinController = cc.FreeSpinController.getInstance();
        },

        randomAllIcon: function () {
            //Tat Expand WILD
            for (var i = 0; i < 4; i++) {
                this.randomIcon2(i);
            }
        },

        //ham nay goi trong animation spin (bo? -> ko set lai icon khi quay)
        randomIcon: function () {

        },

        randomIcon2: function (indexIcon) {
            var length = this.icons.length;

            var iconId = Math.floor((Math.random() * (length - 1))) + 1;

            this.setIcon(parseInt(indexIcon.toString()), iconId);
        },

        setIcon: function (indexIcon, iconId) {
            if (iconId <= 4) {
                this.skeletonIcons[indexIcon].node.active = true;
                this.spriteIcons[indexIcon].node.active = false;

                this.skeletonIcons[indexIcon].skeletonData = this.skeletonDataIcons[iconId - 1];
                this.skeletonIcons[indexIcon].setAnimation(0, 'animation', true);
            } else {
                this.skeletonIcons[indexIcon].node.active = false;
                this.spriteIcons[indexIcon].node.active = true;

                this.spriteIcons[indexIcon].spriteFrame = this.icons[iconId - 1];
            }

            // this.skeletonIcons[indexIcon].node.active = true;
            // this.spriteIcons[indexIcon].enabled = false;
            //
            // this.skeletonIcons[indexIcon].skeletonData = this.skeletonDataIcons[iconId - 1];
            // this.skeletonIcons[indexIcon].setAnimation(0, 'animation', true);

            // this.skeletonIcons[indexIcon].node.active = false;
            // this.spriteIcons[indexIcon].enabled = true;
            //
            // this.spriteIcons[indexIcon].spriteFrame = this.icons[iconId - 1];
        },

        //set du lieu tu server
        setData: function () {
            var slotsData = cc.SpinController.getInstance().getSpinResponse().SpinData.SlotsData;
            //chuyen list data -> matrix
            this.matrixData = cc.Tool.getInstance().listToMatrix(slotsData, 5); //listToMatrix(slotsData, 3);
            for (var i = 1; i <= 3; i++) {
                //var iconId = this.matrixData[this.colId][i - 1];
                var iconId = this.matrixData[i - 1][this.colId];
                this.setIcon(i, iconId);
            }
        },

        checkHavePower: function () {

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

        stop:  function () {
            this.isFastSpin = false;
            this.haveWild = false;
            this.animCol.play('columnStop');
            this.setData();
        },

        fastStop:  function () {
            this.isFastSpin = true;
            this.haveWild = false;
            this.animCol.play('columnStop2');
            this.setData();
        },
    });

}).call(this);