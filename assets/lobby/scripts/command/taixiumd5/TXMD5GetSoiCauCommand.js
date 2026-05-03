

(function () {
    var TXMD5GetSoiCauCommand;

    TXMD5GetSoiCauCommand = (function () {
        function TXMD5GetSoiCauCommand() {
        }

        TXMD5GetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/md5luckydice/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSoiCauResponse(obj);
            });
        };

        return TXMD5GetSoiCauCommand;

    })();

    cc.TXMD5GetSoiCauCommand = TXMD5GetSoiCauCommand;

}).call(this);
