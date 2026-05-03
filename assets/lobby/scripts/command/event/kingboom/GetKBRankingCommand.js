
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetKBRankingCommand;

    GetKBRankingCommand = (function () {
        function GetKBRankingCommand() {
        }

        GetKBRankingCommand.prototype.execute = function (controller) {
            var url = 'api/KingBoom/GetKbRanking?'
                + 'topCount=100'
                + '&timeId=' + controller.timeId
                + '&forDate=' + controller.lbDateValue.string;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BLOCK_BUSTER, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetKBRankingResponse(obj);
            });
        };

        return GetKBRankingCommand;

    })();

    cc.GetKBRankingCommand = GetKBRankingCommand;

}).call(this);
