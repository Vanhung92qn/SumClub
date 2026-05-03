/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKChipPool = cc.Class({
        "extends": cc.CChipPool,
        properties: {
            parentChip: cc.Node,
        },

        onLoad: function () {
            this.createNodePool();
            cc.PKController.getInstance().setPKChipPool(this);
        },

        createChipMoveTo: function (amount, start, end, time) {
            var self = this;
            var node = this.createChip();
            node.parent = this.parentChip;
            var item = node.getComponent(cc.PKChipItem);
            //set mau chip
            item.setChip(amount);
            //set vi tri bat dau
            item.setPosition(start);
            //di chuyen
            item.moveTo(end, time);
            //putToPool sau 300ms
            setTimeout(function () {
                self.putToPool(node);
            }, time * 1000);
        },
    });
}).call(this);
