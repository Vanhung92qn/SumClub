/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.ViettelPayView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeActive: cc.Node,
            nodeDeActive: cc.Node,

            lbMoMoName: cc.Label,
            lbMoMoPhone: cc.Label,
            lbMoMoContent: cc.Label,

            lbMoMos: [cc.Label],
            lbCoins: [cc.Label],

            nodeRates: [cc.Node],
            lbColCoin: cc.Label,
            lbRule: cc.Label,
            lbError: cc.Label,
        },

        onLoad: function () {
            this.lbColCoin.string = cc.Config.getInstance().currency() + ' nhận';
            this.lbRule.string = 'Lưu ý:\n' +
                '- Nhập SAI: Số điện thoại, nội dung chuyển khoản sẽ không nhận\n' +
                'được ' + cc.Config.getInstance().currency() + '\n' +
                '- Chỉ chuyển khoản tối thiểu 10.000.\n' +
                '- Kiểm tra nội dung chuyển khoản trước khi thực hiện chuyển khoản.\n' +
                '- Hệ thống sẽ tự động cộng ' + cc.Config.getInstance().currency() + ' trong vòng 3 phút kể từ khi nhận \n' +
                'được tiền trong tài khoản MoMo';
        },

        onEnable: function () {
            this.nodeRates.forEach(function (nodeRate) {
                nodeRate.active = false;
            });

            // var response = {
            //     ResponseCode: 1,
            //     Orders: {
            //         Message: "MAX 15665119",
            //         WalletAccountName: "Nguyen Van Canh",
            //         WalletAccount: "0398665428",
            //         Rate: 1.15,
            //         List: [
            //             10000,
            //             20000,
            //             50000,
            //             100000,
            //             200000,
            //             500000,
            //             100000
            //         ]
            //     }
            // };

            // this.onGetListViettelPayResponse(response);

            // this.onGetListViettelPayResponseError(response);

            var getListViettelPayCommand = new cc.GetListViettelPayCommand;
            getListViettelPayCommand.execute(this);

            var self = this;

            this.interval = setInterval(function(){
                getListViettelPayCommand.execute(self);
            }, 60000);
        },

        onDisable: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        onDestroy: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        onGetListViettelPayResponse: function (response) {
            this.lbMoMoName.string = response.Orders.WalletAccountName;
            this.lbMoMoPhone.string = response.Orders.WalletAccount;
            this.lbMoMoContent.string = response.Orders.Message;

            var self = this;
            var index = 0;

            response.Orders.List.forEach(function (item) {
                if (index < 7) {
                    self.lbMoMos[index].string = cc.Tool.getInstance().formatNumber(item.Amount);
                    self.lbCoins[index].string = cc.Tool.getInstance().formatNumber(item.AmountReceive);
                    self.nodeRates[index].active = true;
                }
                index++;
            });

            this.nodeActive.active = true;
            this.nodeDeActive.active = false;
        },

        onGetListViettelPayResponseError: function (response) {
            this.nodeActive.active = false;
            this.nodeDeActive.active = true;
            if (response !== undefined && response.Message !== undefined && response.Message !== null)
                this.lbError.string = response.Message;
        },

        copyMoMoAccountClicked: function () {
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoPhone.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép số tài khoản.');
            }
        },

        copyMoMoContentClicked: function () {
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoContent.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
            }
        },

    });
}).call(this);
