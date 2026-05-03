/**
 * Created by Welcome on 4/18/2019.
 */


(function () {
    cc.TabTopVPView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            eventListView: cc.EventTopVPListView2,

            //phan thuong hien tai cua user
            lbRankDay: cc.Label,
            lbVP: cc.Label,
            lbRank: cc.Label,
            

            toggleChooseValue: cc.ToggleChooseValue, //tao list dropdown menu
            lbDateSelected: cc.Label,
            animationMenuDate: cc.Animation,

            dayEventListView: cc.EventTopVPDayListView2,
        },

        onLoad: function () {
            this.isShowSelectBox = false;
            //set ngay chon mac dinh
            this.dateSelected = cc.Tool.getInstance().getLocalDateNow();
            this.lbDateSelected.string = this.dateSelected;
            this.createDropDownMenu();
            this.isShowMenuDate = false;
        },

        onEnable: function () {
            //reset scale
            // this.animationMenuTop.node.scaleY = 0;

            //khoi tao -> truyen controler sang menu
            // this.menuDateView.init(this.node);

            this.btnRule.interactable = true;
            this.btnTop.interactable = false;

            this.nodeRule.active = false;
            this.nodeTop.active = true;

            this.weekID = 1;
            this.animationMenuDate.node.scaleY = 0;
            this.animationMenuDate.node.children[0].width = 0;
            this.animationMenuDate.node.children[0].height = 0;

            var self = this;
            cc.director.getScheduler().schedule(function () {
                self.getEventTopVP();
            }, this, 0, 0, 0.6, false);
        },

        onDisable: function () {
            this.eventListView.resetList();
            this.dayEventListView.resetList();
        },

        getEventTopVP: function () {
            if (cc.EventTopVpController.getInstance().showEventBusy()) {
                var getEventTopVPCommand = new cc.GetEventTopVPCommand;
                getEventTopVPCommand.execute(this);
            }
        },

        onGetEventTopVPResponse: function (response) {
            cc.EventTopVpController.getInstance().hideEventBusy();

            this.eventListView.resetList();
            this.dayEventListView.resetList();
            this.lbRank.string = '0';
            this.lbVP.string = '0';
            this.lbRankDay.string = '0';

            if (response === null || response === undefined || response.LstQuayHonors.length === 0) return;

            var list = response.LstQuayHonors;
            var listTopChang = [];
            var listTopNgay = [];

            for (var i = 0; i < list.length; i++) {
                if (list[i].Type === 1) {
                    listTopChang.push(list[i]);
                } else {
                    listTopNgay.push(list[i]);
                }
            }

            if (response.UserVP) {
                this.lbVP.string = cc.Tool.getInstance().formatNumber(response.UserVP);
            }
            
            if (response.UserPositionDaily) {
                if (response.UserPositionDaily <= 1000)
                    this.lbRankDay.string = cc.Tool.getInstance().formatNumber(response.UserPositionDaily) 
                        + "(" + cc.Tool.getInstance().formatNumber(response.UserVPDaily) + ")";
                else
                    this.lbRankDay.string = ">1000"
                        + "(" + cc.Tool.getInstance().formatNumber(response.UserVPDaily) + ")";
            }

            if (response.UserPosition) {
                if (response.UserPosition <= 1000)
                    this.lbRank.string = cc.Tool.getInstance().formatNumber(response.UserPosition);
                else
                    this.lbRank.string = ">1000";
            }
            
            this.eventListView.initialize(listTopChang);
            this.dayEventListView.initialize(listTopNgay);
        },


        //Tao list menu dropdown 7 ngay
        createDropDownMenu: function () {
            for (var i = 0; i < 7; i++) {
                this.toggleChooseValue.initializeToggleChooseValue(
                    this,
                    "TabTopVPView",
                    "selectDateValueEvent",
                    cc.Tool.getInstance().getLocalDateNow(i),
                    cc.Tool.getInstance().getLocalDateNow(i),
                );
            }
        },

        selectDateValueEvent: function (event, data) {
            this.dateSelected = data.toString();
            this.lbDateSelected.string = this.dateSelected;
            this.animationMenuDate.play('hideDropdownMenu');
            this.getEventTopVP();
        },

        openMenuDateClicked: function () {
            if (!this.isShowMenuDate) {
                this.animationMenuDate.play('showDropdownMenu');
                this.isShowMenuDate = true;
            } else {
                this.hideMenuDateClicked();
                this.isShowMenuDate = false;
            }
        },

        hideMenuDateClicked: function () {
            this.animationMenuDate.play('hideDropdownMenu');
            console.log('hideMenuDateClicked');
        },
        
    });
}).call(this);
