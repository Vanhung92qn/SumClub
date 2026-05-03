/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetCommand;

    GetCommand = (function () {
        function GetCommand() {

        }

        GetCommand.prototype.execute = function (controller) {
            var url = 'Method/' +  cc.ServerConnector.getInstance().getSessionId();
            return cc.ServerConnector.getInstance().sendRequest(url, function(response) {
                var obj = JSON.parse(response);
                if (obj.status.code === 0) {
                    return controller.onGetResponse(obj);
                } else {
                    cc.PopupController.getInstance().show(obj.status.message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return GetCommand;

    })();

    cc.GetCommand = GetCommand;

}).call(this);
