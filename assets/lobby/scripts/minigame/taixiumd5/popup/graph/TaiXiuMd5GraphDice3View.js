/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuMd5GraphDice3View = cc.Class({
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

            this.drawing1 = this._initDrawing(this.nodeGraphics1, this.colorDice1, lineWidth);
        },

        _initDrawing: function (node, color, lineWidth) {
            if (!node) return null;
            var g = node.getComponent(cc.Graphics);
            if (!g) return null;
            g.lineWidth = lineWidth;
            g.strokeColor = color;
            g.fillColor = color;
            return g;
        },

        draw: function (list) {
            this.cacheList = list;
            if (!this.drawing1 || !list) return;

            //clear toan bo line + dots
            this.drawing1.clear();
            if (this.nodeGraphics1) this.nodeGraphics1.removeAllChildren();

            //ve 3 line tren CUNG 1 cc.Graphics, doi color giua moi line
            if (this._toggleOn(this.toggleDice1)) {
                this._drawLine(list, 'FirstDice', this.colorDice1, this._sf(0));
            }
            if (this._toggleOn(this.toggleDice2)) {
                this._drawLine(list, 'SecondDice', this.colorDice2, this._sf(1));
            }
            if (this._toggleOn(this.toggleDice3)) {
                this._drawLine(list, 'ThirdDice', this.colorDice3, this._sf(2));
            }
        },

        _toggleOn: function (toggle) {
            return !toggle || toggle.isChecked;
        },

        _drawLine: function (list, key, color, spriteFrame) {
            var d = this.drawing1;
            if (!d) return;
            d.strokeColor = color;
            d.fillColor = color;

            var self = this;
            list.forEach(function (item, idx) {
                var dice = item[key];
                var posX = self.rootPosX - (idx * self.spaceX);
                var posY = self.rootPosY + (dice - self.minSum) * self.spacePoint;

                if (idx === 0) {
                    d.moveTo(posX, posY);
                } else {
                    d.lineTo(posX, posY);
                    d.stroke();
                    d.moveTo(posX, posY);
                }

                if (spriteFrame && self.nodeGraphics1) {
                    self._spawnDot(self.nodeGraphics1, spriteFrame, cc.v2(posX, posY));
                } else {
                    d.circle(posX, posY, self.circleRadian);
                    d.fill();
                }
            });
        },

        _sf: function (idx) {
            return (this.spriteDice && this.spriteDice[idx]) ? this.spriteDice[idx] : null;
        },

        _spawnDot: function (parent, spriteFrame, pos) {
            var node = new cc.Node();
            var sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = spriteFrame;
            node.setPosition(pos);
            parent.addChild(node);
        },

        resetDraw: function () {
            if (this.drawing1) this.drawing1.clear();
            if (this.nodeGraphics1) this.nodeGraphics1.removeAllChildren();
        },

        toggleDrawDice1Clicked: function () {
            this.draw(this.cacheList);
        },

        toggleDrawDice2Clicked: function () {
            this.draw(this.cacheList);
        },

        toggleDrawDice3Clicked: function () {
            this.draw(this.cacheList);
        },
    });
}).call(this);
