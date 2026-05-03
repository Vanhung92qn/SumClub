
(function () {
    cc.PKHelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.node.parent = cc.find('Canvas');
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        closeFinished: function () {
            cc.PKPopupController.getInstance().destroyHelpView();
        },
    });
}).call(this);
