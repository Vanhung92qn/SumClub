/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.E1TabTopVPView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            eventListView: cc.EventTopVPListView,

            //phan thuong hien tai cua user
            lbReward: cc.Label,
            lbVP: cc.Label,
            lbRank: cc.Label,


            //menu chon ngay thang
            menuDateView: cc.E1TabTopVPMenuDateView,
            //label loai xep hang
            lbTop: cc.Label,
            //animation menu
            animationMenuTop: cc.Animation,
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
        },

        //set gia tri day dang chon vao label
        setLBTop: function (value) {
            if (value.includes('Tháng')) {
                this.topType = cc.TopType.MONTH;
            } else {
                this.topType = cc.TopType.DAY;
            }
            this.lbTop.string = value;
            this.dateAward = value;

        },

        getEventTopVP: function () {
            if ( cc.EventController.getInstance().showEventBusy()) {
                var getEventTopVPCommand = new cc.GetEventTopVPCommand;
                getEventTopVPCommand.execute(this);
            }
        },

        onGetEventTopVPResponse: function (response) {
            cc.EventController.getInstance().hideEventBusy();
            var list = response.LstQuayHonors;

            // this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);

            this.lbRank.string = response.UserPosition;

            this.eventListView.resetList();
            if (list !== null && list.length > 0) {
                this.eventListView.initialize(list);
            }
        },

        selectTopValueEvent: function (event, data) {
            // this.recallCode = event.target.name;

            this.setLBTop(data.toString());

            this.animationMenuTop.play('hideDropdownMenu');

            this.getEventTopVP();
        },

        openMenuTopClicked: function () {
            this.animationMenuTop.play('showDropdownMenu');
        },

        closeMenuTopClicked: function () {
            this.animationMenuTop.play('hideDropdownMenu');
        },
    });
}).call(this);
