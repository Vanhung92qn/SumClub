/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TopJackpotView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeButton100: cc.Node,
            nodeButton1000: cc.Node,
            nodeButton5000: cc.Node,
            nodeButton10000: cc.Node,

            topJackpotListView: cc.TopJackpotListView,
        },
		onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
			this.animation.play('fadeIn');
            this.currentRoom = 4;
            this.processValue();


            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getInfo();
            }, this, 1, 0, delay, false);

            cc.director.getScheduler().schedule(function () {
                self.getInfo();
            }, this, 60, cc.macro.REPEAT_FOREVER, 0, false);
        },

        onDisable: function () {
            this.topJackpotListView.resetList();
        },

        getInfo: function () {
            // var getUserJackpotInfoCommand = new cc.GetUserJackpotInfoCommand;
            // getUserJackpotInfoCommand.execute(this, -1);

            var getTopJackpotCommand = new cc.GetTopJackpotCommand;
            getTopJackpotCommand.execute(this, -1);
        },

        processValue: function () {
            this.nodeButton100.active = false;
            this.nodeButton1000.active = false;
            this.nodeButton5000.active = false;
            this.nodeButton10000.active = false;
            switch (this.currentRoom) {
                case 1:
                    this.nodeButton100.active = true;
                    break;
                case 2:
                    this.nodeButton1000.active = true;
                    break;
                case 3:
                    this.nodeButton5000.active = true;
                    break;
                case 4:
                    this.nodeButton10000.active = true;
                    break;
            }
        },

        onGetTopJackpotResponse: function (response) {
            this.responseList = response.list;
            this.createListByRoomId();
        },

        // onGetUserJackpotInfoResponse: function (response) {
        //     this.responseList = response.list;
        //     this.createListByRoomId();
        // },

        createListByRoomId: function () {
            var self = this;
            var listTemp = [];
            this.responseList.forEach(function (data) {
                if (data.RoomID === self.currentRoom && ("" + data.GameID) !== cc.GameId.THUONG_HAI
                        && ("" + data.GameID) !== cc.GameId.GAINHAY) { // tạm chưa show gái nhảy
                    listTemp.push(data);
                }
            });

            this.topJackpotListView.resetList();
            this.topJackpotListView.initialize(listTemp);
        },

        roomClicked: function (event, data) {
            this.currentRoom = parseInt(data.toString());
            this.processValue();
            this.createListByRoomId();
        }
    });
}).call(this);
