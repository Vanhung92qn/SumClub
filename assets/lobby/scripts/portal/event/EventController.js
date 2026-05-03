/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var EventController;

    EventController = (function () {
        var instance;

        function EventController() {
        }

        instance = void 0;

        EventController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        EventController.prototype.setEventView = function (eventView) {
            return this.eventView = eventView;
        };

        EventController.prototype.setEventLobbyView = function (eventLobbyView) {
            return this.eventLobbyView = eventLobbyView;
        };

        EventController.prototype.setEventImage = function (eventImage) {
            return this.eventImage = eventImage;
        };

        EventController.prototype.getEventImage = function () {
            return this.eventImage;
        };

        EventController.prototype.pauseCheckEvent = function (isPause) {
            return this.eventLobbyView.pauseCheckEvent(isPause);
        };

        EventController.prototype.openTab = function (tabIndex) {
            return this.eventView.openTab(tabIndex);
        };

        EventController.prototype.showEventBusy = function () {
            if (this.eventView) {
                this.eventView.showEventBusy();
                return true;
            } else {
                return false;
            }
        };

        EventController.prototype.hideEventBusy = function () {
            return this.eventView.hideEventBusy();
        };


        return EventController;

    })();

    cc.EventController = EventController;

}).call(this);

