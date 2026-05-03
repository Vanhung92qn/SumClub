
(function () {
    cc.TaiXiuSieuTocHelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        closeFinished: function () {
            cc.TaiXiuSieuTocMainController.getInstance().destroyHelpView();
        },
    });
}).call(this);
