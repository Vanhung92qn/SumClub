/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var PostJsonCommand;

    PostJsonCommand = (function () {
        function PostJsonCommand() {
        }

        PostJsonCommand.prototype.execute = function (controller) {
            var url = 'Method';
            var params = JSON.stringify({
                serviceId: cc.ServerConnector.getInstance().getServiceId(),
                sessionId: cc.ServerConnector.getInstance().getSessionId(),
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.CHAT, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.status.code === 0) {
                    return controller.onPostJsonResponse(obj);
                } else {
                    cc.PopupController.getInstance().show(obj.status.message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return PostJsonCommand;

    })();

    cc.PostJsonCommand = PostJsonCommand;

}).call(this);
