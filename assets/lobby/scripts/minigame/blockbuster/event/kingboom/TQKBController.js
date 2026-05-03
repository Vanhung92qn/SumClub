/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TQKBController;

    TQKBController = (function () {
        var instance;

        function TQKBController() {

        }

        instance = void 0;

        TQKBController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQKBController.prototype.setTQKBView = function (tqKBView ) {
            return this.tqKBView = tqKBView;
        };

        TQKBController.prototype.updateBoom = function () {
            if (this.tqKBView)
                return this.tqKBView.updateBoom();
        };

        TQKBController.prototype.updateBoomInfo = function (info) {
            if (this.tqKBView)
                return this.tqKBView.updateBoomInfo(info);
        };

        return TQKBController;

    })();

    cc.TQKBController = TQKBController;

}).call(this);

