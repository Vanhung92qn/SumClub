/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var EventTopVpController;

    EventTopVpController = (function () {
        var instance;

        function EventTopVpController() {
        }

        instance = void 0;

        EventTopVpController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        EventTopVpController.prototype.setEventView = function (eventView) {
            return this.eventView = eventView;
        };

        EventTopVpController.prototype.setEventLobbyView = function (eventLobbyView) {
            return this.eventLobbyView = eventLobbyView;
        };

        EventTopVpController.prototype.setEventImage = function (eventImage) {
            return this.eventImage = eventImage;
        };

        EventTopVpController.prototype.getEventImage = function () {
            return this.eventImage;
        };

        EventTopVpController.prototype.pauseCheckEvent = function (isPause) {
            return this.eventLobbyView.pauseCheckEvent(isPause);
        };

        EventTopVpController.prototype.openTab = function (tabIndex) {
            return this.eventView.openTab(tabIndex);
        };

        EventTopVpController.prototype.showEventBusy = function () {
            if (this.eventView) {
                this.eventView.showEventBusy();
                return true;
            } else {
                return false;
            }
        };

        EventTopVpController.prototype.hideEventBusy = function () {
            return this.eventView.hideEventBusy();
        };


        return EventTopVpController;

    })();

    cc.EventTopVpController = EventTopVpController;

}).call(this);

