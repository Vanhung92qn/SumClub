    /**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MainView = cc.Class({
        "extends": cc.Component,
        properties: {
            //Danh cho game chinh
            prefabHelp: cc.Prefab,
            prefabBetLines: cc.Prefab,
            prefabLeaderboard: cc.Prefab,
            prefabHistory: cc.Prefab,

            prefabSessionDetail: cc.Prefab,

            prefabX2Game: cc.Prefab,
            prefabBonusGame: cc.Prefab,

            //danh cho minigame
            prefabHelpMiniGame: cc.Prefab
        },

        onLoad: function () {
            cc.MainController.getInstance().setMainView(this);
        },

        createHelpView: function () {
            this.nodeHelpView = this.createView(this.prefabHelp);
        },

        destroyHelpView: function () {
            if (this.nodeHelpView)
                this.nodeHelpView.destroy();
        },

        createBetLinesView: function () {
            this.nodeBetLinesView = this.createView(this.prefabBetLines);
        },

        destroyBetLinesView: function () {
            if (this.nodeBetLinesView)
                this.nodeBetLinesView.destroy();
        },

        createLeaderboardView: function () {
            this.nodeLeaderboardView = this.createView(this.prefabLeaderboard);
        },

        destroyLeaderboardView: function () {
            if (this.nodeLeaderboardView)
                this.nodeLeaderboardView.destroy();
        },

        createHistoryView: function () {
            this.nodeHistoryView = this.createView(this.prefabHistory);
        },

        destroyHistoryView: function () {
            if (this.nodeHistoryView)
                this.nodeHistoryView.destroy();
        },

        createSessionDetailView: function () {
            this.nodeSessionDetailView = this.createView(this.prefabSessionDetail);
        },

        destroySessionDetailView: function () {
            if (this.nodeSessionDetailView)
                this.nodeSessionDetailView.destroy();
        },

        createBonusGameView: function () {
            return this.nodeBonusGameView = this.createView(this.prefabBonusGame);
        },

        destroyBonusGameView: function () {
            if (this.nodeBonusGameView)
                this.nodeBonusGameView.destroy();
        },

        createX2GameView: function () {
            return this.nodeX2GameView = this.createView(this.prefabX2Game);
        },

        destroyX2GameView: function () {
            if (this.nodeX2GameView)
                this.nodeX2GameView.destroy();
        },

        createHelpMiniView: function () {
            this.nodeHelpView = this.createView(this.prefabHelpMiniGame);
        },

        destroyHelpMiniView: function () {
            if (this.nodeHelpView)
                this.nodeHelpView.destroy();
        },

        createView: function (prefab) {
            var nodeView = cc.instantiate(prefab);
            nodeView.parent = this.node;
            nodeView.setPosition(0, 0);
            return nodeView;
        },

        helpClicked: function () {
            if ((cc.RoomController.getInstance().getGameId() === cc.GameId.EGYPT || cc.RoomController.getInstance().getGameId() === cc.GameId.GAINHAY) 
                && cc.FreeSpinController.getInstance().getStateFreeSpin()) {
                this.createHelpMiniView();
            } else {
                this.createHelpView();
            }
        },

        betLinesClicked: function () {
            this.createBetLinesView();
        },

        leaderboardClicked: function () {
            this.createLeaderboardView();
        },

        historyClicked: function () {
            this.createHistoryView();
        },

        settingClicked: function () {

        },

        closeClicked: function () {
            if (cc.RoomController.getInstance().getGameId() === cc.GameId.EGYPT)
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.EGYPT);
            else
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.GAINHAY);
        },

        backClicked: function () {
            //kiem tra xem cos dang quay ko?
            if (cc.SpinController.getInstance().checkIsSpin()) {
                cc.PopupController.getInstance().showMiniMessage('Bạn không thể thoát khi đang quay');
                return;
            }

            //reset lai cac tham so + tat cac hieu ung + stop cac schedule
            cc.SpinController.getInstance().resetSpin();
            cc.RoomController.getInstance().activeRoom();
            //Xoa sessionID di
            cc.SpinController.getInstance().setSessionID('');
        }
    });
}).call(this);
