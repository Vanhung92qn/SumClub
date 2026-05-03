/**
 * Created by BeChicken on 8/6/2019.
 * Vsersion 1.0
 */
(function () {
    cc.BCTopView = cc.Class({
        "extends": cc.Component,
        properties: {
            BCTopListView: cc.BCTopListView,
        },

        onEnable: function () {
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                this.getTopSessionWinners();
                // this.onBCGetBigWinnerResponse(null);
            }.bind(this), this, 1, 0, delay, false);
            this.exData = [
                {
                    "DisplayName": "kiemtien169",
                    "Award": 5176000,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "hungbop05",
                    "Award": 5001000,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "ll0ngko0llz",
                    "Award": 1939500,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "mutdaiko",
                    "Award": 1735000,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "tomhum119",
                    "Award": 1604000,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "hsb1982",
                    "Award": 1433000,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "qop111111",
                    "Award": 1198500,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "galaem123321",
                    "Award": 1192000,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "phanvanchuan",
                    "Award": 1190500,
                    "ServiceID": 1,
                    "AvartarID": 1
                },
                {
                    "DisplayName": "kubomjukon",
                    "Award": 1169000,
                    "ServiceID": 1,
                    "AvartarID": 1
                }
            ];
        },

        getTopSessionWinners: function () {
            var bcGetWinnersCommand = new cc.BCWinnerCommand;
            bcGetWinnersCommand.execute(this);
        },

        onBCGetBigWinnerResponse: function (response) {
            if (this.BCTopListView) {
                let list = response;
                if(list.ResponseCode == 1 && list.List.length > 0) {
                    // var list = this.exData;
                    this.BCTopListView.resetList();
                    this.BCTopListView.initialize(list.List);
                }
            }
        },
    });
}).call(this);