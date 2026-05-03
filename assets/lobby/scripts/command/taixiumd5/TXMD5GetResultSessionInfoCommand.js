

(function () {
    var TXMD5GetResultSessionInfoCommand;

    TXMD5GetResultSessionInfoCommand = (function () {
        function TXMD5GetResultSessionInfoCommand() {

        }

        TXMD5GetResultSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/md5luckydice/GetResultSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetResultSessionInfoResponse(obj);
            });					
        };		
        return TXMD5GetResultSessionInfoCommand;

    })();

    cc.TXMD5GetResultSessionInfoCommand = TXMD5GetResultSessionInfoCommand;

}).call(this);
