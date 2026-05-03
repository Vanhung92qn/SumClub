/**
 * Created by Welcome on 4/18/2019.
 */


(function () {
    cc.E2TabTopVPView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            eventListView: cc.EventTopVPListView2,
            eventDayListView: cc.EventTopVPDayListView2,

            //phan thuong hien tai cua user
            lbReward: cc.Label,
            lbVP: cc.Label,
            lbRank: cc.Label,


            //menu chon ngay thang
            menuDateView: cc.E2TabTopVPMenuDateView,
            //label loai xep hang
            lbTop: cc.Label,
            //animation menu
            animationMenuTop: cc.Animation,
        },

        onLoad: function () {
            this.isShowSelectBox = false;
        },

        onEnable: function () {
            //reset scale
            this.animationMenuTop.node.scaleY = 0;

            //khoi tao -> truyen controler sang menu
            this.menuDateView.init(this.node);

            this.btnRule.interactable = true;
            this.btnTop.interactable = false;

            this.nodeRule.active = false;
            this.nodeTop.active = true;

            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                //self.getEventSearchBox();
            }, this, 1, 0, delay, false);

        },

        onDisable: function () {
            this.eventListView.resetList();
            this.eventDayListView.resetList();
        },

        //set gia tri day dang chon vao label
        setLBTop: function (value) {
            if (value.includes('Tháng')) {
                this.topType = 2; //Top tháng
            } else {
                this.topType = 1; //Top ngày
            }
            this.lbTop.string = value;
            this.dateAward = value;

        },

        getEventTopVP: function () {
            if ( cc.EventController.getInstance().showEventBusy()) {
                var getEventTopVP2Command = new cc.GetEventTopVP2Command;
                getEventTopVP2Command.execute(this);
            }
        },

        onGetEventTopVP2Response: function (response) {
            cc.EventController.getInstance().hideEventBusy();

            if (this.topType === 2) {
                this.eventListView.node.parent.active = true;
                this.eventDayListView.node.parent.active = false;
                this.eventListView.resetList();

            } else {
                this.eventListView.node.parent.active = false;
                this.eventDayListView.node.parent.active = true;
                this.eventDayListView.resetList();

            }
            if (response.LstTop.length === 0) return;

            var list = response.LstTop;

            // this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);

            if (response.UserNo) {
                this.lbRank.string = response.UserNo;
            } else if (response.UserPosition) {
                this.lbRank.string = response.UserPosition;
            } else {
                this.lbRank.string = '0';
            }

            if (this.topType === 2) {
                if (list !== null && list.length > 0) {
                    this.eventListView.initialize(list);
                }
            } else {
                if (list !== null && list.length > 0) {
                    this.eventDayListView.initialize(list);
                }
            }

        },

        selectTopValueEvent: function (event, data) {
            // this.recallCode = event.target.name;

            this.setLBTop(data.toString());

            this.animationMenuTop.play('hideDropdownMenu');
            this.isShowSelectBox = false;

            this.getEventTopVP();
        },

        openMenuTopClicked: function () {
            if (!this.isShowSelectBox) {
                this.isShowSelectBox = true;
                this.animationMenuTop.play('showDropdownMenu');
            } else {
                this.isShowSelectBox = false;
                this.animationMenuTop.play('hideDropdownMenu');
            }

        },

        closeMenuTopClicked: function () {
            this.animationMenuTop.play('hideDropdownMenu');
            this.isShowSelectBox = false;
        },
    });
}).call(this);
