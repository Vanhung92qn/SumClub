
(function () {
    var VietlotGetSoiCauDetailCommand;

    VietlotGetSoiCauDetailCommand = (function () {
        function VietlotGetSoiCauDetailCommand() {
        }

        VietlotGetSoiCauDetailCommand.prototype.execute = function (controller, sessionID) {
            var url = 'api/VietLott/GetSessionDetail?sessionId='+sessionID;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VIETLOT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVietlotGetSoiCauDetailResponse(obj);
            });
        };

        return VietlotGetSoiCauDetailCommand;

    })();

    cc.VietlotGetSoiCauDetailCommand = VietlotGetSoiCauDetailCommand;

}).call(this);
