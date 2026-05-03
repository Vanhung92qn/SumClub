/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.SicBoGraphDiceSumView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeGraphics: cc.Node,
            nodeParent: cc.Node,
            nodeTaiTemp: cc.Node,
            nodeXiuTemp: cc.Node,
            nodeBaoTemp: cc.Node,
            lbSessionID: cc.Label,
            lbResult: cc.Label,
            sfTaiXiu: [cc.SpriteFrame],
            sfBao: [cc.SpriteFrame],
        },

        onLoad: function () {
            this.rootPosX = 15; //toa do goc
            this.rootPosY = -77; //toa do goc
            this.spaceX = 53.5;
            this.spaceY = 33;
            this.maxItemPerCol = 5;
            this.minSum = 3;
            this.maxSum = 18;
            this.spacePoint = (this.spaceY * this.maxItemPerCol) / (this.maxSum - this.minSum);
            this.drawing = this.nodeGraphics.getComponent(cc.Graphics);
            this.drawing.lineWidth = 2;
            this.drawing.strokeColor = cc.Color.YELLOW;
        },

        draw: function (list) {
            var lastItem = list[0];
            var diceSum = lastItem.FirstDice + lastItem.SecondDice + lastItem.ThirdDice;
            var result = diceSum > 10 ? 'TÀI' : 'XỈU';

            if (lastItem.FirstDice == lastItem.SecondDice && lastItem.FirstDice == lastItem.ThirdDice) {
                result = 'BÃO';
            }

            this.lbSessionID.string = 'Phiên gần nhất: #' + lastItem.SessionID + '';
            this.lbResult.string = result + ' (' + lastItem.FirstDice + '-' + lastItem.SecondDice + '-' + lastItem.ThirdDice + ')';

            this.cacheList = list;

            this.drawPoints = [];

            var self = this;
            var index = 0;
            list.forEach(function (item) {
                if (index < 21) {
                    self.createNode(item, index);
                }
                index++;
            });

            this.strokeLine();

            this.nodeParent.getChildren()[0].getChildByName('glow').active = true
        },

        createNode: function (item, colIndex) {
            var diceSum = item.FirstDice + item.SecondDice + item.ThirdDice;
            //toa do X
            var posX = this.rootPosX - (colIndex * this.spaceX);
            //toa do Y
            var posY = this.rootPosY + (diceSum - this.minSum) * this.spacePoint;

            //di chuyen den doan goc
            if (colIndex === 0) {
                this.drawing.moveTo(posX, posY);
            }

            var nodeView;
            if (item.FirstDice == item.SecondDice && item.FirstDice == item.ThirdDice) {
                nodeView = cc.instantiate(this.nodeBaoTemp);
            }
            else if (item.diceSum > 10) {
                nodeView = cc.instantiate(this.nodeTaiTemp);
            } else {
                nodeView = cc.instantiate(this.nodeXiuTemp);
            }
            nodeView.parent = this.nodeParent;
            nodeView.position = cc.v2(posX, posY);

            this.drawPoints.push(cc.v2(posX, posY));

            if (item.FirstDice == item.SecondDice && item.FirstDice == item.ThirdDice) {
                nodeView.getChildByName('dot').getComponent(cc.Sprite).spriteFrame = this.sfBao[diceSum / 3 - 1];
            }
            else {
                nodeView.getChildByName('dot').getComponent(cc.Sprite).spriteFrame = this.sfTaiXiu[diceSum - 3];
            }
        },


        strokeLine: function () {
            var self = this;
            this.drawPoints.forEach(function (point) {
                self.drawing.lineTo(point.x, point.y);
                self.drawing.stroke();
                self.drawing.moveTo(point.x, point.y);
                self.drawing.lineWidth = 4;
            });
        },

        resetDraw: function () {
            //xoa cac node con
            var children = this.nodeParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParent.removeChild(children[i]);
            }
            this.drawing.clear();
        },
    });
}).call(this);
