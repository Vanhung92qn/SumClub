

(function () {
    var TXMD5GetEventHonorsCommand;

    TXMD5GetEventHonorsCommand = (function () {
        function TXMD5GetEventHonorsCommand() {
        }

        TXMD5GetEventHonorsCommand.prototype.execute = function (controller) {

            var url = 'api/md5luckydice/GetEventHonors?top=100'
                + '&cordType=' + controller.cordType
                + '&recallCode=' + controller.recallCode;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventHonorsResponse(obj);
            });
        };

        return TXMD5GetEventHonorsCommand;

    })();

    cc.TXMD5GetEventHonorsCommand = TXMD5GetEventHonorsCommand;

}).call(this);
