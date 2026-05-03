
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetBreathRankingCommand;

    GetBreathRankingCommand = (function () {
        function GetBreathRankingCommand() {
        }

        GetBreathRankingCommand.prototype.execute = function (controller) {
            var url = 'api/ShortBreath/GetSbRanking?'
                + 'topCount=100'
                + '&sbJackpotId=' + controller.jackpotId
                + '&sbGameId=' + controller.gameId;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetBreathRankingResponse(obj);
            });
        };

        return GetBreathRankingCommand;

    })();

    cc.GetBreathRankingCommand = GetBreathRankingCommand;

}).call(this);
