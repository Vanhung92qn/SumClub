/**
 * Created by Nofear on 3/15/2019.
 */
// var slotsLBBigWinData = require('SlotsLBBigWinData');

(function () {
    cc.SlotsLBBigWinView = cc.Class({
        "extends": cc.Component,
        properties: {
            slotsLBBigWinListView: cc.SlotsLBBigWinListView,
        },

        onEnable: function () {
            //this.onGetEgyptBigWinResponse(); return;

            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getBigWinList();
            }, this, 1, 0, delay, false);
        },

        getBigWinList: function () {
            var gameId = cc.RoomController.getInstance().getGameId();
            switch (gameId) {
                case cc.GameId.EGYPT:
                    var getBigWinCommand = new cc.GetEgyptBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
                case cc.GameId.THREE_KINGDOM:
                    getBigWinCommand = new cc.GetTKBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
                case cc.GameId.AQUARIUM:
                    getBigWinCommand = new cc.GetAquariumBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
                case cc.GameId.DRAGON_BALL:
                    getBigWinCommand = new cc.GetDragonBallBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
                case cc.GameId.BUM_BUM:
                    getBigWinCommand = new cc.BBGetBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
                case cc.GameId.COWBOY:
                    getBigWinCommand = new cc.GetCowboyBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
                case cc.GameId.THUONG_HAI:
                    getBigWinCommand = new cc.GetThuongHaiBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
                case cc.GameId.GAINHAY:
                    getBigWinCommand = new cc.GetGaiNhayBigWinCommand;
                    getBigWinCommand.execute(this);
                    break;
            }
        },

        onGetBigWinResponse: function (response) {
            var list = response;
            //var list = slotsLBBigWinData;
            if (list !== null && list.length > 0) {
                this.slotsLBBigWinListView.resetList();
                this.slotsLBBigWinListView.initialize(list);
            }
        }
    });
}).call(this);
