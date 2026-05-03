
(function () {
    cc.TaiXiuMd5RuleView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_MD5;
        },

        closeFinished: function () {
            cc.TaiXiuMd5MainController.getInstance().destroyRuleView();
        },
		
		goCheckMd5: function () {
			cc.sys.openURL(cc.Config.getInstance().md5Service());
		},
    });
}).call(this);
