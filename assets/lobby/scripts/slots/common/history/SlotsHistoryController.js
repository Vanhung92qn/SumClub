/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var SlotsHistoryController;

    SlotsHistoryController = (function () {
        var instance;

        function SlotsHistoryController() {
        }

        instance = void 0;

        SlotsHistoryController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        SlotsHistoryController.prototype.setHistoryView = function (historyView) {
            return this.historyView = historyView;
        };

        SlotsHistoryController.prototype.setSessionDetailData = function (sessionDetailData) {
            return this.sessionDetailData = sessionDetailData;
        };

        SlotsHistoryController.prototype.getSessionDetailData = function () {
            return this.sessionDetailData;
        };

        return SlotsHistoryController;

    })();

    cc.SlotsHistoryController = SlotsHistoryController;

}).call(this);

