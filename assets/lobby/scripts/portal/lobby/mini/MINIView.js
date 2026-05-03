/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.MINIView = cc.Class({
        "extends": cc.Component,
        properties: {
            animationMINI: cc.Animation,
            nodeMini: cc.Node,
            nodeCancel: cc.Node,
            nodeMiniAniTai: cc.Node,
            nodeMiniAniXiu: cc.Node,

            nodeBtnMini: cc.Node,

            lbTimerTxs: [cc.Label],
            lbTimerTxMd5: cc.Label,

            nodeAniTai: cc.Node,
            nodeAniXiu: cc.Node,
            nodeAniTaiMd5: cc.Node,
            nodeAniXiuMd5: cc.Node,

            AudioClick: cc.AudioSource,
        },

        // use this for initialization
        onLoad: function () {
            this.isOpen = false;
            this.node.zIndex = cc.NoteDepth.MINI_VIEW;
            this.nodeBtnMini.parent.zIndex = cc.NoteDepth.MINI_VIEW_BUTTON;
            this.animationBtnMini = this.nodeBtnMini.getComponent(cc.Animation);

            cc.MINIController.getInstance().setMiniView(this);
        },

        updateTimerTx: function (timer, txState) {
            this.lbTimerTxs.forEach(function (lbTimer) {
                switch (txState) {
                    case cc.TaiXiuState.BETTING:
                    case cc.TaiXiuState.END_BETTING:
                       // lbTimer.node.color = cc.Color.YELLOW;
                        break;
                    case cc.TaiXiuState.RESULT: //15
                    case cc.TaiXiuState.PREPARE_NEW_SESSION:
                     //   lbTimer.node.color = cc.Color.WHITE;
                        break;

                }
                lbTimer.string = timer;
            });
        },

        updateTimerTxMd5: function (timer, txState) {
            switch (txState) {
                case cc.TaiXiuState.BETTING:
                case cc.TaiXiuState.END_BETTING:
                    //this.lbTimerTxMd5.node.color = cc.Color.YELLOW;
                    break;
                case cc.TaiXiuState.RESULT: //15
                case cc.TaiXiuState.PREPARE_NEW_SESSION:
                   // this.lbTimerTxMd5.node.color = cc.Color.WHITE;
                    break;

            }
            this.lbTimerTxMd5.string = timer;
        },
        
		updateInfoTx: function (info, txState) {
			var totalDice = info.Result.Dice1 + info.Result.Dice2 + info.Result.Dice3;
            switch (txState) {
                case cc.TaiXiuState.BETTING:
                case cc.TaiXiuState.END_BETTING:
                case cc.TaiXiuState.PREPARE_NEW_SESSION:
                    this.nodeMiniAniTai.active = false;
                    this.nodeMiniAniXiu.active = false;
                    this.nodeAniTai.active = false;
                    this.nodeAniXiu.active = false;
                    break;
                case cc.TaiXiuState.RESULT:
                    if(cc.TaiXiuController.getInstance().getIsNan()) {
                        this.nodeAniTai.active = false;
                        this.nodeAniXiu.active = false;
                        this.nodeMiniAniTai.active = false;
                        this.nodeMiniAniXiu.active = false;
                    } else if (totalDice >= 3 && totalDice <= 18) {
                        console.log('tx result')
						if (totalDice > 10) {
                            this.nodeAniTai.active = true;
                            this.nodeMiniAniTai.active = true;
                        } else {
                            this.nodeAniXiu.active = true;
                            this.nodeMiniAniXiu.active = true;
                        }
                    }
                    break;
            }
		},
        
		updateInfoTxMd5: function (info, txState) {
			var totalDice = info.Result.Dice1 + info.Result.Dice2 + info.Result.Dice3;
            switch (txState) {
                case cc.TaiXiuState.BETTING:
                case cc.TaiXiuState.END_BETTING:
                case cc.TaiXiuState.PREPARE_NEW_SESSION:
                    this.nodeAniTaiMd5.active = false;
                    this.nodeAniXiuMd5.active = false;
                    break;
                case cc.TaiXiuState.RESULT:
                    if(cc.TaiXiuMd5Controller.getInstance().getIsNan()) {
                        this.nodeAniTaiMd5.active = false;
                        this.nodeAniXiuMd5.active = false;
                    } else if (totalDice >= 3 && totalDice <= 18) {
						if (totalDice > 10) {
                            this.nodeAniTaiMd5.active = true;
                        } else {
                            this.nodeAniXiuMd5.active = true;
                        }
                    }
                    break;
            }
		},

        open: function () {
            this.animationMINI.play('openMINI');
            this.isOpen = true;
            this.nodeCancel.active = true;
            this.nodeMini.active = true;
            this.animationBtnMini.play('fadeIn');

            var self = this;
            var delay = 0.25;
            cc.director.getScheduler().schedule(function () {
                self.nodeBtnMini.parent.active = false; 
            }, this, 1, 0, delay, false);
        },

        close: function () {
            this.animationMINI.play('closeMINI');        
            this.isOpen = false;
            this.nodeCancel.active = false;        
            this.animationBtnMini.play('fadeOut');

            var self = this;
            cc.director.getScheduler().schedule(function () {            
                self.nodeBtnMini.parent.active = true;
                self.nodeMini.active = false;
            }, this, 0, 0, 0.3, false);
        },

        openClicked: function () {
            this.open();
            this.AudioClick.loop = false;
            this.AudioClick.play();
        },

        closeClicked: function () {
            this.close();
        },

        joinGameClicked: function (event, data) {
            this.close();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().joinGame(data);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, cc.DDNA.getInstance().getGameById(data.toString()), cc.DDNAUIType.MINIGAME);
            }
        },

        openVQMMClicked: function () {
            this.close();

            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createVQMMView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'MINIGAME', cc.DDNAUIType.BUTTON);
            }
        },
    });
}).call(this);
