/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.E2TabTopVPMenuDateView = cc.Class({
        "extends": cc.Component,
        properties: {
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {

        },

        init: function (controller) {
            this.controller = controller;
            this.tabTopVPView = controller.getComponent(cc.E2TabTopVPView);
            this.tabTopVPView.setLBTop('Top Tháng');

            this.createDropDownMenu();
        },

        createDropDownMenu: function () {
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

            //Tong ket -> quay 3
            for (var i = -1; i < 7; i++) {
                if (i === -1) {
                    var displayName = 'Top Tháng';
                } else {
                    displayName = cc.Tool.getInstance().getLocalDateNow(i);
                }

                this.toggleChooseValue.initializeToggleChooseValue(
                    this.controller,
                    "E2TabTopVPView",
                    "selectTopValueEvent",
                    displayName,
                    displayName,
                    null,
                    displayName,
                    i === -1
                );
            }


            //setup xong goi len server de lay list item
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.tabTopVPView.getEventTopVP();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
