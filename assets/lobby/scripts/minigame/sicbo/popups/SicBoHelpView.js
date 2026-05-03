
(function () {
    cc.SicBoHelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_SICBO;
        },

		openMd5Service() {
			cc.sys.openURL(cc.Config.getInstance().md5Service());
		},
		
        closeFinished: function () {
            cc.SicBoController.getInstance().destroyHelpView();
        },
    });
}).call(this);
