/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuSieuTocMainController;

    TaiXiuSieuTocMainController = (function () {
        var instance;

        function TaiXiuSieuTocMainController() {

        }

        instance = void 0;

        TaiXiuSieuTocMainController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TaiXiuSieuTocMainController.prototype.setTaiXiuSieuTocMainView = function (taiXiuMainView) {
            return this.taiXiuMainView = taiXiuMainView;
        };

        TaiXiuSieuTocMainController.prototype.createGraphView = function () {
            return this.taiXiuMainView.createGraphView();
        };

        TaiXiuSieuTocMainController.prototype.destroyGraphView = function () {
            return this.taiXiuMainView.destroyGraphView();
        };

        TaiXiuSieuTocMainController.prototype.createSessionDetailView = function () {
            return this.taiXiuMainView.createSessionDetailView();
        };

        TaiXiuSieuTocMainController.prototype.destroySessionDetailView = function () {
            return this.taiXiuMainView.destroySessionDetailView();
        };

        TaiXiuSieuTocMainController.prototype.createTopView = function () {
            return this.taiXiuMainView.createTopView();
        };

        TaiXiuSieuTocMainController.prototype.destroyTopView = function () {
            return this.taiXiuMainView.destroyTopView();
        };

        TaiXiuSieuTocMainController.prototype.createHelpView = function () {
            return this.taiXiuMainView.createHelpView();
        };

        TaiXiuSieuTocMainController.prototype.destroyHelpView = function () {
            return this.taiXiuMainView.destroyHelpView();
        };

        TaiXiuSieuTocMainController.prototype.createHistoryView = function () {
            return this.taiXiuMainView.createHistoryView();
        };

        TaiXiuSieuTocMainController.prototype.destroyHistoryView = function () {
            return this.taiXiuMainView.destroyHistoryView();
        };
        TaiXiuSieuTocMainController.prototype.createJackpotHistoryView = function () {
            return this.taiXiuMainView.createJackpotHistoryView();
        };

        TaiXiuSieuTocMainController.prototype.destroyJackpotHistoryView = function () {
            return this.taiXiuMainView.destroyJackpotHistoryView();
        };
        return TaiXiuSieuTocMainController;

    })();

    cc.TaiXiuSieuTocMainController = TaiXiuSieuTocMainController;

}).call(this);

