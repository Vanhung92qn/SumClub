/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.MINIEventView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.node.zIndex = cc.NoteDepth.MINI_EVENT_VIEW;
        },

        openEventClicked: function (event, index) {
            if (index) {
                if (cc.LoginController.getInstance().checkLogin()) {
                    cc.Tool.getInstance().setItem('@startTabEvent', index.toString());
                    cc.LobbyController.getInstance().createEventViewTopVP();
                    cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'EVENT_TOP_VP', cc.DDNAUIType.BUTTON);
                }
            }
        },

        openTreasureClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                // cc.LobbyController.getInstance().createTreasureView();
                // cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'TREASURE', cc.DDNAUIType.BUTTON);
                cc.LobbyController.getInstance().createTreasureTopView();
            }
        },
    });
}).call(this);
