/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.PKCardFoldDemoItem = cc.Class({
        "extends": cc.CardFoldDemoItem,
        properties: {

        },

        moveFinished: function (node) {
            node.opacity = 0;
            cc.PKController.getInstance().getCardFoldDemoPool().putToPool(node);
        },
    });
}).call(this);
