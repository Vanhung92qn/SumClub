/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.ProfileView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeInfo: cc.Node,
            nodeAvatar: cc.Node,

      

            lbID: cc.Label,
            lbNickName: cc.Label,
            lbBalance: cc.Label,
			lbBalancesafe: cc.Label,
            lbPhoneNumber: cc.Label,
           
            avatar: cc.Avatar,
            nodeButtonPhoneNumber1: cc.Node,
            nodeButtonPhoneNumber: cc.Node, //bat len khi chua co sdt thay cho lbPhoneNumber
            //nodeButtonTeleSafe: cc.Node, //bat len khi chua co TeleSafe

            //#KingViet
            //spriteNation: cc.Sprite,
            animationMenuNation: cc.Animation,
        },

        onLoad: function () {
            cc.AccountController.getInstance().setProfileView(this);
        },
       
        onEnable: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            var nextVP = cc.LoginController.getInstance().getNextVPResponse();

            this.lbID.string = 'ID: '+loginResponse.AccountID;
            this.lbNickName.string = loginResponse.AccountName;
            this.lbBalance.string = cc.Tool.getInstance().formatNumber(loginResponse.Balance);
			
             if (loginResponse.PhoneNumber === null) {
                 this.lbPhoneNumber.node.active = false;
                 this.nodeButtonPhoneNumber.active = true;
				  this.nodeButtonPhoneNumber1.active = true;
             } else {
				  var phoneNum = loginResponse.PhoneNumber.substring(loginResponse.PhoneNumber.length - 5);
                this.lbPhoneNumber.string = '*******' + phoneNum;
                // this.lbPhoneNumber.string = loginResponse.PhoneNumber;
                 this.lbPhoneNumber.node.active = true;
                 this.nodeButtonPhoneNumber.active = false;
				 this.nodeButtonPhoneNumber1.active = false;
             }
			   var getBalanceCommand = new cc.GetBalanceCommand;
            getBalanceCommand.execute(this);


            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID));

            this.nodeAvatar.active = false;
            this.nodeInfo.active = true;
          

        },

        refreshAvatar: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID));
        },
        onGetBalanceResponse: function (response) {
           this.lbBalancesafe.string = cc.Tool.getInstance().formatNumber(response.safebalance);
        },
        //#KingViet
       
      
        //clicked
        changePassClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.CHANGE_PASS);
        },
		 clicklichsucuoc: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.GAME);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_HISTORY', cc.DDNAUIType.BUTTON);
               
            }
        },
		dangkysdtclick: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.REG_PHONE);
        },
		dangxuattaikhoanclick: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.DANG_XUAT);
        },
		
		clickopenketsat: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.KET_SATK);
        },
		 clicklichsugiaodich: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.BANK);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_HISTORY', cc.DDNAUIType.BUTTON);
               
            }
        },
		
       
        vipBenefitsClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.VIP);
        },
        
        changeAvatarClicked: function () {
            this.nodeAvatar.active = true;
        },

        addPhoneNumberClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.SECURITY);
        },

        addTeleSafeClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.SAFE_PLUS);
        },

        showSercurityPopup: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.SECURITY);
        },

        updateUsernameBackClicked: function () {
            this.nodeInfo.active = true;
            this.nodeUpdateUsername.active = false;
        },

        updateUsernameClicked: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                if (loginResponse.UserNameSafeNo === null) {
                    cc.PopupController.getInstance().showMessage('Bạn cần cập nhật App OTP trước.');
                    return;
                }
            } else {
                if (loginResponse.PhoneNumber === null && loginResponse.PhoneSafeNo === null) {
                    cc.PopupController.getInstance().showMessage('Bạn cần cập nhật số điện thoại nhận OTP hoặc App OTP trước.');
                    return;
                }
            }

        
            this.nodeUpdateUsername.active = true;
        },

        //#KingViet
        openMenuNationClicked: function () {
            this.animationMenuNation.play('showDropdownMenu');
        },

        hideMenuNationClicked: function () {
            this.animationMenuNation.play('hideDropdownMenu');
        },

      

    });
}).call(this);
