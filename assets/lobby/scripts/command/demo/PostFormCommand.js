/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var PostFormCommand;

    PostFormCommand = (function () {
        function PostFormCommand() {
        }

        PostFormCommand.prototype.execute = function (controller) {
            var url = "Method";
            var params = "serviceId=" + encodeURIComponent(cc.ServerConnector.getInstance().getServiceId())
                + "&" + "sessionId=" + encodeURIComponent(cc.ServerConnector.getInstance().getSessionId());

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.CHAT, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.status.code === 0) {
                    controller.onPostFormResponse(obj);
                } else {
                    cc.PopupController.getInstance().show(obj.status.message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return PostFormCommand;

    })();

    cc.PostFormCommand = PostFormCommand;

}).call(this);

