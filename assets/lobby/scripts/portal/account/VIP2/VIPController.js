/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var VIPController;

    VIPController = (function () {
        var instance;

        function VIPController() {
        }

        instance = void 0;

        VIPController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        VIPController.prototype.setVIP2View = function (VIP2View) {
            return this.VIP2View = VIP2View;
        };

        VIPController.prototype.getVIPInfo = function () {
            return this.VIP2View.getVIPInfo();
        };

        VIPController.prototype.getCardInfo = function () {
            return this.VIP2View.getCardInfo();
        };

        VIPController.prototype.getLoanInfo = function () {
            return this.VIP2View.getLoanInfo();
        };

        return VIPController;

    })();

    cc.VIPController = VIPController;

}).call(this);

