/**
 * Input dat cuoc
 */

(function () {
    cc.TaiXiuInputBetView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeInput: cc.Node, //node input
            nodeInputValue: cc.Node, //node chon so tien de bet
            nodeInputFree: cc.Node, //node tu do chon so tien
            nodeinputtai: cc.Node,
			nodeinputxiu: cc.Node,
            lbBetTaiTemp: cc.Label,
            lbBetXiuTemp: cc.Label,
			lblTextNotiNewGame: cc.Label,
			//slidetaiip: cc.Node,
			//slidexiuip: cc.Node,
            audioChonSo: cc.AudioSource,
            editBoxDatTai: cc.EditBox,
            editBoxDatXiu: cc.EditBox,
			//nodengocrong: cc.Node,
        },

        onLoad: function () {
            this.resetInput();
            this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
            this.animation = this.node.getComponent(cc.Animation);
            cc.TaiXiuController.getInstance().setTaiXiuInputBetView(this);

            this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuController.getInstance().setTaiXiuInputBetView(null);
        },

        reset: function () {
            /* ko can cua so input
            this.nodeInput.active = false;
            this.isInputValue = true;
            */

            //reset lai gia tri input
            //this.resetInput();
            if (cc.sys.isNative) {
                this.editBoxDatTai.active = false;
                this.editBoxDatXiu.active = false;
            }
        },

        //reset lai gia tri input
        resetInput: function () {
            this.lbBetTaiTemp.string = '';
            this.lbBetXiuTemp.string = '';

            // this.lbBetTaiTemp.string = '0';
            // this.lbBetXiuTemp.string = '0';
            this.editBoxDatXiu.string = '';
            this.editBoxDatTai.string = '';

            this.betValue = 0;
        },

        //mo cua so input
        openInput: function () {
            cc.TaiXiuController.getInstance().resetPositionTX();

            this.nodeInput.active = true;

            this.nodeInputValue.active = true;
            this.nodeInputFree.active = false;
            this.isInputValue = true;

            this.animation.play('openBetInput');
        },

        //dong input
        closeInput: function () {
            this.resetInput();
            this.animation.play('closeBetInput');
        },

        //animation trigger goi sau khi dong cua so input
        closeBetInputEvent: function () {
            this.nodeInput.active = false;
        },

        //cap nhat gia tri bet dua tren so tien Bet
        updateValueBetUI: function () {
            if (this.betSide === cc.TaiXiuBetSide.TAI) {
                this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            } else {
                this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            }
        },

        //click mo cua so input Tai
        openInputBetTaiClicked: function () {
			this.audioChonSo.play();
			    this.resetInput();
          
				this.nodeinputtai.active = false;
				//this.slidetaiip.active = true;
				//this.nodengocrong.active = false;
				//this.slidexiuip.active = false;
				this.nodeinputxiu.active = true;
                this.betSide = cc.TaiXiuBetSide.TAI;
                this.lbBetTaiTemp.string = 0;
                this.openInput();
                if (!cc.sys.isNative) {
                    this.editBoxDatTai.focus();
                }
           
        },

        //click mo cua so input Xiu
        openInputBetXiuClicked: function () {
			this.audioChonSo.play();
                this.resetInput();
				this.nodeinputtai.active = true;
				//this.slidetaiip.active = false;
				//this.nodengocrong.active = false;
				//this.slidexiuip.active = true;
				this.nodeinputxiu.active = false;
                this.betSide = cc.TaiXiuBetSide.XIU;
                this.lbBetXiuTemp.string = 0;
                this.openInput();
                if (!cc.sys.isNative) {
                    this.editBoxDatXiu.focus();
                }
           
        },

        //chon gia tri
        betValueClicked: function (event, data) {
            var coin = cc.BalanceController.getInstance().getBalance();
            this.audioChonSo.play();

            if (coin <= 0) {
                cc.PopupController.getInstance().showMessage('Bạn không đủ số dư.');
                return;
            }

            this.betValue += parseInt(data.toString());

            if (this.betValue > coin) {
                cc.PopupController.getInstance().showMessage('Bạn không đủ số dư, đặt tất tay.');
                this.betValue = coin;
            }
            this.updateValueBetUI();
        },

        //them so
        addValueClicked: function (event, data) {
            this.betValue += data.toString();
            this.betValue = parseInt(this.betValue);

            this.updateValueBetUI();
            this.audioChonSo.play();
        },

        //lui 1 so
        deleteClicked: function () {
            this.betValue = (this.betValue.toString().substring(0, this.betValue.toString().length - 1));
            if (this.betValue === '') {
                this.betValue = 0;
            } else {
                this.betValue = parseInt(this.betValue);
            }

            this.updateValueBetUI();
            this.audioChonSo.play();
        },

        //huy input
        cancelClicked: function () {
			this.nodeinputtai.active = true;
			this.nodeinputxiu.active = true;
			//this.slidexiuip.active = false;
			//this.slidetaiip.active = false;
            this.closeInput();
            this.audioChonSo.play();
        },
        allInClick(){
            let coin = cc.BalanceController.getInstance().getBalance();
            if(this.betSide ==cc.TaiXiuBetSide.XIU){
                this.onTextXiuChange(coin)
            }else{
                this.onTextTaiChange(coin)
            }
        },
        //xac nhan bet
        confirmClicked: function () {
            this.audioChonSo.play();

            if (this.betValue < 1000) {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập tiền đặt!');
                return;
            }
            if (cc.BalanceController.getInstance().getBalance() < this.betValue) {
                cc.PopupController.getInstance().showMessage('Số dư của bạn không khả dụng.');
                return;
            }

            cc.TaiXiuController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, this.betValue, this.betSide);
            this.lbBetXiuTemp.string = 0;
            this.lbBetTaiTemp.string = 0;
            this.resetInput();
        },

        //chuyen kieu input
        otherClicked: function () {
            this.betValue = 0;
            this.updateValueBetUI();

            this.nodeInputValue.active = !this.isInputValue;
            this.nodeInputFree.active = this.isInputValue;
            this.isInputValue = !this.isInputValue;
            this.audioChonSo.play();
        },

        //text xiu change
        onTextXiuChange: function(data) {
            this.betValue = data.toString();
            this.betValue = parseInt(this.betValue);
            this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            this.audioChonSo.play();
        },
        //text tai change
        onTextTaiChange: function(data) {
            this.betValue = data.toString();
            this.betValue = parseInt(this.betValue);
            this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            this.audioChonSo.play();
        }

    });
}).call(this);
