/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.BreathMenuGameView = cc.Class({
        "extends": cc.Component,
        properties: {
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {
            this.listGames = [
                cc.GameId.AQUARIUM,
                cc.GameId.EGYPT,
                cc.GameId.THREE_KINGDOM,
                cc.GameId.DRAGON_BALL,
                cc.GameId.BUM_BUM,
                cc.GameId.MINI_POKER,
                cc.GameId.BLOCK_BUSTER,
                cc.GameId.SEVEN77,
            ];
            this.listSearchs = [];
        },

        init: function (controller) {
            this.controller = controller;
            this.breathView = controller.getComponent(cc.BreathView);
            // this.getSearchBox();
        },

        getSearchBox: function () {
            var getBreathSearchBoxCommand = new cc.GetBreathSearchBoxCommand;
            getBreathSearchBoxCommand.execute(this);
            // this.updateList();
        },

        updateList: function () {
            this.toggleChooseValue.resetListChooseValue();

            var self = this;
            var index = 0;

            this.listGames.forEach(function (gameId) {
                var isFound = false;
                self.listSearchs.forEach(function (search) {
                    if (gameId === search.GameID.toString() && !isFound) {
                        var displayVal = cc.Config.getInstance().getGameName(gameId);

                        self.toggleChooseValue.initializeToggleChooseValue(
                            self.controller,
                            "BreathView",
                            "selectGameValueEvent",
                            displayVal,
                            displayVal,
                            null,
                            gameId // tham so nay gan vao ten node
                        );
                        if (index === 0) {
                            self.breathView.setLBGame(gameId, displayVal);
                        }
                        index++;
                        isFound = true;
                    }
                });

            });

            // //setup xong goi len server de lay list item
            // var self = this;
            // var delay = 0.2;
            // cc.director.getScheduler().schedule(function () {
            //     self.breathView.getBreathRanking();
            // }, this, 1, 0, delay, false);
        },

        onGetBreathSearchBoxResponse: function (list) {
            this.listSearchs = list;
            this.updateList();
        },
    });
}).call(this);
