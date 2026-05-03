/**
 * Created by Nofear on 3/15/2019.
 */

/**
    Draw tu phai qua trai
    Draw tu duoi len tren
 */


(function () {
    cc.DragonTigerGraphCatCauView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeRongTemp: cc.Node,
            nodeHoaTemp: cc.Node,
            nodeHoTemp: cc.Node
        },

        onLoad: function () {
            this.rootPosX = -21; //toa do goc
            this.rootPosY = -100; //toa do goc
            this.spaceX = 40;
            this.spaceY = 40;

            this.maxItemPerCol = 6;
        },

        convertToMatrix: function (list) {
            var self = this;
            //luu lai side dau tien
            var currentSide = list[0].Result;

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
                    currentSide = item.Result;
                } else if (item.Result === currentSide) {
                    //giong thi them vao
                    arrCols.push(item);
                } else {
                    //khac thi push vao matrix + reset cols
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //set lai currentSide
                    currentSide = item.Result;
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
            this.nodeParent.width = Math.max(matrix.length * 40, 242);
        },

        drawCol: function (cols, colIndex) {
            //vi tri X
            var posX = this.rootPosX - (colIndex * this.spaceX);
            //toa do Y bat dau ve
            var starY = (this.maxItemPerCol - cols.length) * this.spaceY + this.rootPosY;

            for (var i = 0; i < cols.length; i++) {
                this.createNode(cols[i], cc.v2(posX, starY + (this.spaceY * i)));
            }
        },

        createNode: function (item, pos) {
        	switch(item.Result) {
        		case cc.DragonTigerBetSide.RONG:
        			var nodeView = cc.instantiate(this.nodeRongTemp);
        			break;
    			case cc.DragonTigerBetSide.HOA:
	    			var nodeView = cc.instantiate(this.nodeHoaTemp);
	    			break;
    			case cc.DragonTigerBetSide.HO:
	    			var nodeView = cc.instantiate(this.nodeHoTemp);
	    			break;
        	}

            if (nodeView) {
                nodeView.parent = this.nodeParent;
                nodeView.position = pos;
            }

            // nodeView.getComponentInChildren(cc.Label).string = item.Result;
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
