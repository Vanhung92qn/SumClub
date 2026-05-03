/**
 * Created by Nofear on 3/15/2019.
 */

//UI tổng chip bet trên bàn của player / tổng đặt
(function () {
    cc.CBet = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBet: cc.Node,
            lbChip: cc.Label,
            nodeChips: [cc.Node],
        },

        init: function () {
            var self = this;

            this.spriteChips = [];
            this.nodeChips.forEach(function (nodeChip) {
                self.spriteChips.push(nodeChip.getComponent(cc.Sprite));
            });

            this.maxChip = this.nodeChips.length; //so chip mo phong toi da
            this.chips = [100, 5000, 10000, 50000, 100000, 500000, 1000000];

            this.hideChipBet();
        },

        showChipBet: function (amount) {
            this.nodeBet.active = true;
            this.updateChipBet(amount);
        },

        hideChipBet: function () {
            this.nodeBet.active = false;
        },
        
        updateChipBet: function (amount) {
            // console.log('updateChipBet: ' + amount);
            //off het chip
            for (var i = 0; i < this.maxChip; i++) {
                this.nodeChips[i].active = false;
            }

            //gan chip dat
            this.lbChip.string = cc.Tool.getInstance().formatNumberKTX(amount);

            //active chip theo so tien bet
            for (var i = this.chips.length - 1; i >= 0 ; i--) {
                var chipValue = this.chips[i];
                // tim muc chip dat
                if (amount >= chipValue) {
                    var count = Math.min((amount / chipValue), this.maxChip);
                    for (var j = 0; j < count; j++) {
                        // console.log('updateChipBet: ', i, j);
                        this.nodeChips[j].active = true;
                        this.spriteChips[j].spriteFrame = cc.PKController.getInstance().getAssets().sfChips[i];
                    }
                    //tim duoc break luon
                    break;
                }
            }
        }
    });
}).call(this);
