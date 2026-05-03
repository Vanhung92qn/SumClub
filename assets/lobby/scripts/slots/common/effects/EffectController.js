
(function () {
    var EffectController;

    EffectController = (function () {
        var instance;

        function EffectController() {
        }

        instance = void 0;

        EffectController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        EffectController.prototype.setEffectView = function (effectView) {
            return this.effectView = effectView;
        };

        EffectController.prototype.playEffect = function (effectType, totalWin, tweenTime) {
            return this.effectView.playEffect(effectType, totalWin, tweenTime);
        };

        EffectController.prototype.stopEffect = function () {
            return this.effectView.stopEffect();
        };

        return EffectController;

    })();

    cc.EffectController = EffectController;

}).call(this);
