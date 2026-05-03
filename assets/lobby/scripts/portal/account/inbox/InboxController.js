/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var InboxController;

    InboxController = (function () {
        var instance;

        function InboxController() {
        }

        instance = void 0;

        InboxController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        InboxController.prototype.setInboxView = function (inboxView) {
            return this.inboxView = inboxView;
        };

        InboxController.prototype.getInbox = function () {
            return this.inboxView.getInbox();
        };

        return InboxController;

    })();

    cc.InboxController = InboxController;

}).call(this);

