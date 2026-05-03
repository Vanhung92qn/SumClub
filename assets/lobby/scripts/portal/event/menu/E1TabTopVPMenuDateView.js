/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.E1TabTopVPMenuDateView = cc.Class({
        "extends": cc.Component,
        properties: {
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {

        },

        init: function (controller) {
            this.controller = controller;
            this.tabTopVPView = controller.getComponent(cc.E1TabTopVPView);
            this.tabTopVPView.setLBTop('Tháng ' + cc.Tool.getInstance().getLocalMonth());

            this.createDropDownMenu();
        },

        createDropDownMenu: function () {
            this.toggleChooseValue.resetListChooseValue();


           for (var i = -1; i < 7; i++) {
               if (i === -1) {
                   var displayName = 'Tháng ' + cc.Tool.getInstance().getLocalMonth();
               } else {
                   displayName = cc.Tool.getInstance().getLocalDateNow(i);
               }

               this.toggleChooseValue.initializeToggleChooseValue(
                   this.controller,
                   "E1TabTopVPView",
                   "selectTopValueEvent",
                   displayName,
                   displayName,
                   // null,
                   // cc.Tool.getInstance().getLocalDateNow2(i)
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
