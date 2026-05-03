/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.PKChipItem = cc.Class({
        "extends": cc.CChipItem,
        properties: {

        },

        setChip: function (amount) {
            var index = 0;
            if (amount >= 1000000) {
                index = 6;
            } else if (amount >= 500000) {
                index = 5;
            } else if (amount >= 100000) {
                index = 4;
            } else if (amount >= 50000) {
                index = 3;
            } else if (amount >= 10000) {
                index = 2;
            } else if (amount >= 5000) {
                index = 1;
            }

            this.spriteChip.spriteFrame = cc.PKController.getInstance().getAssets().sfChips[index];
        },


        // moveToEndFinished: function (node) {
        //     // node.stopAllActions();
        //     cc.PKController.getInstance().putToPool(node);
        // }
    });
}).call(this);
