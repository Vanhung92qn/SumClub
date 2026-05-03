/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.DragonTigerGraph100View = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeRongTemp: cc.Node,
            nodeHoaTemp: cc.Node,
            nodeHoTemp: cc.Node,
        },

        draw: function (list) {
            var countRong = 0;
            var countHoa = 0;
            var countHo = 0;
            var self = this;
            list.forEach(function (item) {
                switch (item.Result) {
                    case cc.DragonTigerBetSide.RONG:
                        countRong++;
                        self.createNode(self.nodeRongTemp);
                        break;
                    case cc.DragonTigerBetSide.HOA:
                        countHoa++;
                        self.createNode(self.nodeHoaTemp);
                        break;
                    case cc.DragonTigerBetSide.HO:
                        countHo++;
                        self.createNode(self.nodeHoTemp);
                        break;
                }
            });
            let listCount = {rong: countRong, hoa: countHoa, ho: countHo};
            return listCount;
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
