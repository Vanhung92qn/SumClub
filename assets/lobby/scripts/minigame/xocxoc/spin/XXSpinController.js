/**
 * XXSpinController - singleton bridge cho mini-slot 4-dice jackpot.
 * Luu: xxDiceView (chua 6 spriteFrame), spinResponse (tu server), ketQua (4 dice).
 */
(function () {
    var XXSpinController;

    XXSpinController = (function () {
        var instance;

        function XXSpinController() {
        }

        instance = void 0;

        XXSpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XXSpinController.prototype.setXXDiceView = function (xxDiceView) {
            return this.xxDiceView = xxDiceView;
        };

        XXSpinController.prototype.setSpinResponse = function (spinResponse) {
            this.spinResponse = spinResponse;
            return this.spinResponse;
        };

        XXSpinController.prototype.getSpinResponse = function () {
            return this.spinResponse;
        };

        XXSpinController.prototype.getSFDices = function () {
            if (!this.xxDiceView) return [];
            return this.xxDiceView.sfDices;
        };

        XXSpinController.prototype.stopSpinFinish = function () {
            // Hook: 1 cot finish stop. Co the dung counter de detect het 4 cot.
        };

        XXSpinController.prototype.setKetQua = function (ketQua) {
            this.ketQua = ketQua;
        };

        XXSpinController.prototype.getKetQua = function () {
            if (!this.ketQua) {
                var randomKetQua = [];
                for (var i = 0; i < 4; i++) {
                    randomKetQua.push(Math.floor(Math.random() * 6) + 1);
                }
                this.ketQua = randomKetQua;
            }
            return this.ketQua;
        };

        return XXSpinController;

    })();

    cc.XXSpinController = XXSpinController;

}).call(this);
