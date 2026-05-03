/**
 * Created by Nofear on 3/15/2019.
 */
// var slotsLBJackpotData = require('SlotsLBJackpotData');

(function () {
    cc.SlotsLBJackpotView = cc.Class({
        "extends": cc.Component,
        properties: {
            slotsLBJackpotListView: cc.SlotsLBJackpotListView,
        },

        onEnable: function () {

            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getJackpotList();
            }, this, 1, 0, delay, false);
        },

        getJackpotList: function () {
            var gameId = cc.RoomController.getInstance().getGameId();
            switch (gameId) {
                case cc.GameId.EGYPT:
                    var getJackpotCommand = new cc.GetEgyptJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
                case cc.GameId.THREE_KINGDOM:
                    getJackpotCommand = new cc.GetTKJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
                case cc.GameId.AQUARIUM:
                    getJackpotCommand = new cc.GetAquariumJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
                case cc.GameId.DRAGON_BALL:
                    getJackpotCommand = new cc.GetDragonBallJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
                case cc.GameId.BUM_BUM:
                    getJackpotCommand = new cc.BBGetJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
                case cc.GameId.COWBOY:
                    getJackpotCommand = new cc.GetCowboyJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
                case cc.GameId.THUONG_HAI:
                    getJackpotCommand = new cc.GetThuongHaiJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
                case cc.GameId.GAINHAY:
                    getJackpotCommand = new cc.GetGaiNhayJackpotCommand;
                    getJackpotCommand.execute(this);
                    break;
            }
        },

        onGetJackpotResponse: function (response) {
            var list = response;
            //var list = slotsLBJackpotData;
            if (list !== null && list.length > 0) {
                this.slotsLBJackpotListView.resetList();
                this.slotsLBJackpotListView.initialize(list);
            }
        }
    });
}).call(this);
