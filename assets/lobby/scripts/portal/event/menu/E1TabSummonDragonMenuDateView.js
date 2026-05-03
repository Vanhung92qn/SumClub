/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.E1TabSummonDragonMenuDateView = cc.Class({
        "extends": cc.Component,
        properties: {
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {
            this.listSearchs = [];
            this.getEventSearchBox();
        },

        init: function (controller) {
            this.controller = controller;
            this.tabSummonDragonView = controller.getComponent(cc.E1TabSummonDragonView);
            this.tabSummonDragonView.setLBCord(cc.CordType.WIN);
        },

        getEventSearchBox: function () {
            var txGetEventSearchBoxCommand = new cc.TXGetEventSearchBoxCommand;
            txGetEventSearchBoxCommand.execute(this);
        },

        updateList: function (cordType) {
            this.toggleChooseValue.resetListChooseValue();

            if (this.listSearchs.length > 0) {
                var self = this;
                var index = 0;

                this.listSearchs.forEach(function (cord) {
                    if (index < 8) {
                        var displayVal = '';
                        if (cord.Turn === 0) {
                            displayVal = 'Dây hiện tại';
                        } else {
                            displayVal = 'Rồng ' + cord.Turn + '(' + cc.Tool.getInstance().convertUTCDate(cord.RecallDate) + ')';
                        }

                        if (cord.CordWinOrLost.toString() === cordType) {
                            self.toggleChooseValue.initializeToggleChooseValue(
                                self.controller,
                                "E1TabSummonDragonView",
                                "selectDateValueEvent",
                                displayVal,
                                displayVal,
                                null,
                                cord.RecallCode.toString(), // tham so nay gan vao ten node
                                cord.Turn === 0
                            );
                            if (index === 0) {
                                self.tabSummonDragonView.setLBDate(displayVal);
                            }
                            index++;
                        }
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
                self.tabSummonDragonView.getEventHonors();
            }, this, 1, 0, delay, false);
        },

        onTXGetEventSearchBoxResponse: function (list) {
            this.listSearchs = list;
            this.updateList(cc.CordType.WIN);
        },
    });
}).call(this);
