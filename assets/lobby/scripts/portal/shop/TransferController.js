/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var TransferController;

    TransferController = (function () {
        var instance;

        function TransferController() {
        }

        instance = void 0;

        TransferController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TransferController.prototype.setTransferView = function (transferView) {
            return this.transferView = transferView;
        };

        TransferController.prototype.bindNickName = function (nickname) {
            return this.transferView.bindNickName(nickname);
        };

        return TransferController;

    })();

    cc.TransferController = TransferController;

}).call(this);

