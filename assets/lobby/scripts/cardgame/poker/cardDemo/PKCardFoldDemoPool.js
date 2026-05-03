/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKCardFoldDemoPool = cc.Class({
        "extends": cc.CardFoldDemoPool,
        properties: {

        },

        onLoad: function () {
            this.createNodePool();
            cc.PKController.getInstance().setCardFoldDemoPool(this);
        },
    });
}).call(this);
