/**
 * XX Trend Grid View - Bang Soi Cau don gian (Chan vs Le).
 * Pattern: cot doc 4 hang max, cung phia thi xep doc, doi phia thi sang cot moi.
 *
 * Server gui game history qua event 'gameHistory' (list of Result values 0-4):
 *   0 = EVEN_FOUR_DOWN (Chan)
 *   1 = ODD_THREE_DOWN (Le)
 *   2 = EVEN          (Chan)
 *   3 = ODD_THREE_UP  (Le)
 *   4 = EVEN_FOUR_UP  (Chan)
 *
 * Inspector setup:
 *   - lbChan / lbLe: 2 Label hien tong so van Chan / Le
 *   - nodeGrid: cha cua cac dot (co the la ScrollView Content)
 *   - nodeChanTemp / nodeLeTemp: 2 node template (mau cho dot Chan / Le)
 *     - Template nen active=false va NAM NGOAI nodeGrid de khong bi xoa khi resetDraw
 *   - maxRows / maxCols / spaceX / spaceY: chinh layout
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
                tooltip: 'Cha cua cac dot. Co the la ScrollView Content de scroll ngang khi co nhieu lich su.'
            },
            nodeChanTemp: {
                default: null,
                type: cc.Node,
                tooltip: 'Node template cho dot Chan (do). Set active=false trong editor.'
            },
            nodeLeTemp: {
                default: null,
                type: cc.Node,
                tooltip: 'Node template cho dot Le (trang vien xanh). Set active=false trong editor.'
            },

            maxRows: {
                default: 4,
                type: cc.Integer,
                tooltip: 'So hang toi da moi cot (4 theo design)'
            },
            spaceX: {
                default: 36,
                type: cc.Float,
                tooltip: 'Khoang cach giua 2 cot (px)'
            },
            spaceY: {
                default: 36,
                type: cc.Float,
                tooltip: 'Khoang cach giua 2 hang trong cung 1 cot (px). Y am vi cot di tu tren xuong duoi.'
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

        // list = array of int (Result values theo thu tu thoi gian, item moi nhat o cuoi)
        draw: function (list) {
            if (!list || list.length === 0) {
                this.resetDraw();
                if (this.lbChan) this.lbChan.string = '0';
                if (this.lbLe) this.lbLe.string = '0';
                return;
            }

            this.resetDraw();

            var chan = 0, le = 0;
            var matrix = [];
            var currentSide = null;
            var currentCol = [];
            var self = this;

            list.forEach(function (item) {
                var even = self.isEven(item);
                if (even) chan++; else le++;
                var side = even ? 'C' : 'L';

                if (currentCol.length >= self.maxRows) {
                    matrix.push(currentCol);
                    currentCol = [item];
                    currentSide = side;
                } else if (currentSide === null || currentSide === side) {
                    currentCol.push(item);
                    currentSide = side;
                } else {
                    matrix.push(currentCol);
                    currentCol = [item];
                    currentSide = side;
                }
            });
            if (currentCol.length > 0) matrix.push(currentCol);

            if (this.lbChan) this.lbChan.string = chan;
            if (this.lbLe) this.lbLe.string = le;

            for (var c = 0; c < matrix.length; c++) {
                var col = matrix[c];
                for (var r = 0; r < col.length; r++) {
                    this._createDot(col[r], c, r);
                }
            }

            // Auto scroll content to right (latest) neu nodeGrid co kich thuoc lon
            if (this.nodeGrid) {
                this.nodeGrid.width = Math.max((matrix.length + 1) * this.spaceX, this.nodeGrid.width);
                // Neu cha cua nodeGrid la ScrollView -> tu scroll toi cuoi
                var scrollView = this.nodeGrid.parent ? this.nodeGrid.parent.getComponent(cc.ScrollView) : null;
                if (scrollView) {
                    try { scrollView.scrollToRight(0.2); } catch (e) {}
                }
            }
        },

        _createDot: function (item, col, row) {
            var template = this.isEven(item) ? this.nodeChanTemp : this.nodeLeTemp;
            if (!template || !this.nodeGrid) return;

            var node = cc.instantiate(template);
            node.parent = this.nodeGrid;
            node.active = true;
            node.x = col * this.spaceX;
            node.y = -row * this.spaceY; // tu tren xuong duoi
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
