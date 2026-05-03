/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.VQMMCaptchaView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            editBoxCaptcha: cc.EditBox,
            imageUrlCaptcha: cc.ImageUrl,
            lbError: cc.Label,
        },

        onEnable: function () {
            this.animation.play('openPopup');
            this.editBoxCaptcha.string = '';
            this.lbError.string = '';

            this.getCaptcha();
        },

        getCaptcha: function () {
            var vqmmGetCaptchaCommand = new cc.VQMMGetCaptchaCommand;
            vqmmGetCaptchaCommand.execute(this);
        },

        oVQMMGetCaptchaResponse: function (response) {
            this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        onVQMMSpinResponse: function (response) {
            //tat popup
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.closeFinished();
            }, this, 1, 0, delay, false);

            //kiem tra
            switch (response.Response) {
                case -100:
                    cc.PopupController.getInstance().showMessage(cc.VQMMSpinError.ERROR_100);
                    break;
                case -200:
                    cc.PopupController.getInstance().showMessage(cc.VQMMSpinError.ERROR_200);
                    break;
                case -201:
                    cc.PopupController.getInstance().showMessage(cc.VQMMSpinError.ERROR_201);
                    break;
                case -202:
                    cc.PopupController.getInstance().showMessage(cc.VQMMSpinError.ERROR_202);
                    break;
                case -203:
                    cc.PopupController.getInstance().showMessage(cc.VQMMSpinError.ERROR_203);
                    break;
                default:
                    //set qua ket + goi SPIN
                    cc.VQMMController.getInstance().setVQMMSpinResponse(response);
                    cc.VQMMController.getInstance().spinVQMM();
                    //cc.VQMMController.getInstance().stopVQMM();
            }
        },

        onVQMMSpinResponseError: function (response) {
            if (response.Message)
                this.lbError.string = response.Message;
        },

        closeFinished: function () {
            this.node.destroy();
        },

        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },

        confirmSpinClicked: function () {
            this.lbError.string = '';

            this.captcha = this.editBoxCaptcha.string;

            if (this.captcha === '') {
                this.lbError.string = 'Vui lòng nhập mã xác nhận';
                return;
            }

            cc.PopupController.getInstance().showBusy();


            var vqmmSpinCommand = new cc.VQMMSpinCommand;
            vqmmSpinCommand.execute(this);
        },
    });
}).call(this);
