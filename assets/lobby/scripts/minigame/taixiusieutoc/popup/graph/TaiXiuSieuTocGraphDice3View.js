/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuSieuTocGraphDice3View = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeGraphics1: cc.Node,
            nodeGraphics2: cc.Node,
            nodeGraphics3: cc.Node,
            nodeDice1Temp: cc.Node,
            nodeDice2Temp: cc.Node,
			nodeDice3Temp: cc.Node,
            toggleDice1: cc.Toggle,
            toggleDice2: cc.Toggle,
            toggleDice3: cc.Toggle,

            colorDice1: cc.Color,
            colorDice2: cc.Color,
            colorDice3: cc.Color,
			spriteDice: [cc.SpriteFrame],
        },

        onLoad: function () {
            this.rootPosX = 0; //toa do goc
            this.rootPosY = -90; //toa do goc
            this.spaceX = 47;
            this.spaceY = 37;

            this.maxItemPerCol = 5;

            this.minSum = 1;
            this.maxSum = 6;

            this.circleRadian = 8;

            var lineWidth = 2;

            this.spacePoint = (this.spaceY * this.maxItemPerCol) / (this.maxSum - this.minSum);

            this.drawing1 = this.nodeGraphics1.getComponent(cc.Graphics);
            this.drawing1.lineWidth = lineWidth;
            this.drawing1.strokeColor = this.colorDice1;
            this.drawing1.fillColor = this.colorDice1;

            this.drawing2 = this.nodeGraphics2.getComponent(cc.Graphics);
            this.drawing2.lineWidth = lineWidth;
            this.drawing2.strokeColor = this.colorDice2;
            this.drawing2.fillColor = this.colorDice2;

            this.drawing3 = this.nodeGraphics3.getComponent(cc.Graphics);
            this.drawing3.lineWidth = lineWidth;
            this.drawing3.strokeColor = this.colorDice3;
            this.drawing3.fillColor = this.colorDice3;
        },

        draw: function (list) {
            this.cacheList = list;

            this.drawDice1(list);
            this.drawDice2(list);
            this.drawDice3(list);
        },

        drawDice1: function (list) {
            var self = this;
            self.drawPoints = [];
            var index = 0;

            list.forEach(function (item) {
                self.createNode(self.drawing1, item.FirstDice, index);
                index++;
            });	
            this.strokeLine(self.drawing1);
        },

        drawDice2: function (list) {
            var self = this;
            self.drawPoints = [];
            var index = 0;

            list.forEach(function (item) {
                self.createNode(self.drawing2, item.SecondDice, index);
                index++;
            });

            self.strokeLine(self.drawing2);
        },

        drawDice3: function (list) {
            var self = this;
            self.drawPoints = [];
            var index = 0;

            list.forEach(function (item) {
                self.createNode(self.drawing3, item.ThirdDice, index);
                index++;
            });

            self.strokeLine(self.drawing3);
        },

        createNode: function (drawing, dice, colIndex) {
            //toa do X
            var posX = this.rootPosX - (colIndex * this.spaceX);
            //toa do Y
            var posY = this.rootPosY + (dice - this.minSum) * this.spacePoint;

            //di chuyen den doan goc
            if (colIndex === 0) {
                drawing.moveTo(posX, posY);
            }

            this.drawPoints.push(cc.v2(posX, posY));
        },

        strokeLine: function (drawing) {
            var self = this;
            var index = 0;
            this.drawPoints.forEach(function (point) {
                drawing.lineTo(point.x, point.y);
                drawing.stroke();
                drawing.moveTo(point.x, point.y);
                drawing.circle(point.x, point.y, self.circleRadian);
                drawing.fill();
                index++;
            });
        },

        resetDraw: function () {
            this.drawing1.clear();
            this.drawing2.clear();
            this.drawing3.clear();
        },

        toggleDrawDice1Clicked: function () {
            if (!this.toggleDice1.isChecked) {
                this.drawing1.clear();
            } else {
                this.drawDice1(this.cacheList);
            }
        },

        toggleDrawDice2Clicked: function () {
            if (!this.toggleDice2.isChecked) {
                this.drawing2.clear();
            } else {
                this.drawDice2(this.cacheList);
            }
        },

        toggleDrawDice3Clicked: function () {
            if (!this.toggleDice3.isChecked) {
                this.drawing3.clear();
            } else {
                this.drawDice3(this.cacheList);
            }
        },
    });
}).call(this);
