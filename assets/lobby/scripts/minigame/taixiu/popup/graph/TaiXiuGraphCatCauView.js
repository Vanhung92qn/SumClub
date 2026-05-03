/**
 * Created by Nofear on 3/15/2019.
 */

/**
    Draw tu phai qua trai
    Draw tu duoi len tren
 */


(function () {
    cc.TaiXiuGraphCatCauView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeTaiTemp: cc.Node,
            nodeXiuTemp: cc.Node,

            sfTaiXiu: [cc.SpriteFrame],
        },

        onLoad: function () {
            this.rootPosX = -25; //toa do goc
            this.rootPosY = -65; //toa do goc
            this.spaceX = 47;
            this.spaceY = 33;

            this.maxItemPerCol = 5;
        },

        convertToMatrix: function (list) {
            var self = this;
            //luu lai side dau tien
            var currentSide = list[0].BetSide;

            var matrix = [];
            var arrCols = [];
            list.forEach(function (item) {
                if (arrCols.length === self.maxItemPerCol) {
                    //du 6 thi dua vao matrix + chuyen sang cot khac
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //push vao cols
                    arrCols.push(item);
                    //set lai currentSide
                    currentSide = item.BetSide;
                } else if (item.BetSide === currentSide) {
                    //giong thi them vao
                    arrCols.push(item);
                } else {
                    //khac thi push vao matrix + reset cols
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //set lai currentSide
                    currentSide = item.BetSide;
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
            for (var i = 0; i < matrix.length; i++) {
                this.drawCol(matrix[i], i);
            }
            this.nodeParent.width = Math.max(matrix.length * 20, 930);
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
            if (item.BetSide === cc.TaiXiuBetSide.TAI) {
                var nodeView = cc.instantiate(this.nodeTaiTemp);
            } else {
                nodeView = cc.instantiate(this.nodeXiuTemp);
            }
            nodeView.parent = this.nodeParent;
            nodeView.position = pos;
            nodeView.getComponent(cc.Sprite).spriteFrame = this.sfTaiXiu[item.DiceSum - 3];
            // nodeView.getComponentInChildren(cc.Label).string = item.DiceSum;
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
