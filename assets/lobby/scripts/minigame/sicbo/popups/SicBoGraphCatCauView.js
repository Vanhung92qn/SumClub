/**
 * Created by Nofear on 3/15/2019.
 */

/**
    Draw tu phai qua trai
    Draw tu duoi len tren
 */


(function () {
    cc.SicBoGraphCatCauView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeTaiTemp: cc.Node,
            nodeXiuTemp: cc.Node,
            nodeBaoTemp: cc.Node,

            sfTaiXiu: [cc.SpriteFrame],
            sfBao: [cc.SpriteFrame],
        },

        onLoad: function () {
            this.rootPosX = -25; //toa do goc
            this.rootPosY = -70; //toa do goc
            this.spaceX = 53.5;
            this.spaceY = 36;

            this.maxItemPerCol = 5;
        },

        convertToMatrix: function (list) {
            var self = this;
            //luu lai side dau tien
            var currentSide = this.getBetSide(list[0]);

            var matrix = [];
            var arrCols = [];
            list.forEach(function (item) {
                var betSide = self.getBetSide(item);
                if (arrCols.length === self.maxItemPerCol) {
                    //du 6 thi dua vao matrix + chuyen sang cot khac
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //push vao cols
                    arrCols.push(item);
                    //set lai currentSide
                    currentSide = betSide;
                } else if (betSide === currentSide) {
                    //giong thi them vao
                    arrCols.push(item);
                } else {
                    //khac thi push vao matrix + reset cols
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //set lai currentSide
                    currentSide = betSide;
                    //push vao cols
                    arrCols.push(item);
                }
            });

            //push arr cuoi vao matrix
            matrix.push(arrCols);

            return matrix;
        },

        draw: function (list) {
            var matrix = this.convertToMatrix(list);
            var length = matrix.length > 20 ? 20 : matrix.length;

            for (var i = 0; i < length; i++) {
                this.drawCol(matrix[i], i);
            }

            this.nodeParent.width = Math.max(length * 20, 1070);

            this.nodeParent.getChildren()[0].getChildByName('glow').active = true
        },

        drawCol: function (cols, colIndex) {
            //vi tri X
            var posX = this.rootPosX - (colIndex * this.spaceX);
            //toa do Y bat dau ve
            var starY = this.rootPosY + (this.maxItemPerCol - cols.length) * this.spaceY;

            for (var i = 0; i < cols.length; i++) {
                this.createNode(cols[i], cc.v2(posX, starY + (this.spaceY * i)));
            }
        },

        createNode: function (item, pos) {
            var betSide = this.getBetSide(item);
            var nodeView;
            if (betSide === cc.SicBoBetSide.TAI) {
                nodeView = cc.instantiate(this.nodeTaiTemp);
            } else if (betSide === cc.SicBoBetSide.XIU) {
                nodeView = cc.instantiate(this.nodeXiuTemp);
            } else {
                nodeView = cc.instantiate(this.nodeBaoTemp);
            }

            nodeView.parent = this.nodeParent;
            nodeView.position = pos;

            var diceSum = item.FirstDice + item.SecondDice + item.ThirdDice;

            if (item.FirstDice == item.SecondDice && item.FirstDice == item.ThirdDice) {
                nodeView.getChildByName('dot').getComponent(cc.Sprite).spriteFrame = this.sfBao[diceSum / 3 - 1];
            }
            else {
                nodeView.getChildByName('dot').getComponent(cc.Sprite).spriteFrame = this.sfTaiXiu[diceSum - 3];
            }
        },

        resetDraw: function () {
            //xoa cac node con
            var children = this.nodeParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParent.removeChild(children[i]);
            }
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
