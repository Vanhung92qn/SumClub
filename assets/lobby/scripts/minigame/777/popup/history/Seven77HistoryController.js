/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var Seven77HistoryController;

    Seven77HistoryController = (function () {
        var instance;

        function Seven77HistoryController() {
        }

        instance = void 0;

        Seven77HistoryController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77HistoryController.prototype.setHistoryView = function (historyView) {
            return this.historyView = historyView;
        };

        Seven77HistoryController.prototype.setSessionDetailData = function (sessionDetailData) {
            return this.sessionDetailData = sessionDetailData;
        };

        Seven77HistoryController.prototype.getSessionDetailData = function () {
            return this.sessionDetailData;
        };

        return Seven77HistoryController;

    })();

    cc.Seven77HistoryController = Seven77HistoryController;

}).call(this);

