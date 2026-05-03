/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TQEffectController;

    TQEffectController = (function () {
        var instance;

        function TQEffectController() {

        }

        instance = void 0;

        TQEffectController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQEffectController.prototype.setTQEffectView = function (tqEffectView) {
            return this.tqEffectView = tqEffectView;
        };

        TQEffectController.prototype.playEffect = function (effectType, spinResponse, time) {
            return this.tqEffectView.playEffect(effectType, spinResponse, time);
        };

        TQEffectController.prototype.stopEffect = function () {
            return this.tqEffectView.stopEffect();
        };

        return TQEffectController;

    })();

    cc.TQEffectController = TQEffectController;

}).call(this);

