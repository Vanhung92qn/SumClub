/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.E2TabGiftBoxView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            eventListView: cc.EventTopGiftBoxListView,
        },

        onEnable: function () {
            this.btnRule.interactable = true;
            this.btnTop.interactable = false;

            this.nodeRule.active = false;
            this.nodeTop.active = true;

            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getEventTopVP();
            }, this, 1, 0, delay, false);

        },

        onDisable: function () {
            this.eventListView.resetList();
        },

        getEventTopVP: function () {
            if ( cc.EventController.getInstance().showEventBusy()) {
                var getTopGiftBox2Command = new cc.GetTopGiftBox2Command;
                getTopGiftBox2Command.execute(this);
            }
        },

        onGetTopGiftBox2Response: function (response) {
            cc.EventController.getInstance().hideEventBusy();
            var list = response;


            this.eventListView.resetList();
            if (list !== null && list.length > 0) {
                this.eventListView.initialize(list);
            }
        },
    });
}).call(this);
