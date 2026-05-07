/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuMd5GraphDiceSumView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeGraphics: cc.Node,
            nodeParent: cc.Node,
            nodeTaiTemp: cc.Node,
            nodeXiuTemp: cc.Node,
            toggleDiceSum: cc.Toggle,
            lbSessionID: cc.Label,
            lbResult: cc.Label,
			sfTaiXiu: [cc.SpriteFrame],
        },

        onLoad: function () {
            this.rootPosX = 0; //toa do goc
            this.rootPosY = -88; //toa do goc
            this.spaceX = 47;
            this.spaceY = 35;

            this.maxItemPerCol = 5;

            this.minSum = 3;
            this.maxSum = 18;

            this.spacePoint = (this.spaceY * this.maxItemPerCol) / (this.maxSum - this.minSum);

            if (this.nodeGraphics) {
                this.drawing = this.nodeGraphics.getComponent(cc.Graphics);
                if (this.drawing) {
                    this.drawing.lineWidth = 2;
                    this.drawing.strokeColor = cc.Color.YELLOW;
                }
            }
            if (!this.drawing) cc.warn('[Md5GraphDiceSum] nodeGraphics chua wire hoac thieu cc.Graphics');
        },

        draw: function (list) {
            if (!this.drawing) return;
            if (!list || !list.length) return;

            var lastItem = list[0];
            var result = lastItem.BetSide === cc.TaiXiuMd5BetSide.TAI ? 'TÀI' : 'XỈU';
            if (this.lbSessionID) this.lbSessionID.string = 'Phiên gần nhất: #' + lastItem.SessionId + '';
            if (this.lbResult) this.lbResult.string = result + ' ' + lastItem.DiceSum + ' (' + lastItem.FirstDice + '-' + lastItem.SecondDice + '-' + lastItem.ThirdDice + ')';

            this.cacheList = list;
            this.drawPoints = [];

            var self = this;
            list.forEach(function (item, idx) {
                self.createNode(item, idx);
            });

            this.strokeLine();
        },

        createNode: function (item, colIndex) {
            if (!this.drawing) return;
            //toa do X
            var posX = this.rootPosX - (colIndex * this.spaceX);
            //toa do Y
            var posY = this.rootPosY + (item.DiceSum - this.minSum) * this.spacePoint;

            //di chuyen den doan goc
            if (colIndex === 0) {
                this.drawing.moveTo(posX, posY);
            }

            //spawn node Tai/Xiu neu da wire template + parent
            if (this.nodeParent) {
                var template = (item.BetSide === cc.TaiXiuMd5BetSide.TAI) ? this.nodeTaiTemp : this.nodeXiuTemp;
                if (template) {
                    var nodeView = cc.instantiate(template);
                    nodeView.parent = this.nodeParent;
                    nodeView.position = cc.v2(posX, posY);
                    var sp = nodeView.getComponent(cc.Sprite);
                    if (sp && this.sfTaiXiu && this.sfTaiXiu[item.DiceSum - 3]) {
                        sp.spriteFrame = this.sfTaiXiu[item.DiceSum - 3];
                    }
                }
            }

            this.drawPoints.push(cc.v2(posX, posY));
        },

        strokeLine: function () {
            if (!this.drawing) return;
            var self = this;
            this.drawPoints.forEach(function (point) {
                self.drawing.lineTo(point.x, point.y);
                self.drawing.stroke();
                self.drawing.moveTo(point.x, point.y);
            });
        },

        resetDraw: function () {
            if (this.nodeParent) this.nodeParent.removeAllChildren();
            if (this.drawing) this.drawing.clear();
        },

        toggleDrawDiceSumClicked: function () {
            if (!this.toggleDiceSum.isChecked) {
                this.resetDraw();
            } else {
                this.draw(this.cacheList);
            }
        },
    });
}).call(this);
