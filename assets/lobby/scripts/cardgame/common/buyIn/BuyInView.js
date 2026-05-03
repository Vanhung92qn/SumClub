/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.BuyInView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBuyIn: cc.Node,
            animation: cc.Animation,

            progressBar: cc.ProgressBar,
            slider: cc.Slider,
            toggleAutoBuyIn: cc.Toggle,

            lbBalance: cc.Label,
            lbMinChip: cc.Label,
            lbMaxChip: cc.Label,
            lbChip: cc.Label, //value hien tai
        },

        slideEvent: function () {
            //gan progress = slider progress
            this.progressBar.progress = this.slider.progress;

            //tinh gia tri theo progress slider
            var val = this.minValue + ((this.maxValue - this.minValue) * this.slider.progress);
            //lam tron gia tri
            this.roundVal = Math.floor(val / 1000) * 1000;

            //set gia tri chip hien tri
            this.lbChip.string = cc.Tool.getInstance().formatNumberKTX(this.roundVal);

            // //goi ham callback
            // this.callback(this.target, roundVal);
        },

        showBuyIn: function (roomVal, isPlayNow) {
            //so du hien tai
            var curBalance = cc.BalanceController.getInstance().getBalance();

            //set gia tri min max
            this.minValue = roomVal * this.minBetFactor;
            this.maxValue = Math.min(roomVal * this.maxBetFactor, curBalance);

            this.isPlayNow = isPlayNow;

            if (curBalance < this.minValue) {
                if (this.isPlayNow) {
                    cc.PopupController.getInstance().showMessage('Số dư không đủ để vào phòng.');
                } else {
                    cc.PopupController.getInstance().showMessage('Số dư không đủ để mua thêm chip.');
                }
                return;
            }

            this.roomVal = roomVal;

            //tinh toan gia tri mac dinh -> 50% số tiền tối đa
            this.roundVal = Math.floor((this.minValue + ((this.maxValue - this.minValue) / 2)) / 1000) * 1000;
            this.lbChip.string = cc.Tool.getInstance().formatNumberKTX(this.roundVal);

            this.slider.progress = 0.5;
            this.progressBar.progress = 0.5;

            //set label min/max chip neu co
            if (this.lbMinChip)
                this.lbMinChip.string = cc.Tool.getInstance().formatNumberK(this.minValue);
            if (this.lbMaxChip)
                this.lbMaxChip.string = cc.Tool.getInstance().formatNumberK(this.maxValue);

            this.nodeBuyIn.active = true;
            this.animation.play('openPopup');

            //refresh lai balance
            this.lbBalance.string = cc.Tool.getInstance().formatNumber(curBalance);
        },

        hideBuyIn: function () {
            if (this.nodeBuyIn.active) {
                this.close();
            }
            cc.PopupController.getInstance().hideBusy();
        },

        close: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.nodeBuyIn.active = false;
            }, this, 1, 0, delay, false);
        },

        closeClicked: function () {
            this.close();
        },

        confirmBuyInClicked: function () {

        },
    });
}).call(this);
