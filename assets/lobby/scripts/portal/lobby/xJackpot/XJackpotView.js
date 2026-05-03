/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.XJackpotView = cc.Class({
        "extends": cc.Component,
        properties: {
            gameId: 0,
            //node offset xHu -> co xHu moi active node
            nodeX: cc.Node,
            //sprite X Hu (x3,4,5)
            spriteXHu: cc.Sprite,
            //gia tri x hu tung phong
            lbRemainJackpots: [cc.Label],
        },

        onLoad: function () {
            cc.LobbyJackpotController.getInstance().addXJackpotView(this);
        },

        onEnable: function () {
            this.updateXJackpot();
        },

        onDestroy: function () {
            cc.LobbyJackpotController.getInstance().removeXJackpotView(this);
        },

        updateXJackpot: function () {
            //lay ve gia tri xHu
            var xJackpotResponse = cc.LobbyJackpotController.getInstance().getXJackpotResponse();

            //set gia tri
            this.lbRemainJackpots.forEach(function (lbJackpot) {
                if (lbJackpot) {
                    lbJackpot.string = 'CÒN 0 HŨ';
                }
            });

            var self = this;

            //check co xHu ko?
            var xHu = false;
            //he so x
            var multiplier = 0;

            xJackpotResponse.forEach(function (xJackpot) {
                if (xJackpot.GameID === self.gameId) {

                    var roomIDConvert = xJackpot.RoomID;

                    //neu la MINIPOKER thi check them TH roomID = 5
                    if (xJackpot.GameID.toString() === cc.GameId.MINI_POKER) {
                        roomIDConvert = Math.min(xJackpot.RoomID, 4);
                    }

                    if (self.lbRemainJackpots[roomIDConvert - 1] !== null && self.lbRemainJackpots[roomIDConvert - 1] !== undefined) {
                        self.lbRemainJackpots[roomIDConvert - 1].string = 'CÒN ' + xJackpot.JackpotRemainInDay + ' HŨ';
                        xHu = true;
                    }
                    if (xJackpot.Multiplier > multiplier) {
                        multiplier = xJackpot.Multiplier;
                    }
                }
            });

            //neu co xHu moi active
            if (xHu) {
                var logos = cc.LobbyJackpotController.getInstance().getLogoXJackpot();
                //gan logo x Hu tuong ung
                this.spriteXHu.spriteFrame = logos[multiplier - 2];

                this.nodeX.active = true;
            } else {
                //ko con x -> tat
                this.nodeX.active = false;
            }
        },

        openEventClicked: function () {
            // if (cc.LoginController.getInstance().checkLogin()) {
                cc.Tool.getInstance().setItem('@startTabEvent', '5');
                cc.LobbyController.getInstance().createEventView();
            // }
        },

        onClickHide: function () {
            this.nodeX.active = false;
        },

    });
}).call(this);
