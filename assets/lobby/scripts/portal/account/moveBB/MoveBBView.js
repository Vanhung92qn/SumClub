(function () {
    cc.MoveBBView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnUpdateAccount: cc.Node,
            btnClose: cc.Node
        },
        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;        
        },
        onEnable: function() {
            this.animation.play('openPopup');
            this.btnUpdateAccount.active = false;
            if (cc.LoginController.getInstance().getLoginState()) {
                this.getBBOffCheck();
            }
        },
        getBBOffCheck: function() {
            let bbOffCheckCommand = new cc.BBOffCheckCommand;
            bbOffCheckCommand.execute(this);
        },
        onBBOffCheckResponse: function(response) {
            /**
                UserType:
                    1: fb: update UserName, nickname, password
                    2: thuong: UserName, NickName
                  
                OtpNeed:true : show OTP
                CutOffType: 
                    Check show popup update
                    0: hien thi -> ko hien nut update.
                    1: show popup.
                    2: da thay doi => an nut update
            */

            // Khong hien thi btnUpdateAccount
            //Test
            // response.UserType = 1;
            // response.OtpNeed = true;
            // response.CutOffType = 1;
            // this.btnUpdateAccount.active = true;
            if(response.CutOffType == 1) {
                this.btnUpdateAccount.active = true;
                this.btnClose.active = false;
            }else {
                this.btnClose.active = true;
            }
           cc.LobbyController.getInstance().setBBOffCheckData(response);
        },
        onOpenUpdateAccountView: function() {
          this.backClicked();
          cc.LobbyController.getInstance().createUpdateAccountView();         
        },
        onOpenFanPage: function(sender, url){
            if (url) {
                cc.sys.openURL(url.toString());
            }
        },
          //Click
          backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.active = false;
            }, this, 1, 0, delay, false);
        },
        
    });
}).call(this);
