/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.NotifyView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeContent: cc.Node,
            lbSystem: cc.Label,
            notifyItems: [cc.NotifyItem],
            AudioClick: cc.AudioSource,
        },

        onLoad: function () {
            cc.NotifyController.getInstance().setNotifyView(this);

            this.baseDuration = 10;
            this.rootX = this.nodeContent.x;
            this.rootDistance = 650;
            this.rootY = this.nodeContent.y;

            this.maxItem = this.notifyItems.length;

            this.getNotify();
        },

        getNotify: function () {
            if (this.action && !this.action.isDone()) {
                this.nodeContent.stopAction(this.action);
                this.unscheduleAllCallbacks();
            }

            var getNotifyCommand = new cc.GetNotifyCommand;
            getNotifyCommand.execute(this);
        },
		nhiemvuclickvn1102: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
			 cc.PopupController.getInstance().showMessage('Tính năng đang bảo trì !');
		},

        onGetNotifyResponse: function (response) {
            if (response !== null && response.List.length === 0) {
                cc.director.getScheduler().schedule(this.getNotify, this, this.baseDuration, 0, 0, false);
                return;
            }

            if (response.List[0].GameID === 0) {
                this.lbSystem.string = response.List[0].AccountName + ' ';
            }

            var countNotify = response.List.length;

            for (var i = 1; i < countNotify; i++) {
                var user = response.List[i];
                if (user.GameID > 0) {
                    var lastText = i === countNotify - 1 ? '' : ' ';
                    if (this.notifyItems[i - 1] !== undefined) {
                        this.notifyItems[i - 1].setItem(user, lastText);
                    }
                }
            }

            // if (countNotify - 1 > this.maxItem) {
            //     for (var i = countNotify - 1; i > this.maxItem; i--) {
            //         this.notifyItems[i - 1].node.active = false;
            //     }
            // }

            //13 > 10
            //i = 13; i > 10
            //i = 13,12,11
            if (this.maxItem > (countNotify - 1)) {
                for (var i = this.maxItem; i > 0; i--) {
                    if (i > (countNotify - 1)) {
                        this.notifyItems[i - 1].node.active = false;
                    } else {
                        this.notifyItems[i - 1].node.active = true;
                    }
                }
            }


            var self = this;

            setTimeout(function() {
                self.nodeContent.x = self.rootX;

                var distance = self.rootDistance + self.nodeContent.width;
                var duration = (self.baseDuration / self.rootDistance) * distance;

                self.action = cc.moveTo(duration, cc.v2(-distance, self.rootY));
                self.nodeContent.runAction(self.action);
                cc.director.getScheduler().schedule(self.getNotify, self, duration, 0, 0, false);
            }, 100);


        },
    });
}).call(this);
