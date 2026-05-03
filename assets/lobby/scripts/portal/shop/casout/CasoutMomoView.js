// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var helper = require('Helper');
cc.Class({
    extends: cc.Component,

    properties: {
        animationMenuOTP: cc.Animation,
        Phone: cc.EditBox,
        Amount: cc.EditBox,
        Name: cc.EditBox,
        noderutok: cc.Node,
        nodexacnhan: cc.Node,
        editOtp: cc.EditBox,
        ghichu: cc.Label,
        sotienview: cc.Label,
        btnConfirm: cc.Button,
        lbConfirms: [cc.Label],
        lbCasoutCoin: cc.Label,
        audioClick: cc.AudioSource,
        audioClickRut: cc.AudioSource,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    onLoad: function () {
        this.rate = 0;
        this.isTimer = false;
        this.timer = 0;
        // this.timePerGetOTP = 120;
        this.updateInterval = 1;
        this.updateTimer = 0;

    },
    clickruttien: function () {
        if (this.Phone.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập Số điện thoại Momo');
            return;
        }

        if (this.Amount.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập số ' + cc.Config.getInstance().currency() + ' cần rút');
            return;
        }
        this.ghichu.string = "SĐT " + this.Phone.string + " Tên TK " + this.Name.string;
        this.sotienview.string = " Số tiền rút " + helper.numberWithCommas(this.Amount.string);
        this.noderutok.active = false;
        this.nodexacnhan.active = true;
        // this.onSubmit();
    },
    getOTPClicked: function () {
        // this.activeTimeOTPButton();
        var getOTPCommand = new cc.GetOTPCommand;
        getOTPCommand.execute(this, '', this.otpType);
        this.activeTimeConfirm();
    },
    onGetOTPResponse: function (response) {
        if (response.Message) {
            cc.PopupController.getInstance().showMessage(response.Message);
        } else {
            cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
        }
    },

    onGetOTPResponseError: function (response) {
        cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
    },

    onSubmit: function () {
        if (this.Phone.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập Số điện thoại Momo');
            return;
        }

        if (this.Amount.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập số ' + cc.Config.getInstance().currency() + ' cần rút');
            return;
        }
        // if (this.editOtp.string === '') {
        //     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
        //     return;
        // }
        this.VarOtp = this.editOtp.string;
        var magd = helper.randomString(3);
        //console.log(magd);
        this.VarCodeValue = "MoMo_" + magd;
        this.VarPhone = this.Phone.string;
        this.VarName = this.Name.string;
        this.VarAmount = this.Amount.string;
        var CastoutMomoChargeOut = new cc.CastoutMomoChargeOut();
        CastoutMomoChargeOut.execute(this);
        this.audioClickRut.loop = false;
        this.audioClickRut.play();
    },
    onEnable: function () {
        this.noderutok.active = true;
        this.nodexacnhan.active = false;
        var CastoutGetMomo = new cc.CastoutGetMomo;
        CastoutGetMomo.execute(this);
        this.isTimerConfirm = false;
        this.timerConfirm = 0;
        this.timePerConfirm = 60;
        this.processTimeConfirm();
    },
    activeTimeConfirm: function () {
        this.isTimerConfirm = true;
        this.timerConfirm = this.timePerConfirm;
    },
    update: function (dt) {
        if (this.isTimerConfirm) {
            this.timerConfirm -= dt;

            this.processTimeConfirm();
        }
    },
    processTimeConfirm: function () {
        if (this.timerConfirm <= 0) {
            this.isTimerConfirm = false;
            this.btnConfirm.interactable = true;

            this.lbConfirms.forEach(function (lbConfirm) {
                lbConfirm.string = 'Lấy OTP';
            });
        } else {
            var self = this;
            var time = Math.round(self.timerConfirm);
            this.isTimerConfirm = true;
            this.btnConfirm.interactable = false;
            this.lbConfirms.forEach(function (lbConfirm) {
                lbConfirm.string = time;
            });
        }
    },
    onGetMomoResponse: function (data) {
        this.rate = data.Rate;
    },
    onGetMomoError: function (data) {

    },
    onCastoutMomoChargeOutResponse: function (data) {
        cc.PopupController.getInstance().showMessage(data.Message);
    },
    onCastoutMomoChargeOutResponseError: function (data) {

        cc.PopupController.getInstance().showMessageError(data.Message);
    },


    onTotalAmount: function () {
        let coin = this.Amount.string;
        coin = parseFloat(coin);
        this.lbCasoutCoin.string = helper.numberWithCommas(coin);
    }
    // update (dt) {},
});
