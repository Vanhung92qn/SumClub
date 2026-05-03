var slotsConfig = require('SlotsConfig');

(function () {
    cc.CBBonusGameMultiView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnPicks: [cc.Button],
            spriteResults: [cc.Sprite],
            sfMultipliers: [cc.SpriteFrame],
        },

        onEnable: function () {
            //start timer
            cc.BonusGameController.getInstance().startTimer();
            this.spriteResults.map((sprite) => sprite.node.active = false);
        },
        pickClicked: function (event, data) {
            //reset timer
            cc.BonusGameController.getInstance().resetTimer();

            //pick 1 phat -> khoa nut pick
            cc.BonusGameController.getInstance().activeButtonQuickPlay(false);

            //send request Hub
            this.position = parseInt(data.toString());

            //Kho ca cac cho pick khac
            this.btnPicks.forEach(function (btnPick, index) {
                btnPick.interactable = false;
                if (index != this.position) {
                }
            }, this);


            //
            // cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, 2, this.position);

            //Lay du lieu
            var bonusResponse = cc.BonusGameController.getInstance().getData();
            var multiplier = bonusResponse.Multiplier;
            var totalWin = cc.BonusGameController.getInstance().getTotalWin();
            totalWin *= multiplier;

            //update lai tong so tien thang UI
            cc.BonusGameController.getInstance().updateTotalWin(totalWin);

            //gan anh tuong ung giai thuong
            var sprite = this.spriteResults[this.position];
            sprite.spriteFrame = this.sfMultipliers[multiplier];
            sprite.node.active = true;

            cc.director.getScheduler().schedule(function () {
                cc.BonusGameController.getInstance().changeView(cc.BonusGameState.RESULT);
                cc.BonusGameController.getInstance().setData(null);
            }, this, 0, 0, slotsConfig.TIME_WAIT_MULTIPLIER, false);

            //Chuyen qua man ket qua
            //cc.BonusGameController.getInstance().changeView(cc.BonusGameState.MULTI);
        },
    });
}).call(this);
