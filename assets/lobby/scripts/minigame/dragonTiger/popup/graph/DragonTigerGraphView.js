/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.DragonTigerGraphView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            dragonTigerGraph100View: cc.DragonTigerGraph100View,
            dragonTigerGraphCatCauView: cc.DragonTigerGraphCatCauView,
            dragonTigerGraphCardSumView: cc.DragonTigerGraphDiceSumView,
            dragonTigerGraphCard3View: cc.DragonTigerGraphCard3View,

            pageView: cc.PageView,
            btnNext: cc.Button,
            btnBack: cc.Button,

            lbTotalRong: cc.Label,
            lbTotalHoa: cc.Label,
            lbTotalHo: cc.Label
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.timeSwitchPage = 0.3;
            this.totalPages = 2;
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            this.checkStatusButton();
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getSoiCau();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

            //set tam du lieu de demo
        },

        getSoiCau: function () {
            var dragonTigerGetSoiCauCommand = new cc.DragonTigerGetSoiCauCommand;
            dragonTigerGetSoiCauCommand.execute(this)
        },

        onDragonTigerGetSoiCauResponse: function (list) {
            /*
            {
                "SessionId": 173183,
                "FirstDice": 4,
                "SecondDice": 2,
                "ThirdDice": 4,
                "DiceSum": 10,
                "BetSide": 1,
                "CreatedDate": "2019-04-04T07:10:44.94"
              }
            * */
            var listCount = this.dragonTigerGraph100View.draw(list);
            this.lbTotalRong.string = listCount.rong;
            this.lbTotalHoa.string = listCount.hoa;
            this.lbTotalHo.string = listCount.ho;
            this.dragonTigerGraphCatCauView.draw(list);

            // this.dragonTigerGraphCardSumView.draw(list);
            this.dragonTigerGraphCard3View.draw(list);
        },

        pageEvent: function () {
            this.checkStatusButton();
        },

        closeClicked: function () {
            //reset truoc khi close cho ko lag
            this.dragonTigerGraph100View.resetDraw();
            this.dragonTigerGraphCatCauView.resetDraw();
            // this.dragonTigerGraphCardSumView.resetDraw();
            this.dragonTigerGraphCard3View.resetDraw();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.DragonTigerPopupController.getInstance().destroyGraphView();
            }, this, 1, 0, delay, false);
        },

        nextPageClicked: function() {
            this.currentPageIndex++;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

        backPageClicked: function() {
            this.currentPageIndex--;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

        checkStatusButton: function () {
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            if (this.currentPageIndex <  this.totalPages - 1) {
                this.btnNext.interactable = true;
            } else {
                this.btnNext.interactable = false;
            }

            if (this.currentPageIndex > 0) {
                this.btnBack.interactable = true;
            } else {
                this.btnBack.interactable = false;
            }
        },
    });
}).call(this);
