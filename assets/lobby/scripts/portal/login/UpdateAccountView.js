var netConfig = require('NetConfig');

(function () {
    cc.UpdateAccountView = cc.Class({
        "extends": cc.Component,
        properties: {

            editBoxUsername: cc.EditBox,
            editBoxOTP: cc.EditBox,
            editBoxPassword: cc.EditBox,
            editBoxRePassword: cc.EditBox,
            editBoxNickName: cc.EditBox,

            //Box wrap edixbox
            nodeUserName: cc.Node,
            nodeOTP: cc.Node,
            nodePassword: cc.Node,
            nodeRePassword: cc.Node,
            nodeNickName: cc.Node,

            animation: cc.Animation,
          

            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],

            lbError: cc.Label,

            //menu otp
            nodeTeleSafes: [cc.Node],

            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,
            btnSelectOTP: cc.Button
        },

        // use this for initialization
        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            
            this.otpType = cc.OTPType.TELE_SAFE;
            this.lbOTPType.string = 'App OTP';

        },

        onEnable: function () {
            this.lbError.string = '';
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPForgotPass"));
            this.processTimeOTPButton();
            //Lay thong tin field update account
            this.nodeOTP.active = false;
            this.nodePassword.active = false;
            this.nodeRePassword.active = false;
            this.dataCheck = cc.LobbyController.getInstance().getBBOffCheckData();
             /**
                UserType:
                    1: fb: update UserName, nickname, password
                    2: thuong: UserName, NickName
                  
                OtpNeed:true : show OTP
                CutOffType: 
                    Check show popup update
                    0: ko show popup.
                    1: show popup.
                    2: da thay doi => chỉ  khi hiển thị là 1 thì cần hiển thị
            */

            if(this.dataCheck.UserType == 1) {
                this.nodePassword.active = true;
                this.nodeRePassword.active = true;
            }
            if(this.dataCheck.OtpNeed) {
                this.nodeOTP.active = true;
            }
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            if (loginResponse.PhoneSafeNo === null) {
                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.btnSelectOTP.interactable = false;
                this.otpType = cc.OTPType.SMS;
                this.lbOTPType.string = 'SMS';
            }
            if (loginResponse.PhoneNumber === null) {
                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.btnSelectOTP.interactable = false;
            }
            
        },
        
        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPForgotPass", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPForgotPass", Math.round(this.timer));
        },

        resetInput: function () {
            this.editBoxUsername.string = '';
            this.editBoxOTP.string = '';
            this.editBoxPassword.string = '';
            this.editBoxRePassword.string = '';
            this.editBoxNickName.string = '';
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
                    lbBtnGetOTP.string = 'LẤY OTP';
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

        onUpdateAccountResponse: function (response) {
            this.closeUpdateAccount();
            cc.PopupController.getInstance().showMessage(response.Message);
        },

        onUpdateAccountResponseError: function (response) {
            this.lbError.string = response.Message;
        },

        closeUpdateAccount: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.active = false;
            }, this, 1, 0, delay, false);
        },

        selectOTPEvent: function(event, data) {
            this.otpType = data.toString() === 'App OTP' ? cc.OTPType.TELE_SAFE : cc.OTPType.SMS;
            this.lbOTPType.string = data.toString();
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        openMenuOTPClicked: function () {
            this.animationMenuOTP.play('showDropdownMenu');
        },

        hideMenuOTPClicked: function () {
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        backClicked: function () {
           this.closeForgotPass();
        },
        
        updateAccountClick: function () {
            
            this.lbError.string = '';
            this.username = this.editBoxUsername.string;
            this.otp = this.editBoxOTP.string;
            this.password = this.editBoxPassword.string;
            this.repassword = this.editBoxRePassword.string;
            this.nickname = this.editBoxNickName.string;           

            if (this.username === '') {
                return this.lbError.string = 'Vui lòng nhập tên tài khoản mới';
            }
            
            if (this.nickname === '') {
                return this.lbError.string = 'Vui lòng nhập tên nhân vật mới';
            }
            // if(this.dataCheck.OtpNeed) {
            //     if (this.otp === '') {
            //         return this.lbError.string = 'Vui lòng nhập mã OTP';
            //      }
            // }else {
            //     this.otp = '';
            // }
            //Check user FB
            if(this.dataCheck.UserType == 1) {
                if (this.password === '') {
                    return  this.lbError.string = 'Vui lòng nhập mật khẩu';
                }
                if (this.repassword === '') {
                    return  this.lbError.string = 'Vui lòng nhập mật khẩu xác nhận';
                }
                if(this.repassword != this.password) {
                    return this.lbError.string = 'Mật khẩu xác nhận không đúng';
                }
            }else {
                this.password = '';
            }

            if(this.nickname == this.username) {
                return this.lbError.string = 'Tên nhân vật không được trùng với Tên đăng nhập';
            }
            var updateAccountCommand = new cc.UpdateAccountCommand;
            updateAccountCommand.execute(this);
        },

        getOTPClicked: function () {
            this.username = this.editBoxUsername.string;
            
            if (this.username === '') {
                this.lbError.string = 'Vui lòng nhập tên tài khoản';
                return;
            }

            this.activeTimeOTPButton();

            var getOTPUpdateAccountCommand = new cc.GetOTPUpdateAccountCommand;
            getOTPUpdateAccountCommand.execute(this, this.otpType);
        },
        onGetOTPUpdateAccountResponse: function (response) {
            
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
               
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },
        onGetOTPUpdateAccountResponseError: function (error) {
            
            this.timer = -1;
            this.isTimer = false;
            this.processTimeOTPButton();
        },
    });
}).call(this);
