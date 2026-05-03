/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.KBView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            //list nguoi choi trong TOP
            eventListView: cc.KBListView,
            //phan thuong hien tai cua user
            lbReward: cc.Label,
            lbBom: cc.Label,
            lbRank: cc.Label,

            //menu chon ngay thang
            menuDateView: cc.KBMenuDateView,
            //menu chon time
            menuTimeView: cc.KBMenuTimeView,

            //ngay thang + day dang chon
            lbDateValue: cc.Label,
            //Time dang chon
            lbTimeValue: cc.Label,

            //animation menu
            animationMenuDate: cc.Animation,
            animationMenuTime: cc.Animation,
        },

        onLoad: function () {
            this.isShowSelectBox = false;
            this.isShowSelectBoxTime = false;
            // this.eventListView.resetList();
        },

        onEnable: function () {
            //reset scale
            this.animationMenuDate.node.scaleY = 0;
            this.animationMenuTime.node.scaleY = 0;

            //khoi tao -> truyen controler sang menu
            this.menuDateView.init(this.node);
            this.menuTimeView.init(this.node);

            this.btnRule.interactable = true;
            this.btnTop.interactable = false;

            this.nodeRule.active = false;
            this.nodeTop.active = true;

            this.cordType = 1;
            this.recallCode = 1;

            if (this.lbDateValue.string !== '') {
                // this.getKBRanking();
            }
        },

        onDisable: function () {
            this.eventListView.resetList();
        },

        //set gia tri ngay dang chon vao label
        setLBTime: function (timeId, time) {
            this.timeId = timeId;
            this.lbTimeValue.string = time;
        },

        //set gia tri ngay dang chon vao label
        setLBDate: function (timeId, date) {
            this.lbDateValue.string = date;
        },

        getKBRanking: function () {
            if ( cc.EventController.getInstance().showEventBusy()) {
                this.eventListView.resetList();
                var getKBRankingCommand = new cc.GetKBRankingCommand;
                getKBRankingCommand.execute(this);
            }
        },

        onGetKBRankingResponse: function (response) {
            cc.EventController.getInstance().hideEventBusy();
            //co ket qua -> kiem tra xem con dang bat cua so Event ko
            if (this.lbReward) {
                var list = response.LstTop;

                this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);
                this.lbRank.string = response.Position;
                this.lbBom.string = response.TotalBoom;

                if (list && list.length > 0) {
                    this.eventListView.initialize(list);
                }
            }
        },

        selectDateValueEvent: function (event, data) {
            this.lbDateValue.string = data.toString();
            this.animationMenuDate.play('hideDropdownMenu');

            this.isShowSelectBox = false;

            this.getKBRanking();
        },

        selectTimeValueEvent: function (event, data) {
            this.timeId = event.target.name;
            this.lbTimeValue.string = data.toString();
            this.animationMenuTime.play('hideDropdownMenu');

            this.isShowSelectBoxTime = false;

            this.getKBRanking();
        },

        openMenuDateClicked: function () {
            if (!this.isShowSelectBox) {
                this.isShowSelectBox = true;
                this.animationMenuDate.play('showDropdownMenu');
            } else {
                this.isShowSelectBox = false;
                this.animationMenuDate.play('hideDropdownMenu');
            }
        },

        closeMenuDateClicked: function () {
            this.animationMenuDate.play('hideDropdownMenu');
            this.isShowSelectBox = false;
        },

        openMenuTimeClicked: function () {
            if (!this.isShowSelectBoxTime) {
                this.isShowSelectBoxTime = true;
                this.animationMenuTime.play('showDropdownMenu');
            } else {
                this.isShowSelectBoxTime = false;
                this.animationMenuTime.play('hideDropdownMenu');
            }
        },

        closeMenuTimeClicked: function () {
            this.animationMenuTime.play('hideDropdownMenu');
            this.isShowSelectBoxTime = false;
        },
    });
}).call(this);
