/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var Seven77EffectController;

    Seven77EffectController = (function () {
        var instance;

        function Seven77EffectController() {

        }

        instance = void 0;

        Seven77EffectController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77EffectController.prototype.setSeven77EffectView = function (seven77EffectView) {
            return this.seven77EffectView = seven77EffectView;
        };

        Seven77EffectController.prototype.playEffect = function (effectType, spinResponse, time) {
            return this.seven77EffectView.playEffect(effectType, spinResponse, time);
        };

        Seven77EffectController.prototype.stopEffect = function () {
            return this.seven77EffectView.stopEffect();
        };

        return Seven77EffectController;

    })();

    cc.Seven77EffectController = Seven77EffectController;

}).call(this);

