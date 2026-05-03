/**
 * Created by Welcome on 4/18/2019.
 */

var vqmmConfig = require('VQMMConfig');

(function () {
    cc.VQMMView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            nodeBig: cc.Node,
            nodeBig2: cc.Node,
            nodeSmall: cc.Node,
            nodeSmall2: cc.Node,
            lbRemaining: cc.Label,

            //sprite icon
            spriteIcons: [cc.Sprite],
        },

        start: function () {
            var self = this;
            this.spriteIcons.forEach(function (spriteIcon) {
                spriteIcon.spriteFrame =  cc.LobbyController.getInstance().getGameAssets().icons[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];
            });

            this.countPrizeBig = 12;
            this.countPrizeSmall = 7;

            this.bigRotation = 360 / this.countPrizeBig;
            this.smallRotation = 360 / this.countPrizeSmall;

            // this.bigStartRotMin = (this.bigRotation / 2) + 5; //goc bat dau tu giai 0
            // this.bigStartRotMax = ((this.bigRotation / 2) + this.bigRotation) - 5; //goc bat dau tu giai 0
            this.bigStartRotMin = -35;
            this.bigStartRotMax = -55;

            this.smallStartRotMin = -((this.smallRotation / 2) + 5); //goc bat dau tu giai 0
            this.smallStartRotMax = -(((this.smallRotation / 2) + this.smallRotation) - 5); //goc bat dau tu giai 0

            cc.VQMMController.getInstance().setVQMMView(this);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

        },

        onEnable: function () {
            this.animation.play('openPopup');
            this.getInfo();
        },

        //quay vong quay
        spinVQMM: function () {
            // this.nodeBig.stopAllActions();
            // this.nodeBig.runAction(cc.repeatForever(
            //     cc.rotateBy(2, -3600)));
            //
            // this.nodeSmall.stopAllActions();
            // this.nodeSmall.runAction(cc.repeatForever(
            //     cc.rotateBy(2, 3600)));
            //
            // cc.director.getScheduler().schedule(this.stopVQMM, this, 0, 0, 1, false);

            this.stopVQMM();
        },

        //dung vong quay
        stopVQMM: function () {
            //lay ve ket qua
            var response = cc.VQMMController.getInstance().getVQMMSpinResponse();

            // {
            //     "SpinID": 910031,
            //     "PrizeID": 12,
            //     "PrizeValue": 0,
            //     "PrizeName": "Trượt",
            //     "FreeSpinID": 6,
            //     "FreeSpinValue": 0,
            //     "FreeSpinName": "Trượt",
            //     "Balance": 77752671,
            //     "Response": 0
            // }

            //tinh goc cua giai thuong - vong to
            var rotationMax = this.bigStartRotMax + (-this.bigRotation * (response.PrizeID - 1));
            var rotationMin = this.bigStartRotMin + (-this.bigRotation * (response.PrizeID - 1));
            var rotation =  Math.floor((Math.random() * (rotationMax - rotationMin) + rotationMin));

            //set goc ket thuc
            this.nodeBig.rotation = rotation;
            this.nodeBig2.rotation = rotation;

            //1=MINIPOKER, 2=777, 3=TAMQUOC, 4=THUYCUNG, 5=BLOCKBUSTER, 6=TRUOT, 7=BUMBUM
            if (response.FreeSpinID === 6) {
                var idConvert = 7; //truot chuyen ve index 7
            } else  if (response.FreeSpinID === 7) {
                idConvert = 6; //bumbum chuyen ve index 6
            } else {
                idConvert = response.FreeSpinID;
            }

            //tinh goc cua giai thuong - vong nho
            rotationMax = this.smallStartRotMax + (-this.smallRotation * (idConvert - 1));
            rotationMin = this.smallStartRotMin + (-this.smallRotation * (idConvert - 1));
            rotation =  Math.floor((Math.random() * (rotationMax - rotationMin) + rotationMin));

            //set goc ket thuc
            this.nodeSmall.rotation = rotation;
            this.nodeSmall2.rotation = rotation;

            //quay
            this.nodeBig.stopAllActions();
            this.nodeBig.runAction(cc.rotateBy(vqmmConfig.SPIN_TIME, -1800).easing(cc.easeQuadraticActionOut()));

            this.nodeBig2.stopAllActions();
            this.nodeBig2.runAction(cc.rotateBy(vqmmConfig.SPIN_TIME, -1800).easing(cc.easeQuadraticActionOut()));

            this.nodeSmall.stopAllActions();
            this.nodeSmall.runAction(cc.rotateBy(vqmmConfig.SPIN_TIME, 1800).easing(cc.easeQuadraticActionOut()));

            this.nodeSmall2.stopAllActions();
            this.nodeSmall2.runAction(cc.rotateBy(vqmmConfig.SPIN_TIME, 1800).easing(cc.easeQuadraticActionOut()));

            //tru 1 ve + update UI
            this.quantity -= 1;
            this.lbRemaining.string = this.quantity;


            cc.director.getScheduler().schedule(function () {
                if (response.FreeSpinValue > 0 && response.PrizeValue > 0) {
                    cc.PopupController.getInstance().showMessage('Bạn đã nhận được ' + response.FreeSpinName + ' và '
                        + cc.Tool.getInstance().formatNumber(response.PrizeValue) + ' ' + cc.Config.getInstance().currency());
                } else if (response.FreeSpinValue > 0) {
                    cc.PopupController.getInstance().showMessage('Bạn đã nhận được ' + response.FreeSpinName);
                } else if (response.PrizeValue > 0) {
                    cc.PopupController.getInstance().showMessage('Bạn đã nhận được '
                        + cc.Tool.getInstance().formatNumber(response.PrizeValue) + ' ' + cc.Config.getInstance().currency());
                } else  {
                    cc.PopupController.getInstance().showMessage('Chúc bạn may mắn lần sau');
                }
            }, this, 0, 0, vqmmConfig.SPIN_TIME, false);


            cc.LobbyController.getInstance().refreshAccountInfo();

            var amountDDNAConvert = response.PrizeValue;
            //code chuyen doi FS -> so tien
            var fsValue = 0;
            if (response.FreeSpinValue > 0) {
                switch (response.FreeSpinID) {
                    case 1: //MINIPOKER
                        fsValue = 1000;
                        break;
                    case 2: //777
                        fsValue = 2000;
                        break;
                    case 3: //TAMQUOC
                        fsValue = 2000;
                        break;
                    case 4: //THUYCUNG
                        fsValue = 3000;
                        break;
                    case 5: //BLOCKBUSTER
                        fsValue = 1000;
                        break;
                    case 7: //BUMBUM
                        fsValue = 2000;
                        break;
                }
            }

            amountDDNAConvert += fsValue;

            if (amountDDNAConvert > 0) {
                cc.DDNA.getInstance().spinVQMM(amountDDNAConvert);
            }
        },

        getInfo: function () {
            var vqmmGetInfoCommand = new cc.VQMMGetInfoCommand;
            vqmmGetInfoCommand.execute(this);
        },

        onVQMMGetInfoResponse: function (response) {
            //{"Quantity":1,"IsOpen":false,"Response":0}
            this.quantity = response.Quantity;
            this.lbRemaining.string = response.Quantity;
            this.responseCode = response.Response;
            if (response.Message) {
                this.responseMessage = response.Message;
            }
        },

        spinClicked: function () {
            // cc.VQMMController.getInstance().setVQMMSpinResponse({"SpinID":910154,"PrizeID":12,"PrizeValue":0,"PrizeName":"Trượt","FreeSpinID":6,"FreeSpinValue":0,"FreeSpinName":"Trượt","Balance":20269761,"Response":0});
            // cc.VQMMController.getInstance().spinVQMM();
            // return;

            if (this.responseCode < 0 && this.responseMessage) {
                cc.PopupController.getInstance().showMessage(this.responseMessage);
            } else if (this.responseCode === -203) {
                cc.PopupController.getInstance().showMessage(cc.VQMMSpinError.ERROR_203);
            } else if (this.quantity > 0) {
                cc.VQMMPopupController.getInstance().createCaptchaView();
            } else {
                cc.PopupController.getInstance().showMessage('Bạn không có lượt quay. Vui lòng quay lại sau');
            }
        },

        helpClicked: function () {
            // cc.VQMMPopupController.getInstance().createHelpView();
        },

        topClicked: function () {
            cc.VQMMPopupController.getInstance().createTopView();
        },

        historyClicked: function () {
            cc.VQMMPopupController.getInstance().createHistoryView();
        },

        closeFinished: function () {
            cc.LobbyController.getInstance().destroyVQMMView();
        },
    });
}).call(this);
