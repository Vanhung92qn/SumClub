/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.XJackpotLobbyView= cc.Class({
        "extends": cc.Component,
        properties: {
            xEgypt: cc.XJackpotPinView,
            xThreeKingdom: cc.XJackpotPinView,
            xAquarium: cc.XJackpotPinView,
            xDragonBall: cc.XJackpotPinView,
            xCowboy: cc.XJackpotPinView,

            xMiniPoker: cc.XJackpotPinView,
            xBlockBuster: cc.XJackpotPinView,
            xSeven77: cc.XJackpotPinView
        },

        onLoad: function () {
            cc.LobbyJackpotController.getInstance().setLobbyXJackpotView(this);
            this.getXJackpot();
        },

        getXJackpot: function () {
            var getGameJackpotInfoCommand = new cc.GetGameJackpotInfoCommand;
            getGameJackpotInfoCommand.execute(this);
        },

        onGetGameJackpotInfoResponse: function (response) {
            cc.LobbyJackpotController.getInstance().setXJackpotResponse(response);

            var egypts = [];
            var threeKingdoms = [];
            var aquariums = [];
            var dragonballs = [];
            var cowboys = [];

            var miniPokers = [];
            var blockBusters = [];
            var seven77s = [];

            response.forEach(function (xJackpot) {
                switch (xJackpot.GameID.toString()) {
                    case cc.GameId.EGYPT:
                        egypts.push(xJackpot);
                        break;
                    case cc.GameId.THREE_KINGDOM:
                        threeKingdoms.push(xJackpot);
                        break;
                    case cc.GameId.AQUARIUM:
                        aquariums.push(xJackpot);
                        break;
                    case cc.GameId.DRAGON_BALL:
                        dragonballs.push(xJackpot);
                        break;
                    case cc.GameId.COWBOY:
                        cowboys.push(xJackpot);
                        break;

                    case cc.GameId.MINI_POKER:
                        miniPokers.push(xJackpot);
                        break;
                    case cc.GameId.BLOCK_BUSTER:
                        blockBusters.push(xJackpot);
                        break;
                    case cc.GameId.SEVEN77:
                        seven77s.push(xJackpot);
                        break;
                }
            });

            this.xEgypt.startRun(egypts);
            this.xThreeKingdom.startRun(threeKingdoms);
            this.xAquarium.startRun(aquariums);
            this.xDragonBall.startRun(dragonballs);
            this.xCowboy.startRun(cowboys);

            this.xMiniPoker.startRun(miniPokers);
            this.xBlockBuster.startRun(blockBusters);
            this.xSeven77.startRun(seven77s);
        },
    });
}).call(this);
