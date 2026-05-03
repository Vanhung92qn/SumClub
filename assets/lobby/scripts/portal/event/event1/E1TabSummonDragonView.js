/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.E1TabSummonDragonView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            //list nguoi choi trong TOP
            eventListView: cc.EventSummonDragonListView,
            //phan thuong hien tai cua user
            lbReward: cc.Label,
            lbCordCount: cc.Label,
            lbRank: cc.Label,



            //menu chon ngay thang
            menuDateView: cc.E1TabSummonDragonMenuDateView,
            //ngay thang + day dang chon
            lbCordValue: cc.Label,
            lbDateValue: cc.Label,
            //animation menu
            animationMenuCord: cc.Animation,
            animationMenuDate: cc.Animation,
        },

        onEnable: function () {
            //reset scale
            this.animationMenuCord.node.scaleY = 0;
            this.animationMenuDate.node.scaleY = 0;

            //khoi tao -> truyen controler sang menu
            this.menuDateView.init(this.node);

            this.btnRule.interactable = false;
            this.btnTop.interactable = true;

            this.nodeRule.active = true;
            this.nodeTop.active = false;

            this.cordType = 1;
            this.recallCode = 1;         
        },

        onDisable: function () {
            this.eventListView.resetList();
        },

        //set gia tri day dang chon vao label
        setLBCord: function (value) {
            this.cordType = value;
            this.lbCordValue.string = value === cc.CordType.WIN ? cc.CordName.WIN : cc.CordName.LOSE;
        },

        //set gia tri ngay dang chon vao label
        setLBDate: function (value) {
            this.lbDateValue.string = value;
        },

        getEventHonors: function () {
            if ( cc.EventController.getInstance().showEventBusy()) {
                this.eventListView.resetList();
                var txGetEventHonorsCommand = new cc.TXGetEventHonorsCommand;
                txGetEventHonorsCommand.execute(this);
            }
        },

        onTXGetEventHonorsResponse: function (response) {
            cc.EventController.getInstance().hideEventBusy();
            //co ket qua -> kiem tra xem con dang bat cua so Event ko
            if (this.lbCordCount) {
                var list = response.LstEventHonors;

                this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);

                this.lbCordCount.string = response.CountCord;
                this.lbRank.string = response.TopNo === 0 ? '0' : response.TopNo;

                if (list !== null && list.length > 0) {
                    this.eventListView.initialize(list);
                }
            }
        },

        selectCordValueEvent: function (event, data) {
            this.recallCode = 1;
            this.setLBCord(data.toString());
            this.animationMenuCord.play('hideDropdownMenu');
            this.menuDateView.updateList(data.toString());

        },

        selectDateValueEvent: function (event, data) {
            this.recallCode = event.target.name;
            this.lbDateValue.string = data.toString();
            this.animationMenuDate.play('hideDropdownMenu');

            var self = this;
                var delay = 0.2;
                cc.director.getScheduler().schedule(function () {
                    self.getEventHonors();
                }, this, 1, 0, delay, false);
        },

        openMenuCordClicked: function () {
            this.animationMenuCord.play('showDropdownMenu');
        },

        openMenuDateClicked: function () {
            this.animationMenuDate.play('showDropdownMenu');
            this.animationMenuCord.play('hideDropdownMenu');
        },

        closeMenuCordClicked: function () {
            this.animationMenuCord.play('hideDropdownMenu');
        },

        closeMenuDateClicked: function () {
            this.animationMenuDate.play('hideDropdownMenu');
        },

        openTopTab: function () {
            this._super();
            var self = this;
                var delay = 0.2;
                cc.director.getScheduler().schedule(function () {
                    self.getEventHonors();
                }, this, 1, 0, delay, false);
        }
    });
}).call(this);
