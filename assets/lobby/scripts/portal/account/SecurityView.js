/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.SecurityView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbBalance: cc.Label,
            nodeGroupNoPhoneNumber: cc.Node,
            editBoxPhoneNumber: cc.EditBox,
            editBoxOTP: cc.EditBox,
            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],
            toggleLoginSecurity: cc.Toggle,
            lbPhoneNumber: cc.Label,
            lbID: cc.Label,
            //group hien khi da dky so dien thoai
            nodeGroupHavePhoneNumber: cc.Node,
            //group kichhoat/huy BM Login va xoa so dien thoai
            nodeGroupDeActive: cc.Node,
            //confirm huy BM Login
            nodeGroupConfirmDeActive: cc.Node,
            //confirm xoa so dt
            nodeGroupConfirmDeletePhone: cc.Node,

            //node button kich hoat BM Login
            nodeActive: cc.Node,
            //node button Huy kich hoat BM Login
            nodeDeActive: cc.Node,
            //#KingViet
            nodeBtnLinkAppSafe: cc.Node,

            //node Huy SĐT Bao mat
            nodeDeletePhone: cc.Node,
            //node Them SĐT Bao Mat
            nodeAddPhone: cc.Node,


            //editboxOTP khi confirm huy BM Login
            editBoxOTPDeActive: cc.EditBox,

            editBoxOTPDeletePhone: cc.EditBox,

            //dropdown menu
            nodeTeleSafes: [cc.Node],

            animationMenuOTPDeletePhone: cc.Animation,
            animationMenuOTPCancelLoginSecurity: cc.Animation,

            lbOTPDeletePhone: cc.Label,
            lbOTPCancelLoginSecurity: cc.Label,

            groupNodeVNs: [cc.Node],
            groupNodeKVs: [cc.Node],

            lbNickName: cc.Label,
            lbPhoneNumberInfo: cc.Label,
            nodeButtonPhoneNumber: cc.Node, //bat len khi chua co sdt thay cho lbPhoneNumber
            
            nodeInfo: cc.Node,
            nodeSercurity: cc.Node,
            nodeKetAnToan: cc.Node,
            lbOTPTypeNoPhone: cc.Label,
            animationMenuOTPNoPhone: cc.Animation,
            animationMenuMaVung : cc.Animation,
            lbMaVung:cc.Label,
            btnOTPFree:cc.Node,
            noteTxt:cc.Node
        },
        openMenuCardTypeClicked: function () {
            this.animationMenuMaVung.play(this.animOpenName);
        },
        hideMenuCardTypeClicked: function () {
            this.animationMenuMaVung.play(this.animCloseName);
        },
        setLBMaVung: function (value) {
            this.lbMaVung.string = value;
        },
        selectMaVung: function(event, data) {
            console.log(data);
            this.setLBMaVung(data.toString());
            this.animationMenuMaVung.play(this.animCloseName);
        },
        onLoad: function () {
            this.animOpenName = 'showDropdownMenu';
            this.animCloseName = 'hideDropdownMenu';
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            this.otpType = cc.OTPType.TELE_GRAM; //default
            this.lbOTPDeletePhone.string = 'OTP TELE';
    
            this.nodeTabActive = this.nodeInfo;
            this.nodeTabActive.active = true;
            this.isOpenFromLobby = false;
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.groupNodeVNs.forEach(function (node) {
                    node.active = false;
                });
                this.groupNodeKVs.forEach(function (node) {
                    node.active = true;
                });
            } else {
                this.groupNodeVNs.forEach(function (node) {
                    node.active = true;
                });
                this.groupNodeKVs.forEach(function (node) {
                    node.active = false;
                });
            }
        },

        onEnable: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            var nextVP = cc.LoginController.getInstance().getNextVPResponse();
            this.lbID.string = 'ID: '+loginResponse.AccountID;
            this.lbBalance.string = cc.Tool.getInstance().formatNumber(loginResponse.Balance);
            var startTab = cc.Tool.getInstance().getItem('@startTabSecurity');
            if (startTab === cc.AccountTab.SECURITY) {
                this.isOpenFromLobby = false;
            }
            this.animation.play('openPopup');
            this.init();     
        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPSecurity", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPSecurity", Math.round(this.timer));
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
                this.updateTimer = 0;
                this.processTimeOTPButton();
            }
        },

        init: function () {
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPSecurity"));
            this.processTimeOTPButton();

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
           
            this.lbNickName.string = loginResponse.AccountUserName;
            if (loginResponse.PhoneNumber === null) {
                this.lbPhoneNumberInfo.node.active = false;
                this.nodeButtonPhoneNumber.active = true;
            } else {
                var phoneNum = loginResponse.PhoneNumber.substring(loginResponse.PhoneNumber.length - 3);
                this.lbPhoneNumberInfo.string = '*******' + phoneNum;
                this.lbPhoneNumberInfo.node.active = true;
                this.nodeButtonPhoneNumber.active = false;
            }

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                if (loginResponse.PhoneNumber === null) {
                    if (loginResponse.UserNameSafeNo === null) {
                        this.nodeGroupNoPhoneNumber.active = true;
                        this.nodeGroupHavePhoneNumber.active = false;

                        this.nodeGroupConfirmDeActive.active = false;
                        this.nodeGroupConfirmDeletePhone.active = false;
                        this.nodeGroupDeActive.active = true;

                    } else {
                        this.lbPhoneNumber.string = 'App OTP của bạn: ' + loginResponse.UserNameSafeNo;
                        this.nodeGroupNoPhoneNumber.active = false;
                        this.nodeGroupHavePhoneNumber.active = true;
                        if (loginResponse.AuthenType === null || loginResponse.AuthenType === 0) {
                            this.nodeActive.active = true;
                            this.nodeDeActive.active = false;

                            this.nodeGroupDeActive.active = true;
                            this.nodeGroupConfirmDeActive.active = false;
                            this.nodeGroupConfirmDeletePhone.active = false;
                        } else {
                            this.nodeActive.active = false;
                            this.nodeDeActive.active = true;

                            this.nodeGroupDeActive.active = true;
                            this.nodeGroupConfirmDeActive.active = false;
                            this.nodeGroupConfirmDeletePhone.active = false;
                        }

                    }

                    this.nodeDeletePhone.active = false;
                    this.nodeAddPhone.active = true;
                } else {
                    var phoneNum = loginResponse.PhoneNumber.substring(loginResponse.PhoneNumber.length - 3);                
                    this.lbPhoneNumber.string = 'Số điện thoại của bạn: ' + '*******' + phoneNum;
                    this.nodeGroupNoPhoneNumber.active = false;
                    this.nodeGroupHavePhoneNumber.active = true;
                    if (loginResponse.AuthenType === null || loginResponse.AuthenType === 0) {
                        this.nodeActive.active = true;
                        this.nodeDeActive.active = false;

                        this.nodeGroupDeActive.active = true;
                        this.nodeGroupConfirmDeActive.active = false;
                        this.nodeGroupConfirmDeletePhone.active = false;
                    } else {
                        this.nodeActive.active = false;
                        this.nodeDeActive.active = true;

                        this.nodeGroupDeActive.active = true;
                        this.nodeGroupConfirmDeActive.active = false;
                        this.nodeGroupConfirmDeletePhone.active = false;
                    }

                    this.nodeDeletePhone.active = true;
                    this.nodeAddPhone.active = false;
                }

                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.otpType = cc.OTPType.TELE_SAFE;
                this.lbOTPCancelLoginSecurity.string = 'App OTP';

                if (loginResponse.UserNameSafeNo === null) {
                    this.nodeBtnLinkAppSafe.active = true;
                } else {
                    this.nodeBtnLinkAppSafe.active = false;
                }
            } else {
                this.nodeBtnLinkAppSafe.active = false;
                if (loginResponse.PhoneNumber === null) {
                    if (loginResponse.PhoneSafeNo === null) {
                        this.nodeGroupNoPhoneNumber.active = true;
                        this.nodeGroupHavePhoneNumber.active = false;

                        this.nodeGroupConfirmDeActive.active = false;
                        this.nodeGroupConfirmDeletePhone.active = false;
                        this.nodeGroupDeActive.active = true;


                    } else {
                        this.lbPhoneNumber.string = 'App OTP của bạn: ' + loginResponse.PhoneSafeNo;
                        this.nodeGroupNoPhoneNumber.active = false;
                        this.nodeGroupHavePhoneNumber.active = true;
                        if (loginResponse.AuthenType === null || loginResponse.AuthenType === 0) {
                            this.nodeActive.active = true;
                            this.nodeDeActive.active = false;

                            this.nodeGroupDeActive.active = true;
                            this.nodeGroupConfirmDeActive.active = false;
                            this.nodeGroupConfirmDeletePhone.active = false;
                        } else {
                            this.nodeActive.active = false;
                            this.nodeDeActive.active = true;

                            this.nodeGroupDeActive.active = true;
                            this.nodeGroupConfirmDeActive.active = false;
                            this.nodeGroupConfirmDeletePhone.active = false;
                        }
                    }

                    this.nodeDeletePhone.active = false;
                    this.nodeAddPhone.active = true;
                } else {
                    var phoneNum = loginResponse.PhoneNumber.substring(loginResponse.PhoneNumber.length - 3);
                    this.lbPhoneNumber.string = 'Số điện thoại của bạn: ' + '*******' + phoneNum;
                    this.nodeGroupNoPhoneNumber.active = false;
                    this.nodeGroupHavePhoneNumber.active = true;
                    if (loginResponse.AuthenType === null || loginResponse.AuthenType === 0) {
                        this.nodeActive.active = true;
                        this.nodeDeActive.active = false;

                        this.nodeGroupDeActive.active = true;
                        this.nodeGroupConfirmDeActive.active = false;
                        this.nodeGroupConfirmDeletePhone.active = false;
                    } else {
                        this.nodeActive.active = false;
                        this.nodeDeActive.active = true;

                        this.nodeGroupDeActive.active = true;
                        this.nodeGroupConfirmDeActive.active = false;
                        this.nodeGroupConfirmDeletePhone.active = false;
                    }

                    this.nodeDeletePhone.active = true;
                    this.nodeAddPhone.active = false;
                }

                if (loginResponse.PhoneSafeNo === null) {
                    this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                        nodeTeleSafe.active = false;
                    });
                    this.otpType = cc.OTPType.TELE_GRAM;
                    this.lbOTPCancelLoginSecurity.string = 'OTP TELE';
                    this.lbOTPTypeNoPhone.string = 'OTP TELE';
                } else {
                    this.otpType = cc.OTPType.TELE_SAFE;
                    this.lbOTPCancelLoginSecurity.string = 'App OTP';
                    this.lbOTPTypeNoPhone.string = 'App OTP';
                }
            }
        },

        activeTimeOTPButton: function () {
            this.isTimer = true;
            this.updateTimer = 1;
            this.timer = this.timePerGetOTP;
        },

        processTimeOTPButton: function () {
            if (this.timer <= 0) {
                this.isTimer = false;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = true;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'OTP Free';
                });
            } else {
                this.isTimer = true;
                var timeBtn = this.timer;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = false;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = Math.round(timeBtn);
                });
            }
        },

        onGetOTPResponse: function (response) {
            this.activeTimeOTPButton();
            console.log(response);
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onGetOTPResponseError: function (response) {
            setTimeout(function(){
                if(response.ResponseCode == -4 && response.Type && response.Type == cc.OTPType.TELE_GRAM){
                    cc.sys.openURL(cc.Config.getInstance().taiotpx6());
                }
            },1000);
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onUpdatePhoneResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);

            this.loginResponse = cc.LoginController.getInstance().getLoginResponse();

            this.loginResponse.PhoneNumber =  response.Phone.toString();
           
            cc.LoginController.getInstance().setLoginResponse(this.loginResponse);

            this.init();

            cc.DDNA.getInstance().updatePhoneNumber(response.Phone);
        },

        onUpdatePhoneResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onUpdateAuthenTypeResponse: function (response, authenType) {
            cc.PopupController.getInstance().showMessage(response.Message);

            this.loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.loginResponse.AuthenType = authenType;
            cc.LoginController.getInstance().setLoginResponse(this.loginResponse);

            this.init();

            cc.DDNA.getInstance().updateAuthenType(authenType);
        },

        onUpdateAuthenTypeResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onDeletePhoneResponse: function (response, authenType) {
            this.editBoxPhoneNumber.string = '';

            cc.PopupController.getInstance().showMessage(response.Message);

            this.loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.loginResponse.PhoneNumber = null;
            cc.LoginController.getInstance().setLoginResponse(this.loginResponse);

            this.init();

            cc.DDNA.getInstance().updatePhoneNumber('null');
        },

        selectOTPDeletePhoneEvent: function(event, data) {
            this.otpType = "";
            if(data.toString() === 'App OTP'){
                this.otpType = cc.OTPType.TELE_SAFE;
            }else if(data.toString() === 'OTP TELE'){
                this.otpType = cc.OTPType.TELE_GRAM;
            }else{
                this.otpType = cc.OTPType.SMS;
            }
            this.lbOTPDeletePhone.string = data.toString();
            this.animationMenuOTPDeletePhone.play('hideDropdownMenu');
        },

        selectOTPCancelLoginSecurityEvent: function(event, data) {
            this.otpType = "";
            if(data.toString() === 'App OTP'){
                this.otpType = cc.OTPType.TELE_SAFE;
            }else if(data.toString() === 'OTP TELE'){
                this.otpType = cc.OTPType.TELE_GRAM;
            }else{
                this.otpType = cc.OTPType.SMS;
            }
            this.lbOTPCancelLoginSecurity.string = data.toString();
            this.animationMenuOTPCancelLoginSecurity.play('hideDropdownMenu');
        },

        openMenuOTPDeletePhoneClicked: function () {
            this.animationMenuOTPDeletePhone.play('showDropdownMenu');
        },

        openMenuOTPCancelLoginSecurityClicked: function () {
            this.animationMenuOTPCancelLoginSecurity.play('showDropdownMenu');
        },

        hideMenuOTPDeletePhoneClicked: function () {
            this.animationMenuOTPDeletePhone.play('hideDropdownMenu');
        },

        hideMenuOTPCancelLoginSecurityClicked: function () {
            this.animationMenuOTPCancelLoginSecurity.play('hideDropdownMenu');
        },
        onGetBalanceResponse: function (response) {
            this.lbBalancesafe.string = cc.Tool.getInstance().formatNumber(response.safebalance);
         },
        openMenuChonvungClicked: function () {
            this.animationMenuMaVung.play('showDropdownMenu');
        },



        getOTPClicked: function () {
            //this.btnGetOTP.interactable = false;
            this.phoneNumber = this.editBoxPhoneNumber.string;
            if (this.phoneNumber === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số điện thoại');
                return;
            }

            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, this.phoneNumber, this.otpType);
        },

        updatePhoneNumberClicked: function () {
            this.otp = this.editBoxOTP.string;
            var phone = this.editBoxPhoneNumber.string;
            
            if (phone === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số điện thoại');
                return;
            }
           
            var ma_vung = this.lbMaVung.string;
            if(phone[0] == "0"){
                phone = phone.substring(1);
            }
            var str= "";
            if(ma_vung[0] == "+"){
                var i = 0;
               
                while((i+1) < ma_vung.length && Number(ma_vung[i+1])){
                    str+=ma_vung[i+1];
                    i++;
                }
            }
            this.phoneNumber =str+phone;
            console.log(this.phoneNumber);
            //#KingViet
            // if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
            //     if (this.otp === '') {
            //         cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //         return;
            //     }
            // }

            var updatePhoneCommand = new cc.UpdatePhoneCommand;
            updatePhoneCommand.execute(this);
        },
        clickopenketsat: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.KET_SATK);
        },
        activeLoginSecurityClicked: function () {
            var updateAuthenTypeCommand = new cc.UpdateAuthenTypeCommand;
            updateAuthenTypeCommand.execute(this, 1);
        },

        deActiveLoginSecurityClicked: function () {
            this.nodeGroupDeActive.active = false;
            this.nodeGroupConfirmDeActive.active = true;
        },

        backDeActiveLoginSecurityClicked: function () {
            this.nodeGroupDeActive.active = true;
            this.nodeGroupConfirmDeActive.active = false;
            this.nodeGroupConfirmDeletePhone.active = false;
        },

        deletePhoneNumberClicked: function () {
            this.nodeGroupDeActive.active = false;
            this.nodeGroupConfirmDeletePhone.active = true;
        },

        addPhoneClick: function () {
            this.nodeTabActive.active = false;
            this.nodeTabActive = this.nodeSercurity;
            this.nodeTabActive.active = true;  
            this.addPhoneNumberClicked();
        },

        addPhoneNumberClicked: function () {
            this.nodeGroupNoPhoneNumber.active = true;
            this.nodeGroupHavePhoneNumber.active = false;
        },

        getOTPDeActiveLoginSecurityClicked: function () {
            this.activeTimeOTPButton();
            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', this.otpType);
        },

        getOTPDeletePhoneClicked: function () {
            this.activeTimeOTPButton();
            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', this.otpType);
        },

        confirmDeActiveLoginSecurityClicked: function () {
            this.otp = this.editBoxOTPDeActive.string;

            // if (this.otp === '') {
            //     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //     return;
            // }

            var updateAuthenTypeCommand = new cc.UpdateAuthenTypeCommand;
            updateAuthenTypeCommand.execute(this, 0);
        },

        confirmDeletePhoneClicked: function () {
            this.otp = this.editBoxOTPDeletePhone.string;

            //#KingViet
            // if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
            //     if (this.otp === '') {
            //         cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //         return;
            //     }
            // }

            var deletePhoneCommand = new cc.DeletePhoneCommand;
            deletePhoneCommand.execute(this, 0);
        },

        addTeleSafeClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.SAFE_PLUS);
        },

        activeTap: function (event, data) {
            this.nodeTabActive.active = false;
            switch(data.toString()) {
                case "Info":
                    this.nodeTabActive = this.nodeInfo;            
                    break;
                case "SECURITY":
                    this.nodeTabActive = this.nodeSercurity;
                break;
                case "KETANTOAN":
                    this.nodeTabActive = this.nodeKetAnToan;
                break;
            }
            this.nodeTabActive.active = true;
        }, 

         //Click
         backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                if (self.isOpenFromLobby) {
                    cc.LobbyController.getInstance().destroySecurityView();
                } else
                    self.node.active = false;
            }, this, 1, 0, delay, false);
        },

        selectOTPEvent: function(event, data) {
            this.otpType = "";
            if(data.toString() === 'App OTP'){
                this.otpType = cc.OTPType.TELE_SAFE;
            }else if(data.toString() === 'OTP TELE'){
                this.otpType = cc.OTPType.TELE_GRAM;
            }else{
                this.otpType = cc.OTPType.SMS;
            }
            if(this.otpType == cc.OTPType.SMS){
                this.btnOTPFree.active = true;
                this.noteTxt.active = true;
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'OTP';
                });
            }else{
                this.btnOTPFree.active = true;
                this.noteTxt.active = false;
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'OTP Free';
                });
            }
            this.lbOTPTypeNoPhone.string = data.toString();
            this.animationMenuOTPNoPhone.play('hideDropdownMenu');
        },

        openMenuOTPNoPhoneClicked: function () {
            this.animationMenuOTPNoPhone.play('showDropdownMenu');
        },

        hideMenuOTPClicked: function () {
            this.animationMenuOTPNoPhone.play('hideDropdownMenu');
        },

        openMenuChonvungClicked: function () {
            this.animationMenuMaVung.play('showDropdownMenu');
        },
    });
}).call(this);
