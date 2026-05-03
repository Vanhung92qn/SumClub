(function () {
    cc.SicBoMenuView = cc.Class({
        "extends": cc.Component,
        properties: {
            layoutMenu: cc.Node,
			nodeMaxBet: cc.Node,
			nodeBtnHideMenu: cc.Node,
			nodeBtnHideMaxBet: cc.Node,
            prefabHelp: cc.Prefab,
			prefabRank: cc.Prefab,
			prefabHistory: cc.Prefab,
			prefabSoiCau: cc.Prefab,
        },

        onLoad: function () {
            this.controller = cc.SicBoController.getInstance();
			cc.SicBoController.getInstance().setSicBoMenuView(this);
        },

        onClickShowMenu: function () {
			this.nodeBtnHideMenu.active = true;
            cc.tween(this.layoutMenu)
                .to(0.3, { position: cc.v2(-640, this.layoutMenu.y) })
                .start();
        },

        onClickHideMenu: function () {
            cc.tween(this.layoutMenu)
                .to(0.3, { position: cc.v2(-970, this.layoutMenu.y) })
                .start();
			this.nodeBtnHideMenu.active = false;
        },

        onClickExit: function () {
            cc.SicBoLog && cc.SicBoLog.info('Menu', 'onClickExit');
            // Phai truyen GameId.SICBO de LobbyView switch case match va destroy nodeSicbo.
            // Truyen null se roi vao default branch -> khong destroy game view.
            cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.SICBO);
            cc.LobbyController.getInstance().offuserguest(true);
        },
		
        onClickHistory: function () {
            var sBGetSessionHistoryDetailsCommand = new cc.SBGetSessionHistoryDetailsCommand;
            sBGetSessionHistoryDetailsCommand.execute(this);
        },
		
        onSBGetSessionHistoryDetailsResponse: function (list) {
			if (list.length > 0) {
				this.onClickHideMenu();
				this.historyView = this.controller.createView(this.prefabHistory);				
			} else {
				cc.PopupController.getInstance().showMessage('Bạn chưa có lịch sử cược nào!');
				this.onClickHideMenu();
			}
        },
		
        onClickRank: function () {
			this.onClickHideMenu();
			this.topView = this.controller.createView(this.prefabRank);
        },
		
        onClickSoiCau: function () {
			this.onClickHideMenu();
			this.soiCauView = this.controller.createView(this.prefabSoiCau);
        },
		
        onClickRule: function () {
			this.onClickHideMenu();
            this.helpView = this.controller.createView(this.prefabHelp);
        },

        onClickMaxBet: function () {
			this.onClickHideMenu();
			this.nodeBtnHideMaxBet.active = true;
            cc.tween(this.nodeMaxBet)
                .to(0.3, { position: cc.v2(-660, this.nodeMaxBet.y) })
                .start();
        },

        onClickHideMaxBet: function () {
            cc.tween(this.nodeMaxBet)
                .to(0.3, { position: cc.v2(-970, this.nodeMaxBet.y) })
                .start();
			this.nodeBtnHideMaxBet.active = false;
        },

        destroyHelpView: function () {
            if (this.helpView)
                this.helpView.destroy();
        },
		
        destroyTopView: function () {
            if (this.topView)
                this.topView.destroy();
        },

        destroyHistoryView: function () {
            if (this.historyView)
                this.historyView.destroy();
        },

        destroyGraphView: function () {
            if (this.soiCauView)
                this.soiCauView.destroy();
        }
    })
}).call();