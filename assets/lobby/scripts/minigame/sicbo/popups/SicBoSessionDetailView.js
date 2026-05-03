/**
 * Popup chi tiet 1 phien Sicbo - hien thi list dat cuoc Tai/Xiu + ket qua + hash.
 * Ported from TaiXiuSicboSessionDetailView.
 */

(function () {
    cc.SicBoSessionDetailView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            taiSessionDetailListView: cc.SicBoSessionDetailListView,
            xiuSessionDetailListView: cc.SicBoSessionDetailListView,

            lbSessionID: cc.Label,
            nodeTai: cc.Node,
            nodeXiu: cc.Node,
            lblTotalDice: cc.Label,
            lblSicboHash: cc.Label,
            lblResult: cc.Label,
            lblTextNotiNewGame: cc.Label,
            lblTotalUserBetTai: cc.Label,
            lblTotalUserBetXiu: cc.Label,

            nodeEffectTais: [cc.Node],
            nodeEffectXius: [cc.Node],

            lbTai: cc.Label,
            lbXiu: cc.Label,

            spriteDice1: cc.Sprite,
            spriteDice2: cc.Sprite,
            spriteDice3: cc.Sprite,

            lbTotalBetTai: cc.Label,
            lbTotalBetXiu: cc.Label,

            lbTotalRefundTai: cc.Label,
            lbTotalRefundXiu: cc.Label,

            btnNext: cc.Button,
            btnBack: cc.Button,

            sfDices: [cc.SpriteFrame],
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_SICBO;
            this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getSessionDetail();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        checkStatusButton: function () {
            this.btnNext.interactable = this.index !== 0;
            this.btnBack.interactable = this.index !== this.totalHistory - 1;
        },

        getSessionDetail: function () {
            this.index = cc.SicBoController.getInstance().getDetailIndex();
            this.sicbogameHistory = cc.SicBoController.getInstance().getGameHistory();
            this.totalHistory = this.sicbogameHistory ? this.sicbogameHistory.length : 0;

            this.checkStatusButton();
            this.getSessionDetailById(this.index);
        },

        getSessionDetailById: function (index) {
            if (!this.sicbogameHistory || !this.sicbogameHistory[index]) return;
            var game = this.sicbogameHistory[index];

            this.lbSessionID.string = 'Phiên: #' + game.SessionId + ' - Ngày: '
                + cc.Tool.getInstance().convertUTCTime3(game.CreatedDate);

            var isTai;
            if (game.DiceSum > 10) {
                isTai = true;
                this.lbTai.string = game.DiceSum + " = ";
                this.lbXiu.string = '';
            } else {
                isTai = false;
                this.lbXiu.string = " = " + game.DiceSum;
                this.lbTai.string = '';
            }

            this.nodeEffectTais.forEach(function (node) { node.active = isTai; });
            this.nodeEffectXius.forEach(function (node) { node.active = !isTai; });

            this.spriteDice1.spriteFrame = this.sfDices[game.FirstDice - 1];
            this.spriteDice2.spriteFrame = this.sfDices[game.SecondDice - 1];
            this.spriteDice3.spriteFrame = this.sfDices[game.ThirdDice - 1];
            this.lblTotalDice.string = game.DiceSum;

            var sessionInfoCmd = new cc.SBGetSessionInfoCommand;
            sessionInfoCmd.execute(this, game.SessionId);

            var resultCmd = new cc.SBGetResultSessionInfoCommand;
            resultCmd.execute(this, game.SessionId);
        },

        onSBGetResultSessionInfoResponse: function (result) {
            if (!result || !result[0]) return;
            this.lblSicboHash.string = result[0].Md5Encrypt;
            this.lblResult.string = result[0].Md5Decrypt;
            this.lblTotalUserBetTai.string = result[0].TotalAccountEven;
            this.lblTotalUserBetXiu.string = result[0].TotalAccountOdd;
        },

        onSBGetSessionInfoResponse: function (response) {
            if (response === null) return;
            var list = response;

            var totalBetTai = 0;
            var totalBetXiu = 0;
            var totalRefundTai = 0;
            var totalRefundXiu = 0;

            var listTai = [];
            var listXiu = [];

            list.forEach(function (item) {
                if (item.BetSide === cc.SicBoBetSide.TAI) {
                    listTai.push(item);
                    totalBetTai += item.Bet;
                    totalRefundTai += item.Refund;
                } else {
                    listXiu.push(item);
                    totalBetXiu += item.Bet;
                    totalRefundXiu += item.Refund;
                }
            });

            if (listTai !== null && listTai.length > 0) {
                this.taiSessionDetailListView.resetList();
                this.taiSessionDetailListView.initialize(listTai);
            }

            if (listXiu !== null && listXiu.length > 0) {
                this.xiuSessionDetailListView.resetList();
                this.xiuSessionDetailListView.initialize(listXiu);
            }

            this.lbTotalBetTai.string = cc.Tool.getInstance().formatNumberKTX(totalBetTai);
            this.lbTotalBetXiu.string = cc.Tool.getInstance().formatNumberKTX(totalBetXiu);
            this.lbTotalRefundTai.string = cc.Tool.getInstance().formatNumberKTX(totalRefundTai);
            this.lbTotalRefundXiu.string = cc.Tool.getInstance().formatNumberKTX(totalRefundXiu);
        },

        nextSessionClicked: function () {
            this.index--;
            this.xiuSessionDetailListView.resetList();
            this.taiSessionDetailListView.resetList();
            this.getSessionDetailById(this.index);
            this.checkStatusButton();
        },

        backSessionClicked: function () {
            this.index++;
            this.xiuSessionDetailListView.resetList();
            this.taiSessionDetailListView.resetList();
            this.getSessionDetailById(this.index);
            this.checkStatusButton();
        },

        closeClicked: function () {
            this.taiSessionDetailListView.resetList();
            this.xiuSessionDetailListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.SicBoController.getInstance().destroySessionDetailView();
            }, this, 1, 0, delay, false);
        },

        copyHashClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.lblSicboHash.string);
            this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Copy chuỗi SICBO thành công';
            this.animationMess.play('closeMessage');
        },

        copyResultClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.lblResult.string);
            this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Copy chuỗi kết quả thành công';
            this.animationMess.play('closeMessage');
        },
    });
}).call(this);
