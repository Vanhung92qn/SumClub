/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var MPEffectController;

    MPEffectController = (function () {
        var instance;

        function MPEffectController() {

        }

        instance = void 0;

        MPEffectController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        MPEffectController.prototype.setMPEffectView = function (mpEffectView) {
            return this.mpEffectView = mpEffectView;
        };

        MPEffectController.prototype.playEffect = function (effectType, amount, time) {
            return this.mpEffectView.playEffect(effectType, amount, time);
        };

        MPEffectController.prototype.stopEffect = function () {
            return this.mpEffectView.stopEffect();
        };

        return MPEffectController;

    })();

    cc.MPEffectController = MPEffectController;

}).call(this);

