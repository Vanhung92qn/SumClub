/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.DragonTigerGraphCard3View = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeGraphics1: cc.Node,
            nodeGraphics2: cc.Node,
            nodeGraphics3: cc.Node,

            toggleRong: cc.Toggle,
            toggleHo: cc.Toggle,
            // toggleTong: cc.Toggle,

            colorRong: cc.Color,
            colorHo: cc.Color,
            colorHoa: cc.Color,

            lbSessionID: cc.Label,
            lbResult: cc.Label,
        },

        onLoad: function () {
            this.rootPosX = -42; //toa do goc
            this.rootPosY = -240; //toa do goc


            this.spaceX = 40;
            this.spaceY = 40;

            this.listPosY = [];
            for(let i = 0; i<= 12; i++) {
                let y = this.rootPosY + i*this.spaceY;
                this.listPosY.push(y);
            }

            this.maxItemPerCol = 5;

            this.minSum = 1;
            this.maxSum = 13;

            this.circleRadian = 12;

            var lineWidth = 2;

            //this.spacePoint = (this.spaceY * this.maxItemPerCol) / (this.maxSum - this.minSum);

            this.drawing1 = this.nodeGraphics1.getComponent(cc.Graphics);
            this.drawing1.lineWidth = lineWidth;
            this.drawing1.strokeColor = this.colorRong;
            this.drawing1.fillColor = this.colorRong;

            this.drawing3 = this.nodeGraphics3.getComponent(cc.Graphics);
            this.drawing3.lineWidth = lineWidth;
            this.drawing3.strokeColor =  this.colorHo;
            this.drawing3.fillColor = this.colorHo;
        },

        draw: function (list) {
            let lastItem = list[0];
            let result = "";
            switch(lastItem.Result) {
                case cc.DragonTigerBetSide.RONG:
                    result =  'RỒNG';
                    break;
                case cc.DragonTigerBetSide.HOA:
                    this.lbResult.node.color = cc.Color.CYAN;
                    result =  'HÒA';
                    break;
                case cc.DragonTigerBetSide.HO:
                    this.lbResult.node.color = cc.Color.RED;
                    result =  'HỔ';
                    break;
            }
            this.lbSessionID.string = 'Phiên gần nhất (#' + lastItem.SessionID + ')';
            this.lbResult.string = result;

            this.cacheList = list;
            //map list
            this.drawRong(list);
            this.drawHo(list);
        },
        drawRong: function (list) {
            var self = this;
            self.drawPoints = [];
            var index = 0;

            list.forEach(function (item) {
                self.createNode(self.drawing1, item, index, cc.DragonTigerBetSide.RONG);
                index++;
            });

            this.strokeLine(self.drawing1);
        },
        drawHo: function (list) {
            var self = this;
            self.drawPoints = [];
            var index = 0;

            list.forEach(function (item) {
                self.createNode(self.drawing3, item, index, cc.DragonTigerBetSide.HO);
                index++;
            });

            self.strokeLine(self.drawing3);
        },
        createNode: function (drawing, item, colIndex, side) {
            //toa do X
            var posX =  this.rootPosX - (colIndex * this.spaceX) ;
            let color = this.colorRong;
            let valueCard = item.DragonCard;
            if(side == cc.DragonTigerBetSide.HO) {
                valueCard = item.TigerCard;
                color = this.colorHo;
            }
            if(item.Result == cc.DragonTigerBetSide.HOA) {
                color = this.colorHoa;
            }
            let convertToCard = parseInt(valueCard) % 13;
            convertToCard = (convertToCard == 0) ? 13 : convertToCard; // neu convertCard = 0 set convertCard = 13
            //toa do Y
            // var posY = this.rootPosY + (dice - this.minSum) * this.spacePoint;

            var posY =  this.listPosY[convertToCard - 1];
            //di chuyen den doan goc
            if (colIndex === 0) {
                //drawing.moveTo(posX, posY);
            }

            this.drawPoints.push([cc.v2(posX, posY), color]);
        },

        strokeLine: function (drawing) {
            var self = this;
            var index = 0;
            this.drawPoints.forEach(function (dtPoint) {
                let point = dtPoint[0];
                let color = dtPoint[1];
                drawing.lineTo(point.x, point.y);
                drawing.stroke();
                drawing.moveTo(point.x, point.y);
                drawing.circle(point.x, point.y, self.circleRadian);
                drawing.fillColor = color;
                drawing.strokeColor = color;
                drawing.fill();
                index++;
            });
        },

        resetDraw: function () {
            this.drawing1.clear();
            this.drawing3.clear();
        },

        toggleDrawClicked: function () {
            // if (!this.toggleTong.isChecked) {
            //     this.resetDraw();
            // } else {
            //     this.drawRong(this.cacheList);
            //     this.drawHo(this.cacheList);
            //     this.toggleRong.isChecked = true;
            //     this.toggleHo.isChecked = true;
            // }
        },

        toggleDrawRongClicked: function () {
            if (!this.toggleRong.isChecked) {
                this.drawing1.clear();
            } else {
                this.drawRong(this.cacheList);
            }
        },

        toggleDrawHoClicked: function () {
            if (!this.toggleHo.isChecked) {
                this.drawing3.clear();
            } else {
                this.drawHo(this.cacheList);
            }
        },
    });
}).call(this);
