/**
 * button chuc nang (tat bat cac chuc nang phu)
 */

(function () {
    cc.TaiXiuButtonView = cc.Class({
        "extends": cc.Component,
        properties: {
            //light
            nodeLightOff: cc.Node,
            spriteLightButton: cc.Sprite,

            nodeChat: cc.Node,

            //Nan
            spriteNan: cc.Sprite,

            sfLights: [cc.SpriteFrame],
            sfNans: [cc.SpriteFrame],
            //Chat
            spriteChat: cc.Sprite,
            sfChats: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.TaiXiuController.getInstance().setTaiXiuButtonView(this);

            //light
            this.nodeLightOff.active = false;
            this.nodeLightOff.opacity = 0;
            this.animationLight = this.nodeLightOff.getComponent(cc.Animation);

            //Nan
            this.isNan = false;
            cc.TaiXiuController.getInstance().setIsNan(this.isNan);

            //Chat
            this.isChat = true;
            this.nodeChat.active = true;
            if (this.spriteChat && this.sfChats && this.sfChats.length) {
                this.spriteChat.spriteFrame = this.sfChats[0];
            }
        },

        onEnable: function () {
            this.nodeChat.active = true;
        },

        onDestroy: function () {
            cc.TaiXiuController.getInstance().setTaiXiuButtonView(null);
        },

        updateBetInfo: function (betInfo) {
            if (betInfo !== null) {
                if (betInfo.BetSide === cc.TaiXiuBetSide.TAI) {
                    this.lbBetTai.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
                } else {
                    this.lbBetXiu.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
                }
            } else {
                this.lbBetTai.string = 0;
                this.lbBetXiu.string = 0;
            }
        },

        lightOnEvent: function () {
            this.nodeLightOff.active = false;
        },

        //tat den
        turnOffLightClicked: function () {
            this.nodeLightOff.opacity = 0;
            if (this.nodeLightOff.active) {
                this.spriteLightButton.spriteFrame = this.sfLights[0];
                this.animationLight.play('light_on');
            } else {
                this.spriteLightButton.spriteFrame = this.sfLights[1];
                this.nodeLightOff.active = true;
                this.animationLight.play('light_off');
            }
        },

        //tat bat Nan
        nanClicked: function () {
            this.isNan = !this.isNan;
            this.spriteNan.spriteFrame = this.isNan ? this.sfNans[0] : this.sfNans[1];
            cc.TaiXiuController.getInstance().setIsNan(this.isNan);
        },

        //tat bat chat
        chatClicked: function () {
            this.nodeChat.active = !this.nodeChat.active;
            this.isChat = !this.isChat;
            this.spriteChat.spriteFrame = this.isChat ? this.sfChats[0] : this.sfChats[1];
        },

        //huong dan
        helpClicked: function () {
            cc.TaiXiuMainController.getInstance().createHelpView();
        },

        //lich su dat cuoc
        historyClicked: function () {
            cc.TaiXiuMainController.getInstance().createHistoryView();
        },

        //bang xep hang dat cuoc
        topClicked: function () {
            cc.TaiXiuMainController.getInstance().createTopView();
        },

        //bieu do chi tiet cac phien
        graphClicked: function () {
            cc.TaiXiuMainController.getInstance().createGraphView();
        },
        jackpotHistoryClicked: function () {
            cc.TaiXiuMainController.getInstance().createJackpotHistoryView();
        },
        eventPHClicked: function () {
            cc.TaiXiuController.getInstance().clickUIEventPH();
        }
    });
}).call(this);