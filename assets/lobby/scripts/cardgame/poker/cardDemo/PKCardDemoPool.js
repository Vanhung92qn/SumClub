/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKCardDemoPool = cc.Class({
        "extends": cc.CardDemoPool,
        properties: {

        },

        onLoad: function () {
            this.createNodePool();
            cc.PKController.getInstance().setCardDemoPool(this);
        },
    });
}).call(this);
