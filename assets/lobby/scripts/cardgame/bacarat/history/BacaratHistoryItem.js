/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BacaratHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbSession: cc.Label,
            lbTime: cc.Label,
            lbSide: cc.Label,
            lbResult: cc.Label,
            lbBet: cc.Label,
            lbRefund: cc.Label,
            lbWin: cc.Label,
        },

        updateItem: function (item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            this.lbSession.string = '#' + item.SessionID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateTime);
            let betSide = "";
            switch (parseInt(item.BetGateID)) {
                case cc.BacaratBetSite.PLAYER_PAIR:
                    betSide = "P.Pair";
                    break;
                case cc.BacaratBetSite.PLAYER:
                    betSide = "Player";
                    break;
                case cc.BacaratBetSite.TIE:
                    betSide = "Tie";
                    break;
                case cc.BacaratBetSite.BANKER:
                    betSide = "Banker";
                    break;
                case cc.BacaratBetSite.BANKER_PAIR:
                    betSide = "B.Pair";
                    break;
            }
            this.lbSide.string = betSide;

            let result = [];

            if (item.GateData === '') {
                this.lbResult.string = '';
            } else {
                let lstGateData = item.GateData.split(',');
                lstGateData.map(gateData => {
                    switch (parseInt(gateData)) {
                        case cc.BacaratBetSite.PLAYER_PAIR:
                            result.push("P.Pair");
                            break;
                        case cc.BacaratBetSite.PLAYER:
                            result.push("Player");
                            break;
                        case cc.BacaratBetSite.TIE:
                            result.push("Tie");
                            break;
                        case cc.BacaratBetSite.BANKER:
                            result.push("Banker");
                            break;
                        case cc.BacaratBetSite.BANKER_PAIR:
                            result.push("B.Pair");
                            break;
                    }
                });
                let strResult = "";
                if(result.length > 1) {
                    strResult = result.join(', ');
                }  else {
                    strResult = result[0];
                }
                this.lbResult.string = strResult;
            }


            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.Bet);
            this.lbRefund.string = cc.Tool.getInstance().formatNumber(item.Refund);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
