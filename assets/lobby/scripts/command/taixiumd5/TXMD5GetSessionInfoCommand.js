

(function () {
    var TXMD5GetSessionInfoCommand;

    TXMD5GetSessionInfoCommand = (function () {
        function TXMD5GetSessionInfoCommand() {

        }

        TXMD5GetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/md5luckydice/GetSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSessionInfoResponse(obj);
            });					
        };		
        return TXMD5GetSessionInfoCommand;

    })();

    cc.TXMD5GetSessionInfoCommand = TXMD5GetSessionInfoCommand;

}).call(this);
