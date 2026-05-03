/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var LobbyJackpotController;

    LobbyJackpotController = (function () {
        var instance;

        function LobbyJackpotController() {

        }

        instance = void 0;

        LobbyJackpotController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
                instance.prototype.xJackpotViews = [];
            }
            return instance.prototype;
        };

        LobbyJackpotController.prototype.setLobbyJackpotView = function (lobbyJackpotView) {
            return this.lobbyJackpotView = lobbyJackpotView;
        };

        LobbyJackpotController.prototype.setLobbyXJackpotView = function (lobbyXJackpotView) {
            return this.lobbyXJackpotView = lobbyXJackpotView;
        };

        LobbyJackpotController.prototype.setXJackpotLogo = function (xJackpotLogo) {
            return this.xJackpotLogo = xJackpotLogo;
        };

        LobbyJackpotController.prototype.setJackpotResponse = function (jackpotResponse) {
            return this.jackpotResponse = jackpotResponse;
        };

        LobbyJackpotController.prototype.addXJackpotView = function (xJackpotView) {
            this.xJackpotViews.push(xJackpotView);
        };

        LobbyJackpotController.prototype.removeXJackpotView = function (xJackpotView) {
            if (this.xJackpotViews.length === 0) return;
            var index = this.xJackpotViews.indexOf(xJackpotView);
            if (index > -1) {
                this.xJackpotViews.splice(index, 1);
            }
        };

        LobbyJackpotController.prototype.updateXJackpot = function () {
            this.xJackpotViews.forEach(function (xJackpotView) {
                xJackpotView.updateXJackpot();
            });
        };

        LobbyJackpotController.prototype.getLogoXJackpot = function () {
            return this.xJackpotLogo.sfLogoXs;
        };

        LobbyJackpotController.prototype.getJackpotResponse = function () {
            return this.jackpotResponse;
        };

        LobbyJackpotController.prototype.getXJackpot = function () {
            return this.lobbyXJackpotView.getXJackpot();
        };

        LobbyJackpotController.prototype.setXJackpotResponse = function (xJackpotResponse) {
            return this.xJackpotResponse = xJackpotResponse;
        };

        LobbyJackpotController.prototype.getXJackpotResponse = function () {
            return this.xJackpotResponse;
        };

        LobbyJackpotController.prototype.pauseUpdateJackpot = function (isPause) {
            cc.EventController.getInstance().pauseCheckEvent(isPause);
            return this.lobbyJackpotView.pauseUpdateJackpot(isPause);
        };

        return LobbyJackpotController;

    })();

    cc.LobbyJackpotController = LobbyJackpotController;

}).call(this);

