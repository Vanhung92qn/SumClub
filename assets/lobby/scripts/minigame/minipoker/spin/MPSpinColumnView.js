/**
 * Created by Nofear on 3/22/2019.
 */

var mpConfig = require('MPConfig');

(function () {
    cc.MPSpinColumnView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteIcons: [cc.Sprite],
        },

        onLoad: function () {
            this.scheduler = cc.director.getScheduler();
            this.animCol = this.getComponent(cc.Animation);
        },

        start: function () {
            this.colId = parseInt(this.node.name) - 1;
            this.icons = cc.MPSpinController.getInstance().getSFCards();
            this.randomAllIcon();
        },

        randomAllIcon: function () {
            for (var i = 0; i < 2; i++) {
                this.randomIcon2(i);
            }
        },

        //tam thoi bo? -> ham goi tu animation
        randomIcon: function (indexIcon) {
            // var ran = Math.floor((Math.random() * 52));
            // this.spriteIcons[parseInt(indexIcon.toString())].spriteFrame = this.icons[ran];
        },

        randomIcon2: function (indexIcon) {
            var ran = Math.floor((Math.random() * 52));
            this.spriteIcons[parseInt(indexIcon.toString())].spriteFrame = this.icons[ran];
        },

        //set du lieu tu server
        setData: function () {
            var slotsData = cc.MPSpinController.getInstance().getSpinResponse().SlotData[this.lineId - 1];
            var iconId;
            switch (this.colId) {
                case 0:
                    iconId = slotsData.CardID1;
                    break;
                case 1:
                    iconId = slotsData.CardID2;
                    break;
                case 2:
                    iconId = slotsData.CardID3;
                    break;
                case 3:
                    iconId = slotsData.CardID4;
                    break;
                case 4:
                    iconId = slotsData.CardID5;
                    break;
            }
            this.spriteIcons[1].spriteFrame = this.icons[iconId - 1];
        },

        finishSpin: function () {
            cc.MPSpinController.getInstance().stopSpinFinish();
        },

        spin: function (lineId) {
            this.lineId = lineId;
            this.unscheduleAllCallbacks();
            this.animCol.play('columnSpin');
        },

        stop:  function () {
            this.isFastSpin = false;
            this.setData();
            this.animCol.play('columnStop');
        },

        fastStop:  function () {
            this.isFastSpin = true;
            this.setData();
            this.animCol.play('columnStop2');
        },
    });

}).call(this);