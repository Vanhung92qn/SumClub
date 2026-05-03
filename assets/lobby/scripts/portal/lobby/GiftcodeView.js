/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.GiftcodeView = cc.Class({
        "extends": cc.Component,
        properties: {
            editBoxGiftcode: cc.EditBox,
            audioEnter: cc.AudioSource,
            audioErorr: cc.AudioSource,

          
        },

        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_GIFTCODE;
           // this.animation = this.node.getComponent(cc.Animation);
           
        },

        onEnable: function () {
            //check neu da set gc o Inbox thi gan luon
            if (cc.Tool.getInstance().getItem('@GC') !== '') {
                this.editBoxGiftcode.string = cc.Tool.getInstance().getItem('@GC');
            }

           // this.animation.play('openPopup');
        },

        onDisable: function () {
            //tat di Reset GC set san
            cc.Tool.getInstance().setItem('@GC', '');
        },

       

       

        resetInput: function () {
            this.editBoxGiftcode.string = '';
          
        },

        onGiftcodeResponse: function (response) {
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Nhập Giftcode thành công');
            }
            cc.LobbyController.getInstance().refreshAccountInfo();

            this.resetInput();
           

            if (response.GiftCodeAmount) {
                cc.DDNA.getInstance().applyGiftcode(response.GiftCodeAmount, this.gc);
            }
        },

        onGiftcodeResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
          
        },

        //Click
        acceptClicked: function () {
            this.audioEnter.loop = false;
            this.audioEnter.play();
            this.gc = this.editBoxGiftcode.string;
            if (this.gc === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập Giftcode');
                return;
            }

           

            var giftcodeCommand = new cc.GiftcodeCommand;
            giftcodeCommand.execute(this);
        },
		FanpageFacebook: function () {
			cc.sys.openURL(cc.Config.getInstance().fanPageFB());
		
	   },

       

        backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.destroy();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
