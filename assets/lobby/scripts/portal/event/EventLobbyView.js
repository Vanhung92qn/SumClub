/**
 * Created by Nofear on 6/7/2017.
 */

var portalConfig = require('PortalConfig');

(function () {
    cc.EventLobbyView = cc.Class({
        "extends": cc.Component,
        properties: {
            //mini game
            nodeLogoMiniPoker: cc.Node,
            nodeLogoBlockBuster: cc.Node,
            nodeLogoTX: cc.Node,
            nodeLogo777: cc.Node,

            //slots game
            nodeLogoAquarium: cc.Node,
            nodeLogoEgypt: cc.Node,
            nodeLogoThreeKingdom: cc.Node,
            nodeLogoDragonBall: cc.Node,
            nodeLogoCowboy: cc.Node,

            //table game
            nodeLogoXocDia: cc.Node,
            nodeLogoDragonTiger: cc.Node,
            nodeLogoBaccarat: cc.Node,

            //cardgame
            nodeLogoPoker: cc.Node,
            nodeLogoThreeCards: cc.Node,
            nodeLogoMB: cc.Node,
            nodeLogoTLMN: cc.Node,
            nodeLogoTLMNSolo: cc.Node,
        },

        onLoad: function () {
            this.mount = 0;
            cc.EventController.getInstance().setEventLobbyView(this);
            this.reset();
            this.checkEvent();
            this.isPauseUpdate = false;
            cc.director.getScheduler().schedule(this.checkEvent, this, portalConfig.TIME_CHECK_EVENT, cc.macro.REPEAT_FOREVER, 0, this.isPauseUpdate);
        },

        checkEvent: function () {
            var getEventsCommand = new cc.GetEventsCommand;
            getEventsCommand.execute(this);
        },

        reset: function () {
            this.nodeLogoMiniPoker.active = false;
            this.nodeLogoBlockBuster.active = false;
            this.nodeLogoXocDia.active = false;
            this.nodeLogoTX.active = false;
            this.nodeLogo777.active = false;

            this.nodeLogoDragonTiger.active = false;
            this.nodeLogoAquarium.active = false;
            this.nodeLogoEgypt.active = false;
            this.nodeLogoThreeKingdom.active = false;
            this.nodeLogoDragonBall.active = false;
            this.nodeLogoCowboy.active = false;
            this.nodeLogoPoker.active = false;
            this.nodeLogoThreeCards.active = false;
            this.nodeLogoMB.active = false;
            this.nodeLogoBaccarat.active = false;
            this.nodeLogoTLMN.active = false;
            this.nodeLogoTLMNSolo.active = false;
        },

        onGetEventsResponse: function (list) {
            this.reset();
            if (list && list.length > 0) {
                var self = this;
                list.forEach(function (game) {
                    if (self.getNodeByGameId(game.GameID) !== null) {
                        self.getNodeByGameId(game.GameID).active = true;
                    }
                })
            }
        },

        getNodeByGameId: function (gameId) {
            switch (gameId.toString()) {
                    //mini game
                case cc.GameId.MINI_POKER:
                    return this.nodeLogoMiniPoker;
                case cc.GameId.BLOCK_BUSTER:
                    return this.nodeLogoBlockBuster;
                case cc.GameId.TAI_XIU:
                    return this.nodeLogoTX;
                case cc.GameId.SEVEN77:
                    return this.nodeLogo777;

                    //slots game
                case cc.GameId.AQUARIUM:
                    return this.nodeLogoAquarium;
                case cc.GameId.EGYPT:
                    return this.nodeLogoEgypt;
                case cc.GameId.THREE_KINGDOM:
                    return this.nodeLogoThreeKingdom;
                case cc.GameId.DRAGON_BALL:
                    return this.nodeLogoDragonBall;
                case cc.GameId.COWBOY:
                    return this.nodeLogoCowboy;

                    //table game
                case cc.GameId.XOC_XOC:
                    return this.nodeLogoXocDia;
                case cc.GameId.DRAGON_TIGER:
                    return this.nodeLogoDragonTiger;
                case cc.GameId.BACCARAT:
                    return this.nodeLogoBaccarat;

                    //card game
                case cc.GameId.POKER_TEXAS:
                    return this.nodeLogoPoker;
                case cc.GameId.BA_CAY:
                    return this.nodeLogoThreeCards;
                case cc.GameId.MAU_BINH:
                    return this.nodeLogoMB;
                case cc.GameId.TIEN_LEN_MN:
                    return this.nodeLogoTLMN;
                case cc.GameId.TIEN_LEN_MN_SOLO:
                    return this.nodeLogoTLMNSolo;

                default:
                    return  null;
            }
        },

        pauseCheckEvent: function (isPause) {
            this.isPauseUpdate = isPause;
            if (isPause) {
                this.unscheduleAllCallbacks();
            } else {
                cc.director.getScheduler().schedule(this.checkEvent, this, portalConfig.TIME_CHECK_EVENT, cc.macro.REPEAT_FOREVER, 0, this.isPauseUpdate);
            }
        }
    });
}).call(this);
