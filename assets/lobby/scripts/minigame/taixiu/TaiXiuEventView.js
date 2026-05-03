
(function () {
    cc.TaiXiuEventView = cc.Class({
        "extends": cc.Component,
        properties: {
            //su kien Trieu hoi Phuong Hoang
            nodeEventPHs: [cc.Node],

            nodeButtonEventPH: cc.Node,
            spriteButtonEvent: cc.Sprite,

            skeletonDragon: sp.Skeleton,
            skeletonDragon2: sp.Skeleton,

            lbCordWin: cc.Label,
            lbCordLost: cc.Label,

            spriteBalls: [cc.Sprite],

            sfBallWins: [cc.SpriteFrame],
            sfBallLoses: [cc.SpriteFrame],

            sfButtonEvents: [cc.SpriteFrame],
            nodeDayThua: cc.Sprite,
            nodeDayThang: cc.Sprite,
            sfDayThangThua: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.TaiXiuController.getInstance().setTaiXiuEventView(this);
            this.isShowDragon = true;
        },

        //tat/bat -> UI su kien
        clickUIEventPH: function () {
            this.nodeEventPHs.forEach(function (nodeEventPH) {
                nodeEventPH.active = !nodeEventPH.active;
            });

            this.isShowDragon = !this.isShowDragon;

            this.checkActiveUIEvent();
        },

        //kich hoat event trieu hoi
        activeEventPH: function (enable) {
            if (this.isShowDragon) {
                this.nodeEventPHs.forEach(function (nodeEventPH) {
                    nodeEventPH.active = enable;
                });

                var self = this;
                self.skeletonDragon.setAnimation(0, 'Attack', true);
                self.skeletonDragon2.setAnimation(0, 'Attack', true);
                // cc.director.getScheduler().schedule(function () {
                //     self.skeletonDragon.setAnimation(1, 'Attack', true);
                //     self.skeletonDragon2.setAnimation(1, 'Attack', true);
                // }, this, 0, 0, 2, false);
            }

            if (this.nodeButtonEventPH) {
                this.nodeButtonEventPH.active = false;
            }

            this.checkActiveUIEvent();
        },

        checkActiveUIEvent: function () {
            if (this.isShowDragon) {
                this.spriteButtonEvent.spriteFrame = this.sfButtonEvents[0];
            } else {
                this.spriteButtonEvent.spriteFrame = this.sfButtonEvents[1];
            }
        },

        setUserCord: function (cordWin, cordLost) {
            if (this.lbCordWin) {
                //set gia tri
                this.lbCordWin.string = cordWin;
                this.lbCordLost.string = cordLost;
                //index ball spriteFrame
                var indexBall = 0;
                var countCord = 0;

                //xu ly UI Ball
                if (cordWin > 0) {
                    //dem so day
                    countCord = cordWin;
                    indexBall = 1;
                    this.nodeDayThang.spriteFrame = this.sfDayThangThua[1];
                    this.nodeDayThua.spriteFrame = this.sfDayThangThua[2];
                } else if (cordLost > 0) {
                    //dem so day
                    countCord = cordLost;
                    indexBall = 2;
                    this.nodeDayThang.spriteFrame = this.sfDayThangThua[0];
                    this.nodeDayThua.spriteFrame = this.sfDayThangThua[3];
                }

                var countBallActive = countCord / 2;

                for (var i = 0; i < 7; i++) {
                    if (i + 1 > countBallActive) {
                        this.spriteBalls[i].node.active = false;
                    } else {
                        if (indexBall === 1) {
                            this.spriteBalls[i].spriteFrame = this.sfBallWins[i];
                        } else {
                            this.spriteBalls[i].spriteFrame = this.sfBallLoses[i];
                        }
                        this.spriteBalls[i].node.active = true;
                    }
                }            
            }
        },

        openEventClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.Tool.getInstance().setItem('@startTabEvent', '4');
                cc.LobbyController.getInstance().createEventView();
            }
        },
    });
}).call(this);
