/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.SMSValueItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteBG: cc.Sprite,

            lbValue: cc.Label, //So tien SMS nap
            lbAmount: cc.Label, //So tien game nhan duoc

            sfBGActive: cc.SpriteFrame,
            sfBGDeActive: cc.SpriteFrame,
        },

        updateItem: function (controller, item) {
            this.controller = controller;
            this.item = item;
        },

        deSelectItem: function () {
            this.spriteBG.spriteFrame = this.sfBGDeActive;
        },

        selectItem: function () {
            this.spriteBG.spriteFrame = this.sfBGActive;
        },

        selectItemClicked: function () {
            this.spriteBG.spriteFrame = this.sfBGActive;
            this.controller.selectItem(this.item);
        }
    });
}).call(this);
