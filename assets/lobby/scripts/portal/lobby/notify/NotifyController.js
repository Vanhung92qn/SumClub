/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var NotifyController;

    NotifyController = (function () {
        var instance;

        function NotifyController() {

        }

        instance = void 0;

        NotifyController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        NotifyController.prototype.setNotifyView = function (notifyView) {
            return this.notifyView = notifyView;
        };

        NotifyController.prototype.getNotify = function () {
            if (this.notifyView !== null && this.notifyView !== undefined)
                return this.notifyView.getNotify();
            else
                return null;
        };


        return NotifyController;

    })();

    cc.NotifyController = NotifyController;

}).call(this);