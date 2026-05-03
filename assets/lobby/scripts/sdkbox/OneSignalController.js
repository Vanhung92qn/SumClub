/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var OneSignalController;

    OneSignalController = (function () {
        var instance;

        function OneSignalController() {
        }

        instance = void 0;

        OneSignalController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        OneSignalController.prototype.setOneSignal = function (oneSignal ) {
            return this.oneSignal = oneSignal;
        };

        OneSignalController.prototype.sendTag = function (key, value) {
            if (this.oneSignal) {
                return this.oneSignal.sendTag(key, value);
            }
        };

        return OneSignalController;

    })();

    cc.OneSignalController = OneSignalController;

}).call(this);

