/**
 * Created by Nofear on 3/21/2019.
 */

(function () {
    var HubController;

    HubController = (function () {
        var instance;

        function HubController() {

        }

        instance = void 0;

        HubController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        HubController.prototype.setPortalHub = function (portalHub) {
            this.portalHub = portalHub;
        };

        HubController.prototype.disconnectPortalHub = function () {
            if (this.portalHub)
                this.portalHub.disconnect();
        };

        return HubController;

    })();

    cc.HubController = HubController;

}).call(this);

