/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.Seven77BetlinesView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeLines: [cc.Node],
            //lbTotalLines: cc.Label,
            colorSelect: cc.Color,
            colorDeSelect: cc.Color,
        },

        onLoad: function () {
            cc.Seven77BetLinesController.getInstance().setSeven77BetLinesView(this);
            this.totalLines = 20;

            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            this.disableAllLines();

            var betLinesText = cc.Seven77SpinController.getInstance().getBetLinesText();
            var betLines = betLinesText.split(',');

            var self = this;
            //bat lai cac lines dang chon
            betLines.forEach(function (line) {
                self.nodeLines[line - 1].opacity = 255;
            });

            //this.lbTotalLines.string = cc.Seven77SpinController.getInstance().getTotalLines();
            this.animation.play('openPopup');

        },

        disableAllLines: function () {
            var self = this;
            //tat het cac lines
            this.nodeLines.forEach(function (nodeLine) {
                nodeLine.opacity = 0;
            });
        },

        selectLineClicked: function (event, data) {
            var index = parseInt(data.toString());

            // if (this.nodeLines[index].color._val === this.colorSelect._val) {
            //     this.nodeLines[index].color = this.colorDeSelect;
            // } else {
            //     this.nodeLines[index].color = this.colorSelect;
            // }

            if (this.nodeLines[index].opacity === 255) {
                this.nodeLines[index].opacity = 0;
            } else {
                this.nodeLines[index].opacity = 255;
            }

            var betLinesText = '';
            index = 1;
            var i = 1;
            this.nodeLines.forEach(function (nodeLine) {
                //node nao bat -> bet line
                if (nodeLine.opacity > 0) {
                    betLinesText = betLinesText + i + ',';
                    index++;
                }
                i++;
            });

            cc.Seven77SpinController.getInstance().updateTotalLines(index - 1);
            //this.lbTotalLines.string = index - 1;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.Seven77SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        selectEvenClicked: function () {
            this.disableAllLines();
            var betLinesText = '';
            var index = 1;
            //bat cac line chan
            for (var i = 1; i <= this.totalLines; i++) {
                if (i % 2 === 0) {
                    this.nodeLines[i - 1].opacity = 255;
                    betLinesText = betLinesText + i + ',';
                    index++;
                }
            }

            cc.Seven77SpinController.getInstance().updateTotalLines(index - 1);
            //this.lbTotalLines.string = index - 1;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.Seven77SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        selectOddClicked: function () {
            this.disableAllLines();
            var betLinesText = '';
            var index = 1;
            //bat cac line le
            for (var i = 1; i <= this.totalLines; i++) {
                if (i % 2 !== 0) {
                    this.nodeLines[i - 1].opacity = 255;
                    betLinesText = betLinesText + i + ',';
                    index++;
                }
            }

            cc.Seven77SpinController.getInstance().updateTotalLines(index - 1);
            //this.lbTotalLines.string = index - 1;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.Seven77SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        selectNoneClicked: function () {
            this.disableAllLines();
            this.nodeLines[0].opacity = 255;
            var betLinesText = '1';
            //this.lbTotalLines.string = 1;
            cc.Seven77SpinController.getInstance().updateTotalLines(1);
            cc.Seven77SpinController.getInstance().updateBetLinesText(betLinesText);
        },

        selectAllClicked: function () {
            var betLinesText = '';
            //bat tat ca line
            for (var i = 1; i <= this.totalLines; i++) {
                this.nodeLines[i - 1].opacity = 255;
                betLinesText = betLinesText + i + ',';
            }

            cc.Seven77SpinController.getInstance().updateTotalLines(this.totalLines);
            //this.lbTotalLines.string = this.totalLines;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.Seven77SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        closeClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.Seven77PopupController.getInstance().destroyBetLinesView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
