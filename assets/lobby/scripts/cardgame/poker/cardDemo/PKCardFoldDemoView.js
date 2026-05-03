/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKCardFoldDemoView = cc.Class({
        "extends": cc.Component,
        properties: {
            cardTempEndPos: [cc.Node],
            nodeParentCardTemp: cc.Node,
        },

        onLoad: function () {
            this.cardDemoPool = cc.PKController.getInstance().getCardFoldDemoPool();
        },

        drawCardFoldDemo: function (startPos, index) {
            this.nodeDemo = this.cardDemoPool.createNode();
            this.nodeDemo.parent = this.nodeParentCardTemp;
            this.nodeDemo.position = startPos;
            this.nodeDemo.rotation = 0;
            this.nodeDemo.opacity = 255;
            this.nodeDemo.getComponent(cc.PKCardFoldDemoItem).moveTo(this.cardTempEndPos[index]);
        },

        removeCardFoldDemo: function () {
            this.cardDemoPool.putToPool(this.nodeDemo);
        },
    });
}).call(this);
