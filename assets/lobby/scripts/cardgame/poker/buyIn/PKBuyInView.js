/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKBuyInView = cc.Class({
        "extends": cc.BuyInView,
        properties: {

        },

        onLoad: function () {
            this.minBetFactor = 20; //hệ số min
            this.maxBetFactor = 500; //hệ số max
            this.isPlayNow = false;

            cc.PKController.getInstance().setPKBuyInView(this);
        },

        confirmBuyInClicked: function () {
            if (this.isPlayNow) {
                cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_NOW, this.roomVal, this.roundVal, this.toggleAutoBuyIn.isChecked);
            } else {
                cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.BUY_IN, this.roomVal, this.roundVal, this.toggleAutoBuyIn.isChecked);
            }
        },
    });
}).call(this);
