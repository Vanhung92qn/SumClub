(function () {
    cc.LodeTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            topListView: cc.LodeTopListView,
            animListOpenDate: cc.Animation,
            itemOpenDate: cc.Prefab,
            layoutOpenDate: cc.Node,
            lbCurrentOpenDate: cc.Label
        },

        onLoad: function () {
            cc.LodePopupController.getInstance().setTopView(this);
            this.animation = this.node.getComponent(cc.Animation);
            this.node.parent = cc.find('Canvas');
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            this.initListOpenDate();
            let self = this;
            let delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                let currOpenDate = new Date(cc.LodeController.getInstance().getOpenDate());
                currOpenDate.setDate(currOpenDate.getDate() - 1);
                self.getTopSessionWinners(`${currOpenDate.getMonth() + 1}-${currOpenDate.getDate()}-${currOpenDate.getFullYear()}`);
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },
        initListOpenDate: function () {
            const currOpenDate = cc.LodeController.getInstance().getOpenDate();
            this.lbCurrentOpenDate.string = cc.Tool.getInstance().formatDate(cc.LodeController.getInstance().getCurrentDateResult());
            this.layoutOpenDate.removeAllChildren();
            // let dateBefore = currOpenDate;
            for (let i = 0; i < 7; i++) {
                let dateBefore = new Date(currOpenDate);
                dateBefore.setDate(dateBefore.getDate() - i);
                let itemOpenDateUI = cc.instantiate(this.itemOpenDate);
                let item = itemOpenDateUI.getComponent('ItemOpenDate');
                let strOpenDate = cc.Tool.getInstance().formatDate(dateBefore);
                let dateValue = `${dateBefore.getMonth() + 1}-${dateBefore.getDate()}-${dateBefore.getFullYear()}`;
                item.setValueOpenDate({strOpenDate, dateValue});
                itemOpenDateUI.parent = this.layoutOpenDate;
            }

        },
        getTopOnOpenDate: function (openDate, strDateUI) {
            this.lbCurrentOpenDate.string = strDateUI;
            this.getTopSessionWinners(openDate);
            this.hideListOpenDate();
        },
        openListOpenDate: function () {
            this.animListOpenDate.play('showDropdownMenu');
        },

        hideListOpenDate: function () {
            this.animListOpenDate.play('hideDropdownMenu');
        },
        getTopSessionWinners: function (openDate) {
            let getBigWinnersCommand = new cc.LodeWinnerCommand;
            getBigWinnersCommand.execute(this, openDate);
        },

        onGetBigWinnerResponse: function (response) {
            var list = response;
            try {
                this.topListView.resetList();
            }catch (e) {

            }
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.topListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.topListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LodePopupController.getInstance().destroyTopView();
                this.node.removeFromParent();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
