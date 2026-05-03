
(function () {
    cc.SicBoGraph100View = cc.Class({
        extends: cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeTaiTemp: cc.Node,
            nodeXiuTemp: cc.Node,
            nodeBaoTemp: cc.Node,
            nodeParents: [cc.Node],
            sfTaiXiu: [cc.SpriteFrame],
            sfBao: [cc.SpriteFrame],
        },

        draw: function (list) {
            // console.log('list3', list)
            var countTai = 0;
            var self = this;

            this.indexNoteParent = 0;
            var indexItem = 0;
            list.forEach(function (item) {
                var betSide = self.getBetSide(item);

                self.createNode(betSide, item);

                indexItem++;

                if (indexItem % 20 == 0) {
                    self.indexNoteParent++;
                }
            });

            this.nodeParents[0].getChildren()[0].getChildByName('glow').active = true;
            // console.log(this.nodeParents[0].getChildren()[0].getChildByName('glow'));
            // this.nodeParents[0].getChildren()[0].sprite.active = true;
            return countTai;
        },

        createNode: function (betSide, item) {
            var nodeView;

            if (betSide === cc.SicBoBetSide.TAI) {
                nodeView = cc.instantiate(this.nodeTaiTemp);
            } else if (betSide === cc.SicBoBetSide.XIU) {
                nodeView = cc.instantiate(this.nodeXiuTemp);
            } else {
                nodeView = cc.instantiate(this.nodeBaoTemp);
            }

            var diceSum = item.FirstDice + item.SecondDice + item.ThirdDice;

            if (item.FirstDice == item.SecondDice && item.FirstDice == item.ThirdDice) {
                nodeView.getChildByName('dot').getComponent(cc.Sprite).spriteFrame = this.sfBao[diceSum / 3 - 1];
            }
            else {
                nodeView.getChildByName('dot').getComponent(cc.Sprite).spriteFrame = this.sfTaiXiu[diceSum - 3];
            }

            nodeView.parent = this.nodeParents[this.indexNoteParent];

            // cc.tween(nodeView)
                // .to(0, { scale: .8 })
                // .start();
        },

        resetDraw: function () {
            // xóa tất cả các nút con
            this.nodeParents.forEach(function (nodeParent) {

                nodeParent.removeAllChildren();
            });
        },

        getBetSide: function (item) {
            var diceSum = item.FirstDice + item.SecondDice + item.ThirdDice;

            if (item.FirstDice == item.SecondDice && item.FirstDice == item.ThirdDice) {
                return cc.SicBoBetSide.BAO;
            } else if (diceSum > 10) {
                return cc.SicBoBetSide.TAI;
            } else {
                return cc.SicBoBetSide.XIU;
            }
        }
    });
}).call(this);

