/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuGraph100View = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeTaiTemp: cc.Node,
            nodeXiuTemp: cc.Node,
        },

        draw: function (list) {
            var countTai = 0;
            var self = this;
            list.forEach(function (item) {
                if (item.BetSide === cc.TaiXiuBetSide.TAI) {
                    countTai++;
                    self.createNode(self.nodeTaiTemp);
                } else {
                    self.createNode(self.nodeXiuTemp);
                }
            });
            return countTai;
        },

        createNode: function (nodeTemp) {
            var nodeView = cc.instantiate(nodeTemp);
            nodeView.parent = this.nodeParent;
        },

        resetDraw: function () {
            //xoa cac node con
            var children = this.nodeParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParent.removeChild(children[i]);
            }
        },
    });
}).call(this);
