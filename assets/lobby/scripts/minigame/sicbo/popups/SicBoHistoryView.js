/**
 * Created by TrungMTA on 01/20/2023.
 */

(function () {
    cc.SicBoHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            sicboHistoryListView: cc.SicBoHistoryListView,
            sicboHistoryListViewRight: cc.SicBoHistoryListView,
            spDice1: cc.Sprite,
            spDice2: cc.Sprite,
            spDice3: cc.Sprite,
            spDices: [cc.SpriteFrame],
            lbSession: cc.Label,
            lbMd5Decrypt: cc.Label,
            lbMd5Encrypt: cc.Label,
            lbResult: cc.Label,
            nodeCopyEncrypt: cc.Node,
            nodeCopyDecrypt: cc.Node,
            btnNextSession: cc.Button,
            btnPrevSession: cc.Button,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_SICBO;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopSessionWinners();
            }, this, 1, 0, delay, false);
            this.animation.play('openPopup');
        },

        getTopSessionWinners: function () {
            var sBGetSessionHistoryDetailsCommand = new cc.SBGetSessionHistoryDetailsCommand;
            sBGetSessionHistoryDetailsCommand.execute(this);
        },

        onSBGetSessionHistoryDetailsResponse: function (list) {
            this.listSession = list;
            this.currentSessionIndex = 0;
            this.setSessionInfo(list[this.currentSessionIndex]);
        },

        setSessionInfo: function (sessionInfo) {
            this.spDice1.spriteFrame = this.spDices[sessionInfo.FirstDice - 1];
            this.spDice2.spriteFrame = this.spDices[sessionInfo.SecondDice - 1];
            this.spDice3.spriteFrame = this.spDices[sessionInfo.ThirdDice - 1];
            this.lbSession.string = '#' + sessionInfo.SessionID + '(' + sessionInfo.CreateTimeFm + ')';
            this.lbMd5Decrypt.string = sessionInfo.Md5Decrypt;
            this.lbMd5Encrypt.string = sessionInfo.Md5Encrypt;

            var diceSum = sessionInfo.FirstDice + sessionInfo.SecondDice + sessionInfo.ThirdDice;

            var result = '';

            if (diceSum > 10) {
                result = diceSum + ' / TÀI';
            } else {
                result = diceSum + ' / XỈU';
            }

            this.lbResult.string = result;

            this.currentSessionInfo = sessionInfo;

            this.checkEnableButtonSession();

            this.getAccountBetDetails(sessionInfo.SessionID);
        },

        getAccountBetDetails: function (sessionId) {
            var sBGetAccountBetHistoryCommand = new cc.SBGetAccountBetHistoryCommand;
            sBGetAccountBetHistoryCommand.execute(this, sessionId);
        },

        onSBGetAccountBetHistoryResponse: function (list) {
            this.onSBGetHistoryResponse(list)
        },

        onSBGetHistoryResponse: function (response) {
            if (!response) {
                this.sicboHistoryListView.resetList();
                this.sicboHistoryListViewRight.resetList();
            }
            var list = this.chunkArray(response, (response.length / 2) + (response.length % 2 == 0 ? 0 : 1));
            if (list !== null && list.length > 0) {
                this.sicboHistoryListView.resetList();
                this.sicboHistoryListView.initialize(list[0]);
                this.sicboHistoryListViewRight.resetList();
                this.sicboHistoryListViewRight.initialize(list[1]);
            }
        },

        closeClicked: function () {
            this.sicboHistoryListView.resetList();
            this.sicboHistoryListViewRight.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.SicBoController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },

        btnCopyEncryptClicked: function () {
            if (!this.currentSessionInfo) {
                return;
            }

            cc.Tool.getInstance().copyToClipboard(this.currentSessionInfo.Md5Encrypt);

            cc.tween(this.nodeCopyEncrypt)
                .to(0, { opacity: 0 })
                .to(.15, { opacity: 255 })
                .delay(2)
                .to(0.15, { opacity: 0 })
                .start();
        },

        btnCopyDecryptClicked: function () {
            if (!this.currentSessionInfo) {
                return;
            }

            cc.Tool.getInstance().copyToClipboard(this.currentSessionInfo.Md5Decrypt);

            cc.tween(this.nodeCopyDecrypt)
                .to(0, { opacity: 0 })
                .to(.15, { opacity: 255 })
                .delay(2)
                .to(0.15, { opacity: 0 })
                .start();
        },

        btnNextSessionClicked: function () {
            if (this.currentSessionIndex > 0) {
                this.currentSessionIndex--;
            }

            this.sicboHistoryListView.resetList();
            this.sicboHistoryListViewRight.resetList();

            this.setSessionInfo(this.listSession[this.currentSessionIndex]);
        },

        btnPrevSessionClicked: function () {
            if (this.currentSessionIndex < this.listSession.length - 1) {
                this.currentSessionIndex++;
            }

            this.sicboHistoryListView.resetList();
            this.sicboHistoryListViewRight.resetList();

            this.setSessionInfo(this.listSession[this.currentSessionIndex]);
        },

        checkEnableButtonSession: function () {
            if (this.currentSessionIndex == this.listSession.length - 1) {
                this.btnPrevSession.node.active = false;
            } else {
                this.btnPrevSession.node.active = true;
            }

            if (this.currentSessionIndex == 0) {
                this.btnNextSession.node.active = false;
            } else {
                this.btnNextSession.node.active = true;
            }

        },

        chunkArray: function (myArray, chunk_size) {
            var results = [];

            while (myArray.length) {
                results.push(myArray.splice(0, chunk_size));
            }

            return results;
        }
    });
}).call(this);
