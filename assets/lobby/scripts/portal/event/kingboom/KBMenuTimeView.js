/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.KBMenuTimeView = cc.Class({
        "extends": cc.Component,
        properties: {
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {
            this.listSearchs = [];
        },

        init: function (controller) {
            this.controller = controller;
            this.kbView = controller.getComponent(cc.KBView);
            // this.getKBTime();

        },

        // getKBTime: function () {
        //     var getKBTimeCommand = new cc.GetKBTimeCommand;
        //     getKBTimeCommand.execute(this);
        // },

        updateList: function (list) {
            this.listSearchs = list;

            this.toggleChooseValue.resetListChooseValue();

            if (this.listSearchs.length > 0) {
                var self = this;
                var index = 0;

                this.listSearchs.forEach(function (search) {
                    if (search.IsTime === 1 && index < 8) {
                        var displayVal = search.TimeName;

                        self.toggleChooseValue.initializeToggleChooseValue(
                            self.controller,
                            "KBView",
                            "selectTimeValueEvent",
                            displayVal,
                            displayVal,
                            null,
                            search.TimeID.toString(), // tham so nay gan vao ten node
                            search.IsActive
                        );
                        if (search.IsActive) {
                            self.kbView.setLBTime(search.TimeID.toString(), displayVal);
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
                self.kbView.getKBRanking();
            }, this, 1, 0, delay, false);
        },

        // onGetKBTimeResponse: function (list) {
        //     this.listSearchs = list;
        //     this.updateList();
        // },
    });
}).call(this);
