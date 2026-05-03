/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var TQHistoryController;

    TQHistoryController = (function () {
        var instance;

        function TQHistoryController() {
        }

        instance = void 0;

        TQHistoryController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQHistoryController.prototype.setHistoryView = function (historyView) {
            return this.historyView = historyView;
        };

        TQHistoryController.prototype.setSessionDetailData = function (sessionDetailData) {
            return this.sessionDetailData = sessionDetailData;
        };

        TQHistoryController.prototype.getSessionDetailData = function () {
            return this.sessionDetailData;
        };

        return TQHistoryController;

    })();

    cc.TQHistoryController = TQHistoryController;

}).call(this);

