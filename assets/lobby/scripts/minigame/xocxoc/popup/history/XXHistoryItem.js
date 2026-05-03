/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.XXHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbSession: cc.Label,
            lbTime: cc.Label,
            lbSide: cc.Label,
            lbResult: cc.Label,
            lbBet: cc.Label,
            lbWin: cc.Label,
        },

        updateItem: function (item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            this.lbSession.string = '#' + item.SessionID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateTime);
            let betSide = "";
            switch (parseInt(item.GateID)) {
                case cc.XXGate.ODD:
                    betSide = "LẺ";
                    break;
                case cc.XXGate.THREE_UP:
                    betSide = "LẺ (3 TRẮNG)";
                    break;
                case cc.XXGate.THREE_DOWN:
                    betSide = "LẺ (3 ĐEN)";
                    break;
                case cc.XXGate.EVEN:
                    betSide = "CHẴN";
                    break;
                case cc.XXGate.FOUR_UP:
                    betSide = "CHẴN (4 TRẮNG)";
                    break;
                case cc.XXGate.FOUR_DOWN:
                    betSide = "CHẴN (4 ĐEN)";
                    break;
            }
            this.lbSide.string = betSide;

            let result = "";
            let gateData = item.GatesData;
            if (gateData) {
                let listResult = [];
                let listGate = gateData.split(',');
                let mainGate = (listGate.includes(cc.XXGate.ODD+"")) ? "LẺ" : "CHẴN";
                if(listGate.length == 1) {
                    result = "CHẮN (2 ĐEN, 2 TRẮNG)";
                }else {
                    listGate.map(gate => {
                        let strGate = "";
                        switch (parseInt(gate)) {
                            case cc.XXGate.THREE_UP:
                                strGate = " (3 TRẮNG, 1 ĐEN)";
                                break;
                            case cc.XXGate.THREE_DOWN:
                                strGate = " (3 ĐEN, 1 TRẮNG)";
                                break;
                            case cc.XXGate.FOUR_UP:
                                strGate = " (4 TRẮNG)";
                                break;
                            case cc.XXGate.FOUR_DOWN:
                                strGate = " (4 ĐEN)";
                                break;
                        }
                        mainGate+=strGate;
                    });
                    result += mainGate;
                }


            }
            this.lbResult.string = result;
            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.Bet);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
