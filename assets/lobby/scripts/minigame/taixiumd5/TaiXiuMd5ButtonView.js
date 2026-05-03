/**
 * button chuc nang (tat bat cac chuc nang phu)
 */

(function () {
    cc.TaiXiuMd5ButtonView = cc.Class({
        "extends": cc.Component,
        properties: {
            //light
            //nodeLightOff: cc.Node,
            spriteLightButton: cc.Sprite,

            nodeChat: cc.Node,

            //Nan
            spriteNan: cc.Sprite,

            //sfLights: [cc.SpriteFrame],
            sfNans: [cc.SpriteFrame],
            //Chat
            spriteChat: cc.Sprite,
            sfChats: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5ButtonView(this);

            //light
            //this.nodeLightOff.active = false;
            //this.nodeLightOff.opacity = 0;
            //this.animationLight = this.nodeLightOff.getComponent(cc.Animation);

            //Nan
            this.isNan = false;
            cc.TaiXiuMd5Controller.getInstance().setIsNan(this.isNan);

            //Chat
            this.isChat = false;
            this.nodeChat.active = false;
        },

        onEnable: function () {
            var self = this;
            cc.director.getScheduler().schedule(function () {
                self.nodeChat.active = false;
            }, this, 0, 0, 2, false);
        },

        onDestroy: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5ButtonView(null);
        },

        updateBetInfo: function (betInfo) {
            if (betInfo !== null) {
                if (betInfo.BetSide === cc.TaiXiuMd5BetSide.TAI) {
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
                //this.animationLight.play('light_on');
            } else {
                this.spriteLightButton.spriteFrame = this.sfLights[1];
                this.nodeLightOff.active = true;
                //this.animationLight.play('light_off');
            }
        },

        //tat bat Nan
        nanClicked: function () {
            this.isNan = !this.isNan;
            this.spriteNan.spriteFrame = this.isNan ? this.sfNans[0] : this.sfNans[1];
            cc.TaiXiuMd5Controller.getInstance().setIsNan(this.isNan);
        },

        //tat bat chat
        chatClicked: function () {
            this.nodeChat.active = !this.nodeChat.active;
            this.isChat = !this.isChat;
            this.spriteChat.spriteFrame = this.isChat ? this.sfChats[0] : this.sfChats[1];
        },

        //huong dan
        helpClicked: function () {
            cc.TaiXiuMd5MainController.getInstance().createHelpView();
        },

        //lich su dat cuoc
        historyClicked: function () {
            cc.TaiXiuMd5MainController.getInstance().createHistoryView();
        },

        //bang xep hang dat cuoc
        topClicked: function () {
            cc.TaiXiuMd5MainController.getInstance().createTopView();
        },

        //bieu do chi tiet cac phien
        graphClicked: function () {
            cc.TaiXiuMd5MainController.getInstance().createGraphView();
        },
        jackpotHistoryClicked: function () {
            cc.TaiXiuMd5MainController.getInstance().createJackpotHistoryView();
        },
        eventPHClicked: function () {
            cc.TaiXiuMd5Controller.getInstance().clickUIEventPH();
        }
    });
}).call(this);