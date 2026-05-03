/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.TQKBView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeKB: cc.Node, //node su kien King Boom
            nodeEvent: cc.Node, //node dang dien ra
            nodeEventUpcoming: cc.Node, //node sắp dien ra

            lbTimeEnd: cc.Label,

            lbTime: cc.Label, //thoi gian doi su kien dien ra
            lbRank: cc.Label, //hang hien tai
            lbBom: cc.LabelIncrement, //so bom hien tai

            lbValueFxX2: cc.Label,
        },

        onLoad: function () {
            this.lbBom.setValue(0);

            this.nodeFxX2 = this.lbValueFxX2.node.parent;
            this.animationX2 = this.nodeFxX2.getComponent(cc.Animation);

            this.scheduler = cc.director.getScheduler();
            cc.TQKBController.getInstance().setTQKBView(this);
            this.skeleton = this.nodeKB.getComponent(sp.Skeleton);

            this.clearTimer();
            this.checkEvent();
        },

        onDestroy: function () {
            cc.TQKBController.getInstance().setTQKBView(null);
            this.clearTimer();
        },

        checkEvent: function () {
            //kiem tra xem có su kien ko
            var getKBAccountInfoCommand = new cc.GetKBAccountInfoCommand;
            getKBAccountInfoCommand.execute(this);
        },


        clearTimer: function () {
            this.isTimer = false;
            this.timer = 0;
            if (this.interval) {
                clearInterval(this.interval);
            }
        },

        updateBoomInfo: function (info) {
            this.info = info;
        },
        
        updateBoom: function () {
            var info = this.info;
            if (info && this.lbBom) {
                var oldVal = parseInt(this.lbBom.label.string);
                var totalBom = info[2];

                // console.log('oldVal: ', oldVal);
                // console.log('totalBom: ', totalBom);

                if (totalBom > oldVal) {
                    var self = this;

                    this.lbBom.tweenValueto(totalBom);
                    //play fx +bom
                    if (info[1] > 1) {
                        this.nodeFxX2.active = true;
                        this.lbValueFxX2.string = (totalBom / 2) + ' x 2 = ' + totalBom + ' BOM';
                        this.animationX2.play('openWinFx');

                        self.skeleton.setAnimation(2, 'bomx2', false);
                        this.scheduler.schedule(function () {
                            self.skeleton.clearTracks();
                            self.skeleton.setToSetupPose();
                            self.skeleton.setAnimation(0, 'animation', true);
                            self.nodeFxX2.active = false;
                        }, this, 0, 0, 2, false);


                    } else {
                        this.nodeFxX2.active = false;

                        self.skeleton.setAnimation(1, 'bom', false);
                        this.scheduler.schedule(function () {
                            self.skeleton.clearTracks();
                            self.skeleton.setToSetupPose();
                            self.skeleton.setAnimation(0, 'animation', true);
                        }, this, 0, 0, 2, false);
                    }
                }
            }
        },

        //dem lui thoi gian o local
        startTimer: function (remaining) {
            if (this.interval) {
                clearInterval(this.interval);
            }

            var self = this;
            this.timer = remaining;
            this.isTimer = true;

            ////update timer UI
            this.lbTime.string = cc.Tool.getInstance().convertSecondToTime(remaining);
            this.lbTimeEnd.string = cc.Tool.getInstance().convertSecondToTime(remaining);

            this.interval = setInterval(function(){
                if (self.isTimer) {
                    self.timer -= 1;
                    if (self.timer <= 0) {
                        self.checkEvent();
                    }
                    self.lbTime.string = cc.Tool.getInstance().convertSecondToTime(self.timer);
                    self.lbTimeEnd.string = cc.Tool.getInstance().convertSecondToTime(self.timer);
                }
            }, 1000);
        },

        onGetKBAccountInfoResponse: function (info) {
            // {"TotaBoom":0,"Position":0,"RemainTimes":0} -1
            switch (info.EventDay) {
                case -1:
                    //ko có sự kiện
                    //an giao dien su kien
                    this.nodeKB.active = false;
                    this.updateBoomInfo(null);
                    break;
                case 0:
                    //đang diễn ra
                    this.nodeKB.active = true;

                    this.nodeEvent.active = true;
                    this.nodeEventUpcoming.active = false;

                    //set gia tri hien tai
                    this.lbRank.string = info.Position;
                    this.lbBom.setValue(info.TotaBoom);

                    this.startTimer(info.RemainTimes);
                    break;
                case 1:
                    //sắp diễn ra
                    this.nodeKB.active = true;

                    this.nodeEvent.active = false;
                    this.nodeEventUpcoming.active = true;
                    this.startTimer(info.RemainTimes);
                    break;
            }
        },

        openEventClicked: function () {
            // if (cc.LoginController.getInstance().checkLogin()) {
            cc.Tool.getInstance().setItem('@startTabEvent', '1');
            cc.LobbyController.getInstance().createEventView();
            // }
        },
    });
}).call(this);
