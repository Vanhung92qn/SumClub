/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.VipView = cc.Class({
        "extends": cc.Component,
        properties: {
            vipTemp: cc.Node,
            vipParent: cc.Node,

            nodePolicy: cc.Node,

            lbCurrentVP: cc.Label,
            progressVP: cc.ProgressBar,
        },

        // use this for initialization
        onLoad: function () {
            var getPrivilegeTypeCommand = new cc.GetPrivilegeTypeCommand;
            getPrivilegeTypeCommand.execute(this);
        },

        onGetPrivilegeTypeResponse: function (response) {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            var currentRankID = 5;

            var list = response.List;
            var self = this;


            for (var i = 4; i >= 0; i--) {
                var item = list[i];

                var nodeView = cc.instantiate(self.vipTemp);
                nodeView.parent = self.vipParent;
                var vipItem = nodeView.getComponent(cc.VIPItem);
                vipItem.initItem(i, item, loginResponse.VP);

                if (loginResponse.VP >= item.VipPoint) {
                    currentRankID = item.RankID;
                }
            }

            //rank cuoi
            if (currentRankID === 1) {
                this.lbCurrentVP.string = cc.Tool.getInstance().formatNumber(loginResponse.VP);
                this.progressVP.progress = 1;
            } else {
                this.lbCurrentVP.string = loginResponse.VP + '/' + cc.Tool.getInstance().formatNumber(list[currentRankID - 2].VipPoint);
                this.progressVP.progress = loginResponse.VP / list[currentRankID - 2].VipPoint;
            }
        },

        policyClicked: function () {
            this.nodePolicy.active = true;
        },
    });
}).call(this);
