/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.SlotsHistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            slotsHistoryListView: cc.SlotsHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getHistoryList();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

        },

        getHistoryList: function () {
            var gameId = cc.RoomController.getInstance().getGameId();
            switch (gameId) {
                case cc.GameId.EGYPT:
                    var getHistoryCommand = new cc.GetEgyptHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
                case cc.GameId.THREE_KINGDOM:
                    getHistoryCommand = new cc.GetTKHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
                case cc.GameId.DRAGON_BALL:
                    getHistoryCommand = new cc.GetDragonBallHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
                case cc.GameId.AQUARIUM:
                    getHistoryCommand = new cc.GetAquariumHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
                case cc.GameId.BUM_BUM:
                    getHistoryCommand = new cc.BBGetHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
                case cc.GameId.COWBOY:
                    getHistoryCommand = new cc.GetCowboyHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
                case cc.GameId.THUONG_HAI:
                    getHistoryCommand = new cc.GetThuongHaiHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
                case cc.GameId.GAINHAY:
                    getHistoryCommand = new cc.GetGaiNhayHistoryCommand;
                    getHistoryCommand.execute(this);
                    break;
            }
        },

        onGetSlotsHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.slotsHistoryListView.resetList();
                this.slotsHistoryListView.initialize(list);
            }
        },

        backClicked: function () {
            this.slotsHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.destroy();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
