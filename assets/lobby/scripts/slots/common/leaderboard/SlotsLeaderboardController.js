/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var SlotsLeaderboardController;

    SlotsLeaderboardController = (function () {
        var instance;

        function SlotsLeaderboardController() {
        }

        instance = void 0;

        SlotsLeaderboardController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        SlotsLeaderboardController.prototype.setLeaderboardView = function (leaderboardView) {
            return this.leaderboardView = leaderboardView;
        };


        return SlotsLeaderboardController;

    })();

    cc.SlotsLeaderboardController = SlotsLeaderboardController;

}).call(this);

