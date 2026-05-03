/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TQJackpotController;

    TQJackpotController = (function () {
        var instance;

        function TQJackpotController() {

        }

        instance = void 0;

        TQJackpotController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQJackpotController.prototype.setTQJackpotView = function (tqJackpotView ) {
            return this.tqJackpotView = tqJackpotView;
        };

        TQJackpotController.prototype.updateTQJackpot = function (amount) {
            return this.tqJackpotView.updateJackpot(amount);
        };

        return TQJackpotController;

    })();

    cc.TQJackpotController = TQJackpotController;

}).call(this);

