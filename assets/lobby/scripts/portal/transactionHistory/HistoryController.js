/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var HistoryController;

    HistoryController = (function () {
        var instance;

        function HistoryController() {
        }

        instance = void 0;

        HistoryController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        HistoryController.prototype.setHistoryView = function (historyView) {
            return this.historyView = historyView;
        };

        HistoryController.prototype.setRedeemTransactionView = function (redeemTransactionView) {
            return this.redeemTransactionView = redeemTransactionView;
        };

        HistoryController.prototype.activeTab = function (tabName) {
            return this.historyView.activeTab(tabName);
        };

        HistoryController.prototype.refreshRedeemTransactionList = function () {
            return this.redeemTransactionView.refreshRedeemTransactionList();
        };

        return HistoryController;

    })();

    cc.HistoryController = HistoryController;

}).call(this);

