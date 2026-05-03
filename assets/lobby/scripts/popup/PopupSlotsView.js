/**
 * Created by Nofear on 6/7/2017.
 */

var gameMessage = require('GameMessage');

(function () {

    cc.PopupSlotsView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeMessage: cc.Node,
            lbMessage: cc.Label,
            lbWin: cc.Label,

            sfPopupNormal: cc.SpriteFrame,
            sfPopupWin: cc.SpriteFrame,

            messPosY: 0,
            messWinPosY: 74,
        },

        onLoad: function () {
            cc.PopupController.getInstance().setPopupSlotsView(this);
            this.sprite = this.nodeMessage.getComponent(cc.Sprite);
            this.animation = this.node.getComponent(cc.Animation);
        },

        showSlotsMessage: function (message) {
            this.sprite.spriteFrame = this.sfPopupNormal;

            this.lbMessage.string = message;
            this.lbMessage.node.y = this.messPosY;

            this.nodeMessage.opacity = 0;
            this.nodeMessage.active = true;

            if (this.lbWin)
                this.lbWin.node.active = false;
            //this.animation.stop('openPopupSlots');
            this.animation.play('openPopupSlots');
        },

        showSlotsWin: function (amount) {
            this.sprite.spriteFrame = this.sfPopupWin;

            this.lbMessage.string = gameMessage.SLOTS_POPUP_WIN;
            this.lbMessage.node.y = this.messWinPosY;

            this.lbWin.string = cc.Tool.getInstance().formatNumber(amount);
            this.lbWin.node.active = true;

            this.nodeMessage.opacity = 0;
            this.nodeMessage.active = true;
            //this.animation.stop('openPopupSlots');
            this.animation.play('openPopupSlots');
        },
    });
}).call(this);
