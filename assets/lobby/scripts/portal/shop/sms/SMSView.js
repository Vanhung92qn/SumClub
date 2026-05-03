/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.SMSView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeOpen: cc.Node,
            nodeClose: cc.Node,

            nodeVina: cc.Node,
            nodeMobi: cc.Node,
            nodeViettel: cc.Node,

            spriteVina: cc.Sprite,
            spriteMobi: cc.Sprite,
            spriteViettel: cc.Sprite,

            lbStructSMS: cc.Label,
            lbPhoneNumber: cc.Label,

            spriteValues: [cc.Sprite],
            lbValues: [cc.Label],
            lbAmounts: [cc.Label],

            sfValues: [cc.SpriteFrame],
        },

        onEnable: function () {
            var self = this;
            this.nodeClose.active = false;
            this.nodeOpen.active = false;

            this.nodeViettel.active = false;
            this.nodeVina.active = false;
            this.nodeMobi.active = false;

            this.buttonViettel = this.nodeViettel.getComponent(cc.Button);
            this.buttonMobi = this.nodeMobi.getComponent(cc.Button);
            this.buttonVina = this.nodeVina.getComponent(cc.Button);

            this.buttonViettel.interactable = false;
            this.buttonMobi.interactable = false;
            this.buttonVina.interactable = false;

            this.spriteValues.forEach(function (spriteValue) {
                spriteValue.spriteFrame = self.sfValues[0];
            });


            var getListSMSCommand = new cc.GetListSMSCommand;
            getListSMSCommand.execute(this);
        },

        onGetListSMSResponse: function (response) {
            // {
            //     "ResponseCode": 1,
            //     "Data": [
            //     {
            //         "Telecom": "VTT",
            //         "cards": [
            //             {
            //                 "Value": 10000,
            //                 "Systax": "MOZ CYV NAP10 MAX_15665119 ",
            //                 "Amount": 8000
            //             }
            //         ]
            //     },
            //     {
            //         "Telecom": "VNP",
            //         "cards": [
            //             {
            //                 "Value": 10000,
            //                 "Systax": "IP TNK NAP10 MAX_15665119",
            //                 "Amount": 8000
            //             }
            //         ]
            //     }
            // ]
            // }
            var self = this;

            this.data = response.Data;

            this.partnerCode = null;
            this.valueIndex = 0;

            this.lbPhoneNumber.string = response.To;

            this.data.forEach(function (data) {
                if (self.partnerCode === null) {
                    self.partnerCode = data.Telecom; //set default la item dau tien
                    self.item = data.cards[0];
                }

                switch (data.Telecom) {
                    case cc.CardOperatorCode.VIETTEL:
                        self.nodeViettel.active = true;
                        self.dataViettel = data.cards;
                        break;
                    case cc.CardOperatorCode.MOBIFONE:
                        self.nodeMobi.active = true;
                        self.dataMobi = data.cards;
                        break;
                    case cc.CardOperatorCode.VINAPHONE:
                        self.nodeVina.active = true;
                        self.dataVina = data.cards;
                        break;
                }
            });

            this.selectPartner(this.partnerCode);
            this.processStructSMS();

            this.nodeClose.active = false;
            this.nodeOpen.active = true;
        },

        onGetListSMSResponseError: function (response) {

            this.nodeClose.active = true;
            this.nodeOpen.active = false;
        },

        selectPartner: function (code) {
            var self = this;

            this.buttonViettel.interactable = true;
            this.buttonMobi.interactable = true;
            this.buttonVina.interactable = true;

            switch (code) {
                case cc.CardOperatorCode.VIETTEL:
                    this.buttonViettel.interactable = false;
                    var data = this.dataViettel;
                    break;
                case cc.CardOperatorCode.MOBIFONE:
                    this.buttonMobi.interactable = false;
                    data = this.dataMobi;
                    break;
                case cc.CardOperatorCode.VINAPHONE:
                    data = this.dataVina;
                    this.buttonVina.interactable = false;
                    break;
            }

            for (var i = 0; i < this.spriteValues.length; i++) {
                this.spriteValues[i].spriteFrame = self.sfValues[0];
                this.lbValues[i].string = cc.Tool.getInstance().formatNumber(data[i].Value) + ' VNĐ';
                this.lbAmounts[i].string = '' + cc.Tool.getInstance().formatNumber(data[i].Amount) + ' ' + cc.Config.getInstance().currency();
            }

            self.spriteValues[this.valueIndex].spriteFrame = self.sfValues[1];
        },

        selectPartnerClicked: function (event, data) {
            console.log('selectPartnerClicked: ', data.toString());
            this.partnerCode = data.toString();
            this.selectPartner(data.toString());
            this.processStructSMS();
        },

        selectItemClicked: function (event, data) {
            var self = this;
            this.valueIndex = parseInt(data.toString());

            this.spriteValues.forEach(function (spriteValue) {
                spriteValue.spriteFrame = self.sfValues[0];
            });

            self.spriteValues[this.valueIndex].spriteFrame = self.sfValues[1];

            this.processStructSMS();
        },

        processStructSMS: function () {
            var self = this;

            this.data.forEach(function (data) {
                if (self.partnerCode === data.Telecom) {
                    for (var i = 0; i < data.cards.length; i++) {
                        if (i === self.valueIndex) {
                            var item = data.cards[i];
                            self.item = item;
                            self.lbStructSMS.string = item.Systax;
                        }
                    }
                }
            });
        },

        openSMSClicked: function () {
            var phoneNumber = this.lbPhoneNumber.string;
            var message = this.lbStructSMS.string;
            if (cc.sys.isNative) {
                // encodeURIComponent
                // cc.sys.openURL('sms:' + phoneNumber);
                if (cc.sys.os === cc.sys.OS_IOS) {
                    // cc.sys.openURL('sms:' + phoneNumber + '&body=123');
                    cc.sys.openURL('sms:' + phoneNumber + '&body=' + encodeURIComponent(message));
                } else {
                    cc.sys.openURL('sms:' + phoneNumber + '?body=' + encodeURIComponent(message));
                }
            } else {
                cc.Tool.getInstance().copyToClipboard(message);
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung tin nhắn nạp SMS.');
            }
        },
    });
}).call(this);
