(function () {
    cc.LodeChooseView = cc.Class({
        "extends": cc.Component,
        properties: {
            layoutNumber: cc.Node,
            itemNumber: cc.Prefab,
            edbBetValue: cc.EditBox,
            lbChooseNumber: cc.RichText,
            nodeConfirmBet: cc.Node,
            lbTitleBet: cc.RichText,
            lbUserBetValue: cc.RichText,
            lbTotalMoney: cc.RichText,
            //lbNumber: cc.Label,
            nodeNotify: cc.Node,

        },

        onLoad: function () {
            cc.LodeController.getInstance().setChooseView(this);
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
            this.node.parent = cc.find('Canvas');
            this.notifyAnim = this.nodeNotify.getComponent(cc.Animation);
            this.lbChooseNumber.node.active = false;
        },
        onEnable: function () {
            cc.LodeController.getInstance().initNumberChooses();
            this.enableNodeConfirm(false);
        },
        //Hien thi so dat
        showTitleChooseNumber: function () {
            let numberChooses = cc.LodeController.getInstance().getNumberChooses();
            if (numberChooses.length === 0) {
                return this.hideTitleChooseNumber();
            }
            this.lbChooseNumber.node.active = true;
            let titleTyle = this.getTitleTypeBet(this.typeBet);
            let strNumber = "";
            if (numberChooses.length > 0) {
                //Neu ko phai DE_DAU, DE_CUOI them so 0 vao dau so nho hon 10
                if (this.typeBet !== cc.LodeType.DE_DAU && this.typeBet !== cc.LodeType.DE_CUOI) {
                    numberChooses = numberChooses.map(number => number = (number < 10) ? "0" + number : number);
                }
                strNumber = numberChooses.join(',');
            } else {
                strNumber = numberChooses[0];
            }
            let strTitleBet = `Đặt ${titleTyle}: <color=#22F0FF>${strNumber}</c>`;
            this.lbTitleBet.string = strTitleBet;
            this.lbChooseNumber.string = strTitleBet;
        },
        hideTitleChooseNumber: function () {
            this.lbChooseNumber.node.active = false;
        },
        //Validate so luong so dc chon theo tung loai
        isValidNumberBetOfType: function () {
            let numberChooses = cc.LodeController.getInstance().getNumberChooses();
            return (total < this.numberChoose);
        },
        unChooseNumberBefore: function () {
            let numberChooses = cc.LodeController.getInstance().getNumberChooses();
            let totalChoose = numberChooses.length;
            if (totalChoose < this.numberChoose) {
                return;
            }
            //Bo so chon cuoi
            let lastNumber = numberChooses.pop();
            //Reset sprite so cuoi
            let listNumber = this.layoutNumber.children;
            listNumber.map(number => {
                let lodeItemNumber = number.getComponent('LodeItemNumber');
                if (lodeItemNumber.numberValue === lastNumber) {
                    lodeItemNumber.reset();
                }
            });
        },
        isMaxChoose: function () {
            let numberChooses = cc.LodeController.getInstance().getNumberChooses();
            return numberChooses.length >= this.numberChoose;
        },
        //Mo popup chon so
        onOpenChooseNumber: function (type) {
            this.typeBet = parseInt(type);
            cc.LodeController.getInstance().setTypeBet(parseInt(type));
            this.totalNumberChoose = 100;//So luong so dc chon
            this.numberChoose = 10;
            this.layoutNumber.width = 1180;
            switch (parseInt(type)) {
                case cc.LodeType.XIEN2:
                    this.numberChoose = 2;
                    break;
                case cc.LodeType.XIEN3:
                    this.numberChoose = 3;
                    break;
                case cc.LodeType.XIEN4:
                    this.numberChoose = 4;
                    break;
                case cc.LodeType.DE_DAU:
                case cc.LodeType.DE_CUOI:
                    this.totalNumberChoose = 10;
                    break;
            }
            if (this.totalNumberChoose == 10) {
                this.layoutNumber.width = 700;
            }
            //this.lbChooseNumber.string = this.numberChoose;
            this.fillNumberChoose();
            this.animation.play('openPopup');
        },
        getTitleTypeBet: function (type) {
            switch (type) {
                case cc.LodeType.DE:
                    return 'Đề';
                case cc.LodeType.DE_DAU:
                    return 'Đề đầu';
                case cc.LodeType.DE_CUOI:
                    return 'Đề cuối';
                case cc.LodeType.LO:
                    return 'Lô';
                case cc.LodeType.XIEN2:
                    return 'Xiên 2';
                case cc.LodeType.XIEN3:
                    return 'Xiên 3';
                case cc.LodeType.XIEN4:
                    return 'Xiên 4';
            }
        },
        //fill number
        fillNumberChoose: function () {
            //Clear layout
            this.layoutNumber.removeAllChildren();
            for (let i = 0; i < this.totalNumberChoose; i++) {
                let item = cc.instantiate(this.itemNumber);
                item.getComponent('LodeItemNumber').setNumber(i);
                item.parent = this.layoutNumber;
            }
        },
        //An hien node confirm Bet
        enableNodeConfirm: function (enable) {
            this.nodeConfirmBet.active = enable;
        },
        //Mo popup xac nhan dat cuoc
        openConfirmBet: function () {
            let arrTypeXien = [cc.LodeType.XIEN2, cc.LodeType.XIEN3, cc.LodeType.XIEN4];
            let arrTypeMin5 = [cc.LodeType.LO, cc.LodeType.DE_DAU, cc.LodeType.DE_CUOI, cc.LodeType.XIEN2, cc.LodeType.XIEN3, cc.LodeType.XIEN4];
            var betValue = parseFloat(cc.Tool.getInstance().removeDot(this.edbBetValue.string));
            let numberChooses = cc.LodeController.getInstance().getNumberChooses();
            if (numberChooses.length === 0) {
                return this.showNotify("VUI LÒNG CHỌN SỐ!");
            }
            if (betValue.length == 0 || isNaN(betValue)) {
                return this.showNotify("VUI LÒNG NHẬP TIỀN CƯỢC!");
            }
            if (betValue < 1000 && this.typeBet === cc.LodeType.DE) {
                return this.showNotify("TIỀN CƯỢC TỐI THIỂU 1.000!");
            }
            if(betValue < 5000 && arrTypeMin5.includes(this.typeBet)) {
                return this.showNotify("TIỀN CƯỢC TỐI THIỂU 5.000!");
            }
            betValue = parseFloat(betValue);


            if (this.numberChoose > numberChooses.length && arrTypeXien.includes(this.typeBet)) {
                return this.showNotify("VUI LÒNG CHỌN " + this.numberChoose + " SỐ!");
            }
            //Neu bet Xien 2, 3, 4 -> Giu nguyen tong tien
            this.userBet = betValue;
            let totalBet = (arrTypeXien.includes(this.typeBet)) ? betValue : betValue * numberChooses.length;
            //Kiem tra so du
            if (betValue > cc.BalanceController.getInstance().getBalance()) {
                return this.showNotify("SỐ DƯ KHÔNG ĐỦ!");
            }

            this.lbUserBetValue.string = `Số tiền: <color=#FCFE03>${cc.Tool.getInstance().formatNumber(betValue)}</c>`;
            this.lbTotalMoney.string = `Tổng tiền: <color=#FCFE03>${cc.Tool.getInstance().formatNumber(totalBet)}</c>`;
            //Convert number
            //Neu ko phai DE_DAU, DE_CUOI them so 0 vao dau so nho hon 10
            if (this.typeBet !== cc.LodeType.DE_DAU && this.typeBet !== cc.LodeType.DE_CUOI) {
                numberChooses = numberChooses.map(number => number = (number < 10) ? "0" + number : number);
            }
            //numberChooses = numberChooses.map(item => item = (item < 10) ? "0" + item : item);
            //let strNumberChooses = (numberChooses.length > 1) ? numberChooses.join(',') : numberChooses[0];
            //this.lbNumber.string = strNumberChooses;

            this.enableNodeConfirm(true);

        },
        //Xac nhan dat cuoc
        confirmBet: function () {
            let numberChooses = cc.LodeController.getInstance().getNumberChooses();
            //format so dat
            //Neu ko phai DE_DAU, DE_CUOI them so 0 vao dau so nho hon 10
            if (this.typeBet !== cc.LodeType.DE_DAU && this.typeBet !== cc.LodeType.DE_CUOI) {
                numberChooses = numberChooses.map(number => number = (number < 10) ? "0" + number : number);
            }
            cc.LodeController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, this.typeBet, this.userBet, numberChooses.join(','));
            //Gui du lieu len server
            this.enableNodeConfirm(false);
            this.onCancelClicked();
        },
        chooseAgain: function () {
            this.enableNodeConfirm(false);
        },
        //Huy chon so
        onCancelClicked: function () {

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LodePopupController.getInstance().destroyHistoryView();
                this.node.removeFromParent();
            }, this, 1, 0, delay, false);
        },
        showNotify: function (message) {
            this.nodeNotify.active = true;
            let labelMessage = this.nodeNotify.getChildByName('label').getComponent(cc.Label);
            labelMessage.string = message;
            this.notifyAnim.play('openPopup')
            cc.director.getScheduler().schedule(function () {
                this.nodeNotify.active = false;
            }, this, 1, 0, 0, false);
        },
        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.edbBetValue.string);
            this.edbBetValue.string = cc.Tool.getInstance().formatNumber(val);
        },

        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.edbBetValue.string);
            this.edbBetValue.string = cc.Tool.getInstance().formatNumber(val);
        },
    });
}).call(this);
