/**
 * XX Trend Grid View - Bang Soi Cau (Chan vs Le) - LUOI CO DINH 4x8 = 32 o.
 *
 * Pattern: SNAKE (con ran)
 *   - Newest van o COT BEN PHAI NHAT, hang TREN CUNG
 *   - Order so cua van (1=newest):
 *       col 1 (rightmost): top->bottom = 1, 2, 3, 4
 *       col 2: bottom->top = 5, 6, 7, 8 (dao chieu)
 *       col 3: top->bottom = 9..12
 *       col 4: bottom->top = 13..16
 *       ...
 *       col 8 (leftmost):  bottom->top = 29, 30, 31, 32 (oldest)
 *
 * Server gui game history qua event 'gameHistory' (list of Result values 0-4):
 *   0 = EVEN_FOUR_DOWN (Chan)
 *   1 = ODD_THREE_DOWN (Le)
 *   2 = EVEN          (Chan)
 *   3 = ODD_THREE_UP  (Le)
 *   4 = EVEN_FOUR_UP  (Chan)
 *
 * Inspector setup:
 *   - lbChan / lbLe: 2 Label hien tong so van Chan / Le (count TOAN BO history)
 *   - nodeGrid: cha cua cac dot (just static node, KHONG can ScrollView)
 *   - nodeChanTemp / nodeLeTemp: 2 node template - active=false, OUTSIDE nodeGrid
 *   - maxRows / maxCols / spaceX / spaceY: chinh layout (default 4x8, 36px)
 */
(function () {
    cc.XXTrendGridView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbChan: cc.Label,
            lbLe: cc.Label,

            nodeGrid: {
                default: null,
                type: cc.Node,
                tooltip: 'Cha cua cac dot - just static node, anchor (0,1) top-left.'
            },
            nodeChanTemp: {
                default: null,
                type: cc.Node,
                tooltip: 'Node template cho dot Chan (do). Set active=false trong editor, OUTSIDE nodeGrid.'
            },
            nodeLeTemp: {
                default: null,
                type: cc.Node,
                tooltip: 'Node template cho dot Le (trang vien xanh). Set active=false, OUTSIDE nodeGrid.'
            },

            maxRows: {
                default: 4,
                type: cc.Integer,
                tooltip: 'So hang (4 theo design)'
            },
            maxCols: {
                default: 8,
                type: cc.Integer,
                tooltip: 'So cot (8 theo design). Total = maxRows * maxCols = 32 o.'
            },
            spaceX: {
                default: 36,
                type: cc.Float,
                tooltip: 'Khoang cach giua 2 cot (px)'
            },
            spaceY: {
                default: 36,
                type: cc.Float,
                tooltip: 'Khoang cach giua 2 hang (px). Y am vi cot di tu tren xuong duoi.'
            }
        },

        onLoad: function () {
            if (cc.XXController.getInstance().setXXTrendGridView) {
                cc.XXController.getInstance().setXXTrendGridView(this);
            }
        },

        // Result 0/2/4 -> Chan, 1/3 -> Le
        isEven: function (r) {
            return r === 0 || r === 2 || r === 4;
        },

        // list = array of int Result (theo thu tu thoi gian, item moi nhat o CUOI list)
        draw: function (list) {
            if (!list || list.length === 0) {
                this.resetDraw();
                if (this.lbChan) this.lbChan.string = '0';
                if (this.lbLe) this.lbLe.string = '0';
                return;
            }

            this.resetDraw();

            // Snake pattern: lay 32 van moi nhat, reverse de [0] = newest
            var total = this.maxRows * this.maxCols;
            var recent = list.slice(-total).reverse(); // recent[0] = newest

            // Count Chan/Le trong 32 van hien thi (chan + le = recent.length, max 32)
            var chan = 0, le = 0;
            var self = this;
            recent.forEach(function (item) {
                if (self.isEven(item)) chan++; else le++;
            });
            if (this.lbChan) this.lbChan.string = chan;
            if (this.lbLe) this.lbLe.string = le;

            for (var i = 0; i < recent.length; i++) {
                var col = Math.floor(i / this.maxRows);  // 0..maxCols-1 (0 = newest column)
                var idxInCol = i % this.maxRows;

                // Snake direction: cot CHAN (0, 2, 4, 6) di top->bottom
                //                  cot LE (1, 3, 5, 7) di bottom->top
                var row;
                if (col % 2 === 0) {
                    row = idxInCol;                       // top to bottom
                } else {
                    row = this.maxRows - 1 - idxInCol;    // bottom to top
                }

                // Display X: cot 0 (newest) o BEN PHAI -> X cao nhat
                var displayCol = (this.maxCols - 1) - col;
                this._createDot(recent[i], displayCol, row);
            }
        },

        _createDot: function (item, col, row) {
            var template = this.isEven(item) ? this.nodeChanTemp : this.nodeLeTemp;
            if (!template || !this.nodeGrid) return;

            var node = cc.instantiate(template);
            node.parent = this.nodeGrid;
            node.active = true;
            node.x = col * this.spaceX;
            node.y = -row * this.spaceY;
        },

        resetDraw: function () {
            if (!this.nodeGrid) return;
            var children = this.nodeGrid.children.slice(); // copy de tranh modify-while-iterate
            for (var i = 0; i < children.length; i++) {
                children[i].destroy();
            }
        }
    });
}).call(this);
