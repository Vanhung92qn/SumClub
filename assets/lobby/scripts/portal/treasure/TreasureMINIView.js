/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureMINIView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbCarrot: cc.Label,
            lbRemaining: cc.Label,
        },

        onLoad: function () {
            // this.node.zIndex = cc.NoteDepth.MINI_EVENT_VIEW;

            this.node.parent.zIndex = cc.NoteDepth.MINI_VIEW_BUTTON;

            this.isTimer = false;
            this.timer = 0;

            this.updateTimer = 0;
            this.updateInterval = 1;

            cc.TreasureController.getInstance().setTreasureMINIView(this);

            //lay ve thong tin su kien co ban
            this.refreshPortalTreasureInfo();
        },

        refreshPortalTreasureInfo: function () {
            var treasureGetPortalInfoCommand = new cc.TreasureGetPortalInfoCommand;
            treasureGetPortalInfoCommand.execute(this);
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer >= this.updateInterval) {
                    if (this.timer > 0) {
                        var timerRound = cc.Tool.getInstance().convertSecondToTimeWithDay(Math.round(this.timer));
                        this.lbRemaining.string = timerRound;
                        cc.TreasureController.getInstance().updateEventTime(timerRound);
                    } else {
                        //het su kien
                        this.timer = 0;
                        this.isTimer = false;
                        this.lbRemaining.string = 'Kết thúc';
                    }
                    this.updateTimer = 0;
                }
            }
        },

        startTimer: function (remaining) {
            this.updateTimer = 0;
            this.timer = remaining;
            this.isTimer = true;
        },

        resetCarrot: function () {
            if (this.lbCarrot)
                this.lbCarrot.string = '';
        },

        onTreasureGetPortalInfoResponse: function (response) {
            // {"ResponseCode":1,"Carrot":0,"EndEventIn":0}
            // {"ResponseCode":-1001,"Message":"Chưa đăng nhập"}
            if (response.ResponseCode === 1) {
                this.lbCarrot.string = cc.Tool.getInstance().formatNumber(response.Carrot);

                this.startTimer(response.EndEventIn);
            }
        },

        openTreasure: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createTreasureView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'TREASURE', cc.DDNAUIType.BUTTON);
            }
        },

        openTreasureClicked: function () {
            cc.LobbyController.getInstance().createTreasureTopView();
            // this.openTreasure();
        },
    });
}).call(this);
