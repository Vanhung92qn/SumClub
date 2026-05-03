/**
 * Created by Nofear on 6/21/2017.
 */
import Configs from "../shootFish/common/Configs";
import BroadcastReceiver from "../shootFish/common/BroadcastReceiver";

(function () {
    var BalanceController;

    BalanceController = (function () {
        var instance;

        function BalanceController() {

        }

        instance = void 0;

        BalanceController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
                instance.prototype.balanceViews = [];
            }
            return instance.prototype;
        };

        BalanceController.prototype.setBalanceTryView = function (balanceTryView) {
            this.balanceTryView = balanceTryView;
        };

        BalanceController.prototype.addBalanceView = function (balanceView) {
            this.balanceViews.push(balanceView);
        };

        BalanceController.prototype.removeBalanceView = function (balanceView) {
            if (this.balanceViews.length === 0) return;
            var index = this.balanceViews.indexOf(balanceView);
            if (index > -1) {
                this.balanceViews.splice(index, 1);
            }
        };

        BalanceController.prototype.getBalance = function () {
            return this.balance;
        };

        BalanceController.prototype.getTryBalance = function () {
            return this.tryBalance;
        };

        BalanceController.prototype.updateRealBalance = function (balance) {
            if (Configs && Configs.Login) {
                Configs.Login.Coin = balance;
            }
            BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
            this.balance = balance;
        };

        BalanceController.prototype.updateBalance = function (balance) {
            // this.balance = balance;
            this.balanceViews.forEach(function (balanceView) {
                balanceView.updateBalance(balance);
            });
        };

        // BalanceController.prototype.setBalance = function (balance) {
        //     this.balance = balance;
        //     this.balanceViews.forEach(function (balanceView) {
        //         balanceView.setBalance(balance);
        //     });
        // };

        BalanceController.prototype.updateTryBalance = function (balance) {
            this.tryBalance = balance;
            if (this.balanceTryView === null) return;
            this.balanceTryView.updateTryBalance(balance);
        };

        BalanceController.prototype.subTryBalance = function (balance) {
            if (this.balanceTryView === null) return;
            this.balanceTryView.subTryBalance(balance);
        };

        return BalanceController;

    })();

    cc.BalanceController = BalanceController;

}).call(this);

