/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.BreathMenuJackpotView = cc.Class({
        "extends": cc.Component,
        properties: {
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {
            this.listSearchs = [];
        },

        init: function (controller) {
            this.controller = controller;
            this.breathView = controller.getComponent(cc.BreathView);
            // this.getSearchBox();

            this.breathView.getBreathRanking();
        },

        getSearchBox: function () {
            var getBreathSearchBoxCommand = new cc.GetBreathSearchBoxCommand;
            getBreathSearchBoxCommand.execute(this);
        },

        updateList: function () {
            this.toggleChooseValue.resetListChooseValue();
            this.breathView.searchBoxs = this.listSearchs;
            if (this.listSearchs.length > 0) {
                var self = this;
                var index = 0;

                this.listSearchs.forEach(function (search) {
                    if (self.breathView.gameId === search.GameID.toString()) {
                        var displayVal = search.SearchCode;

                        self.toggleChooseValue.initializeToggleChooseValue(
                            self.controller,
                            "BreathView",
                            "selectJackpotValueEvent",
                            displayVal,
                            displayVal,
                            null,
                            search.SBJackpotID.toString() // tham so nay gan vao ten node
                        );
                        if (index === 0) {
                            self.breathView.setLBJackpot(search.SBJackpotID.toString(), displayVal);
                        }
                        index++;
                    }
                });

                //sau khi setup xong moi reset scale -> de fix loi list
                //cc.TopupController.getInstance().resetScale();
                //this.toggleChooseValue.node.y = 0;

            }

            //setup xong goi len server de lay list item
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.breathView.getBreathRanking();
            }, this, 1, 0, delay, false);
        },

        onGetBreathSearchBoxResponse: function (list) {
            this.listSearchs = list;
            this.updateList();
        },
    });
}).call(this);
