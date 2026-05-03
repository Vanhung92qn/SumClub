/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKInputView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeRaise: cc.Node,
            nodeRaiseConfirm: cc.Node,

            nodeBet: cc.Node,
            nodeBetConfirm: cc.Node,

            nodeFold: cc.Node,
            nodeCall: cc.Node,
            nodeCheck: cc.Node,
            nodeAllIn: cc.Node,


            nodeSliderInput: cc.Node,
            sliderInput: cc.SliderInput,
            lbCall: cc.Label,
        },

        onLoad: function () {
            cc.PKController.getInstance().setPKInputView(this);

            //vi tri dealer
            this.rootDealerPos = cc.v2(0 , 136);
            this.currentState = -1;

            this.raiseVal = 0; //gia tri raise
        },

        sliderEvent: function (target, val) {
            target.raiseVal = val;
        },

        sendRequestReBet: function (bet) {
            //kiem tra so du
            if (cc.BalanceController.getInstance().getBalance() < bet.Amount) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ');
                return;
            } else {
                //send request
                cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, bet.Amount, bet.Gate);
            }
        },

        showLastInput: function (info) {
            // console.log('XXInput showLastInput');
            var self = this;
            var betLogs = info.GameLoop.BetLogs;
            //duyet qua betLog của tat ca player
            betLogs.forEach(function (betLog) {
                //duyet qua cac luot bet cua player
                betLog.forEach(function (bet) {
                    self.playFxUserBet(
                        cc.PKController.getInstance().getIndexUIBetByAccID(bet.AccountID),
                        bet.Gate,
                        self.getChipIndexFromValue(bet.Amount),
                        false
                    );

                    //them tong dat o cac cua
                    self.totalBets[bet.Gate - 1] += bet.Amount;
                    self.lbTotalBets[bet.Gate - 1].string = cc.Tool.getInstance().formatNumber(self.totalBets[bet.Gate - 1]);

                    //them tong dat o cac cua (cua user)
                    if (bet.AccountID === cc.LoginController.getInstance().getUserId()) {
                        self.totalUserBets[bet.Gate - 1] += bet.Amount;
                        self.lbTotalUserBets[bet.Gate - 1].string = cc.Tool.getInstance().formatNumber(self.totalUserBets[bet.Gate - 1]);
                        self.lbTotalUserBets[bet.Gate - 1].node.parent.active = true;
                    }
                })
            });
        },

        activeButtonByActions: function (actions) {
            var self = this;
            actions.forEach(function (action) {
                switch (action.Action.toString()) {
                    case cc.PKAction.CHECK:
                        self.nodeCheck.active = true;
                        break;
                    case cc.PKAction.BET:
                        self.nodeBet.active = true;
                        self.sliderInput.init(action.Min, action.Max, self.sliderEvent, self);
                        break;
                    case cc.PKAction.CALL:
                        self.nodeCall.active = true;
                        self.lbCall.string = cc.Tool.getInstance().formatNumberK(action.Min);
                        break;
                    case cc.PKAction.RAISE:
                        self.nodeRaise.active = true;
                        self.sliderInput.init(action.Min, action.Max, self.sliderEvent, self);
                        break;
                    case cc.PKAction.FOLD:
                        self.nodeFold.active = true;
                        break;
                    case cc.PKAction.ALL_IN:
                        self.nodeAllIn.active = true;
                        break;
                }
            })
        },

        deActiveAllButton: function () {
            this.nodeRaise.active = false;
            this.nodeBet.active = false;
            this.nodeFold.active = false;
            this.nodeCall.active = false;
            this.nodeCheck.active = false;
            this.nodeAllIn.active = false;
            this.nodeRaiseConfirm.active = false;
            this.nodeBetConfirm.active = false;

            this.nodeSliderInput.active = false;
        },

        updateInput: function (state) {

            //luu lai state hien tai
            this.currentState = state;
        },

        //lay ve action hien tai
        getAction: function (pkAction) {
            var lstActions = cc.PKController.getInstance().getActions();
            for (var i = 0; i < lstActions.length; i++) {
                if (pkAction === lstActions[i].Action.toString()) {
                    return lstActions[i];
                }
            }
        },

        //
        betClicked: function () {
            //bat thanh truot
            this.nodeSliderInput.active = true;
            //tat node bet + bat node confirm bet len
            this.nodeBet.active = false;
            this.nodeBetConfirm.active = true;
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },

        raiseClicked: function () {
            //bat thanh truot
            this.nodeSliderInput.active = true;
            //tat node raise + bat node confirm raise len
            this.nodeRaise.active = false;
            this.nodeRaiseConfirm.active = true;
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },

        confirmRaiseClicked: function () {
            this.nodeSliderInput.active = false;
            this.deActiveAllButton();
            cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, this.raiseVal, parseInt(cc.PKAction.RAISE));
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },

        confirmBetClicked: function () {
            this.nodeSliderInput.active = false;
            this.deActiveAllButton();
            cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, this.raiseVal, parseInt(cc.PKAction.BET));
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },
        
        allInClicked: function () {
            this.nodeSliderInput.active = false;
            this.deActiveAllButton();
            cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, 0, parseInt(cc.PKAction.ALL_IN));
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },
        
        foldClicked: function () {
            this.nodeSliderInput.active = false;
            this.deActiveAllButton();
            cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, 0, parseInt(cc.PKAction.FOLD));
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },
        
        callClicked: function () {
            this.nodeSliderInput.active = false;
            this.deActiveAllButton();
            var action = this.getAction(cc.PKAction.CALL);
            cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, action.Min, parseInt(cc.PKAction.CALL));
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },
        
        checkClicked: function () {
            this.nodeSliderInput.active = false;
            this.deActiveAllButton();
            cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, 0, parseInt(cc.PKAction.CHECK));
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },
    });
}).call(this);
