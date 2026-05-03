

(function () {
    var TXMD5GetEventSearchBoxCommand;

    TXMD5GetEventSearchBoxCommand = (function () {
        function TXMD5GetEventSearchBoxCommand() {
        }

        TXMD5GetEventSearchBoxCommand.prototype.execute = function (controller) {
            var url = 'api/md5luckydice/GetEventSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventSearchBoxResponse(obj);
            });
        };

        return TXMD5GetEventSearchBoxCommand;

    })();

    cc.TXMD5GetEventSearchBoxCommand = TXMD5GetEventSearchBoxCommand;

}).call(this);
