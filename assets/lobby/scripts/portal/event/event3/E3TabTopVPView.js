/**
 * Created by Welcome on 4/18/2019.
 */


(function () {
    cc.E3TabTopVPView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            eventWeekListView: cc.EventTopVPWeekListView,

            //phan thuong hien tai cua user
            lbReward: cc.Label,
            lbVP: cc.Label,
            lbRank: cc.Label,


            //menu chon ngay thang
            menuDateView: cc.E3TabTopVPMenuWeekView,
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

            // var self = this;
            // var delay = 0.2;
            // cc.director.getScheduler().schedule(function () {
            //     self.getEventSearchBox();
            // }, this, 1, 0, delay, false);

        },

        onDisable: function () {
            this.eventWeekListView.resetList();
        },

        setSearchList: function (list) {
            this.searchList = list;
        },

        //set gia tri day dang chon vao label
        setLBTop: function (index) {
            this.lbTop.string = this.searchList[index].WeekName;
            this.weekID = this.searchList[index].WeekID;
        },

        getEventTopVP: function () {
            if ( cc.EventController.getInstance().showEventBusy()) {
                    var getEventTopVP3Command = new cc.GetEventTopVP3Command;
                getEventTopVP3Command.execute(this);
            }
        },

        onGetEventTopVP3Response: function (response) {
            cc.EventController.getInstance().hideEventBusy();

            this.eventWeekListView.resetList();
            this.lbReward.string = '0';
            this.lbRank.string = '0';

            if (response.LstHonors.length === 0) return;

            var list = response.LstHonors;

            if (response.PrizeValue  && response.PrizeValue > 0) {
                this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);
            }

            if (response.Position  && response.Position > 0) {
                this.lbRank.string = response.Position;
            } 

            this.eventWeekListView.initialize(list);
        },

        selectTopValueEvent: function (event, data) {
            // this.recallCode = event.target.name;

            this.setLBTop(parseInt(data.toString()));

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
