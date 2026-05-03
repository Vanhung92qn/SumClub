// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        editBoxPhoneNumber: cc.EditBox,
		editBoxOTP: cc.EditBox,
		nodedangky: cc.Node,
		nodexacnhan: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.animation = this.node.getComponent(cc.Animation);
	},
	 onEnable: function () {
			 this.animation.play('openPopup');
        },

    start () {

    },
	clickdangky: function (){
		this.nodedangky.active = false;
		this.nodexacnhan.active = true;
	},
	 onUpdatePhoneResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);

            this.loginResponse = cc.LoginController.getInstance().getLoginResponse();

            this.loginResponse.PhoneNumber =  response.Phone.toString();
           
            cc.LoginController.getInstance().setLoginResponse(this.loginResponse);

           // this.init();

            cc.DDNA.getInstance().updatePhoneNumber(response.Phone);
        },

        onUpdatePhoneResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
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
		
		chatbot: function (){
			cc.sys.openURL(cc.Config.getInstance().taiotpx6());
		},
     updatePhoneNumberClicked: function () {
            this.otp = this.editBoxOTP.string;
            var phone = this.editBoxPhoneNumber.string;
            
            if (phone === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số điện thoại');
                return;
            }
           
            var ma_vung = "84";
            if(phone[0] == "0"){
                phone = phone.substring(1);
            }
            var str= "84";
            if(ma_vung[0] == "+"){
                var i = 0;
               
                while((i+1) < ma_vung.length && Number(ma_vung[i+1])){
                    str+=ma_vung[i+1];
                    i++;
                }
            }
            this.phoneNumber =str+phone;
           
            //#KingViet
            var updatePhoneCommand = new cc.UpdatePhoneCommand;
            updatePhoneCommand.execute(this);
        },
    // update (dt) {},
});
