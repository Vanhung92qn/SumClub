/**
 * Created by Nofear on 1/14/2019.
 */

(function () {
    cc.JackpotView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbiJackpots: [cc.LabelIncrement],
        },

        onLoad: function () {
            cc.JackpotController.getInstance().setJackpotView(this);

            //Lay gameId (set khi click vao big game)
            this.gameId = cc.RoomController.getInstance().getGameId();
            //lay thong tin hu sao tu ngoai Portal
            var gameListData = cc.LobbyJackpotController.getInstance().getJackpotResponse();
            //tim va set thong tin jackpot
            var tempJackpots = []; //luu tam thong tin jackpot
            var self = this;
            gameListData.forEach(function (game) {
                var jackpotFund = game.JackpotFund;
                if (game.GameID.toString() === self.gameId) {
                    tempJackpots.push(jackpotFund);
                }
            });

            this.updateJackpot(tempJackpots);
        },

        onDestroy: function () {
            cc.JackpotController.getInstance().setJackpotView(null);
        },

        updateJackpot: function (jackpots) {
            //var jackpots = jackpotData.split('|');
            var index = 0;
            this.lbiJackpots.forEach(function (lbiJackpot) {
                lbiJackpot.tweenValueto(parseInt(jackpots[index]));
                index++;
            });
        }
    });
}).call(this);
