/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.E3TabTopVPMenuWeekView = cc.Class({
        "extends": cc.Component,
        properties: {
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {

        },

        init: function (controller) {
            this.controller = controller;
            this.tabTopVPView = controller.getComponent(cc.E3TabTopVPView);

            this.getEventSearchBox();
        },

        getEventSearchBox: function () {
            var getSearchBoxEventT9Command = new cc.GetSearchBoxEventT9Command;
            getSearchBoxEventT9Command.execute(this);
        },

        onGetSearchBoxEventT9Response: function (list) {
            this.tabTopVPView.setSearchList(list);
            this.createDropDownMenu(list);
        },

        createDropDownMenu: function (list) {
            this.toggleChooseValue.resetListChooseValue();

            //Ket qua QUay 2
            // var displayName = 'Top Tháng';
            // this.toggleChooseValue.initializeToggleChooseValue(
            //     this.controller,
            //     "E2TabTopVPView",
            //     "selectTopValueEvent",
            //     displayName,
            //     displayName,
            //     // null,
            //     // cc.Tool.getInstance().getLocalDateNow2(i)
            // );

            var self = this;
            var index = 0;

            list.forEach(function (search) {
                self.toggleChooseValue.initializeToggleChooseValue(
                    self.controller,
                    "E3TabTopVPView",
                    "selectTopValueEvent",
                    index,
                    search.WeekName,
                    null,
                    search.WeekID.toString(),
                    search.Active === 1
                );

                if (search.Active === 1) {
                    self.tabTopVPView.setLBTop(index);
                }
                index++;
            });

            //setup xong goi len server de lay list item
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.tabTopVPView.getEventTopVP();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
