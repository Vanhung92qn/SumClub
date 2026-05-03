/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.SelectBetlinesView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeLines: [cc.Node],
            lbTotalLines: cc.Label,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.totalLines = this.nodeLines.length;
        },

        onEnable: function () {
            if (this.animation) {
                this.animation.play('openPopup');
            }

            this.disableAllLines();

            var betLinesText = cc.SpinController.getInstance().getBetLinesText();
            var betLines = betLinesText.split(',');

            var self = this;
            //bat lai cac lines dang chon
            betLines.forEach(function (line) {
                if (line !== '') {
                    self.nodeLines[line - 1].active = true;
                }
            });

            if (this.lbTotalLines)
                this.lbTotalLines.string = cc.SpinController.getInstance().getTotalLines();
        },

        disableAllLines: function () {
            //tat het cac lines
            this.nodeLines.forEach(function (nodeLine) {
                nodeLine.active = false;
            });
        },

        selectLineClicked: function (event, data) {
            var index = parseInt(data.toString());

            this.nodeLines[index].active = !this.nodeLines[index].active;

            var betLinesText = '';
            index = 1;
            var i = 1;
            this.nodeLines.forEach(function (nodeLine) {
                //node nao bat -> bet line
                if (nodeLine.active) {
                    betLinesText = betLinesText + i + ',';
                    index++;
                }
                i++;
            });

            cc.SpinController.getInstance().updateTotalLines(index - 1);

            if (this.lbTotalLines)
                this.lbTotalLines.string = index - 1;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        selectEvenClicked: function () {
            this.disableAllLines();
            var betLinesText = '';
            var index = 1;
            //bat cac line chan
            for (var i = 1; i <= this.totalLines; i++) {
                if (i % 2 === 0) {
                    this.nodeLines[i - 1].active = true;
                    betLinesText = betLinesText + i + ',';
                    index++;
                }
            }

            cc.SpinController.getInstance().updateTotalLines(index - 1);

            if (this.lbTotalLines)
                this.lbTotalLines.string = index - 1;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        selectOddClicked: function () {
            this.disableAllLines();
            var betLinesText = '';
            var index = 1;
            //bat cac line le
            for (var i = 1; i <= this.totalLines; i++) {
                if (i % 2 !== 0) {
                    this.nodeLines[i - 1].active = true;
                    betLinesText = betLinesText + i + ',';
                    index++;
                }
            }

            cc.SpinController.getInstance().updateTotalLines(index - 1);

            if (this.lbTotalLines)
                this.lbTotalLines.string = index - 1;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        selectNoneClicked: function () {
            this.disableAllLines();
            this.nodeLines[0].active = true;
            var betLinesText = '1';

            if (this.lbTotalLines)
                this.lbTotalLines.string = 1;

            cc.SpinController.getInstance().updateTotalLines(1);
            cc.SpinController.getInstance().updateBetLinesText(betLinesText);
        },

        selectAllClicked: function () {
            var betLinesText = '';
            //bat tat ca line
            for (var i = 1; i <= this.totalLines; i++) {
                this.nodeLines[i - 1].active = true;
                betLinesText = betLinesText + i + ',';
            }

            cc.SpinController.getInstance().updateTotalLines(this.totalLines);

            if (this.lbTotalLines)
                this.lbTotalLines.string = this.totalLines;

            //cat ky tu o cuoi
            var betLinesTextTrim = betLinesText.substring(0, betLinesText.length - 1);
            //set bet lines text
            cc.SpinController.getInstance().updateBetLinesText(betLinesTextTrim);
        },

        closeClicked: function () {
            if (this.animation) {
                this.animation.play('closePopup');
                var self = this;
                var delay = 0.12;
                cc.director.getScheduler().schedule(function () {
                    self.animation.stop();
                    cc.MainController.getInstance().destroyBetLinesView();
                }, this, 1, 0, delay, false);
            } else {
                cc.MainController.getInstance().destroyBetLinesView();
            }
        },
    });
}).call(this);
