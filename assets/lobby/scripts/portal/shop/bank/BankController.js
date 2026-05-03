/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var BankController;

    BankController = (function () {
        var instance;

        function BankController() {
        }

        instance = void 0;

        BankController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        BankController.prototype.setTopupBankView = function (topupBankView) {
            return this.topupBankView = topupBankView;
        };

        BankController.prototype.setResponseTopupBanks = function (response) {
            return this.responseTopupBanks = response;
        };

        BankController.prototype.getResponseTopupBanks = function () {
            return this.responseTopupBanks;
        };

        BankController.prototype.setResponseRedeemBanks = function (response) {
            return this.responseRedeemBanks = response;
        };

        BankController.prototype.getResponseRedeemBanks = function () {
            return this.responseRedeemBanks;
        };


        return BankController;

    })();

    cc.BankController = BankController;

}).call(this);

