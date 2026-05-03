/**
 * Created by Nofear on 3/15/2019.
 */
//Fix and edit by @TrungMTA - Zgameteam

(function () {
    cc.SicBoHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
			nodeBg: cc.Node,
            lbSession: cc.Label,
            lbTime: cc.Label,
            lbResult: cc.Label,
            lbBet: cc.Label,
            lbWin: cc.Label,
            lbNhan: cc.Label,
            lbAmount: cc.Label,
            lbResultTemp: cc.Node,
            nodeDonResultTemp: cc.Node,
            nodeCapResultTemp: cc.Node,
            nodeBaoResultTemp: cc.Node,
            spDice: [cc.SpriteFrame],
            nodeResult: cc.Node,
        },

        updateItem: function (item, itemID) {
			this.nodeBg.active = itemID % 2 !== 0;
            this.lbBet.string = this.nFormatter(item.Bet);
            this.lbWin.string = this.nFormatter(item.Award > 0 ? item.Award : item.Bet);
            var color = cc.Color.BLACK;
            color.fromHEX("#FFFF33");
            if (item.Award > 0) {
                color.fromHEX('#5CFF00');
				this.lbNhan.string = "+" + this.nFormatter(item.Award > 0 ? item.Award : item.Bet);
            } else {
                color.fromHEX('#E61C0E');
				this.lbNhan.string = "-" + this.nFormatter(item.Award > 0 ? item.Award : item.Bet);
            }

            this.lbWin.node.color = color;
            this.lbAmount.string = this.nFormatter(item.Bet);
            this.lbNhan.node.color = color;
            this.item = item;
            this.itemID = itemID;

            var gateId = item.GateID;
            if (cc.SicBoGateTai <= gateId && gateId <= cc.SicBoGateLe) {
                this.createNodeLabel(cc.SicBoGateDislay[gateId]);
            }
            else if (gateId == cc.SicBoGateBaoRandom) {
                this.createNodeLabel(cc.SicBoGateDislay[gateId]);
            }
            else if (cc.SicBoGateDoi['1'] <= gateId && gateId <= cc.SicBoGateDoi['6']) {
                this.createNodeCap([cc.SicBoGateDislay[gateId], cc.SicBoGateDislay[gateId]]);
            }
            else if (cc.SicBoGateBao['1'] <= gateId && gateId <= cc.SicBoGateBao['6']) {
                this.createNodeBao(cc.SicBoGateDislay[gateId]);
            }
            else if (cc.SicBoGateCap['12'] <= gateId && gateId <= cc.SicBoGateCap['56']) {
                this.createNodeCap(cc.SicBoGateDislay[gateId]);
            }
            else if (cc.SicBoGateTong['4'] <= gateId && gateId <= cc.SicBoGateTong['17']) {
                this.createNodeLabel('Tổng ' + cc.SicBoGateDislay[gateId]);
            }
            else if (cc.SicBoGateDon['1'] <= gateId && gateId <= cc.SicBoGateDon['6']) {
                this.createNodeDon(cc.SicBoGateDislay[gateId]);
            }
        },

        createNodeLabel: function (msg) {
            var lbResult = cc.instantiate(this.lbResultTemp);
            lbResult.parent = this.nodeResult;
            lbResult.getComponent(cc.Label).string = msg;
        },

        createNodeCap: function (msg) {
            var node = cc.instantiate(this.nodeCapResultTemp);
            node.parent = this.nodeResult;

            node.getChildren()[0].getComponent(cc.Sprite).spriteFrame = this.spDice[msg[0] - 1];
            node.getChildren()[1].getComponent(cc.Sprite).spriteFrame = this.spDice[msg[1] - 1];
        },

        createNodeBao: function (msg) {
            var node = cc.instantiate(this.nodeBaoResultTemp);
            node.parent = this.nodeResult;

            node.getChildren()[0].getComponent(cc.Sprite).spriteFrame = this.spDice[msg - 1];
            node.getChildren()[1].getComponent(cc.Sprite).spriteFrame = this.spDice[msg - 1];
            node.getChildren()[2].getComponent(cc.Sprite).spriteFrame = this.spDice[msg - 1];
        },

        createNodeDon: function (msg) {
            var node = cc.instantiate(this.nodeDonResultTemp);
            node.parent = this.nodeResult;

            node.getChildren()[0].getComponent(cc.Sprite).spriteFrame = this.spDice[msg - 1];
        },

        nFormatter: function (num, digits) {
            if (!digits) {
                digits = 2;
            }

            const lookup = [
                { value: 1, symbol: "" },
                { value: 1e3, symbol: "K" },
                { value: 1e6, symbol: "M" },
                { value: 1e9, symbol: "G" },
                { value: 1e12, symbol: "T" },
                { value: 1e15, symbol: "P" },
                { value: 1e18, symbol: "E" }
            ];
            const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var item = lookup.slice().reverse().find(function (item) {
                return num >= item.value;
            });
            return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
        },
    });
}).call(this);
