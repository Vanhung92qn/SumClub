
(function () {
    cc.TaiXiuMd5HelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_MD5;
        },

        closeFinished: function () {
            cc.TaiXiuMd5MainController.getInstance().destroyHelpView();
        },
		
		showRuleClicked: function () {
			cc.TaiXiuMd5MainController.getInstance().destroyHelpView();
			cc.TaiXiuMd5MainController.getInstance().createRuleView();
		},
    });
}).call(this);
