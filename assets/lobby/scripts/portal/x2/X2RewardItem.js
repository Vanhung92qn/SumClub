/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.X2RewardItem = cc.Class({
        "extends": cc.Component,
        properties: {
            x2RewardView: cc.X2RewardView,

            spriteIcon: cc.Sprite,
            spriteTreasure: cc.Sprite,
            spriteClaim: cc.Sprite,
            progressBar: cc.ProgressBar,
            btnClaim: cc.Button,

            lbTopUp: cc.Label,
            lbReward: cc.Label,
            lbProgress: cc.Label,

            lbRemaining: cc.Label,

            sfCards: [cc.SpriteFrame],
            sfMoMos: [cc.SpriteFrame],
            sfBanks: [cc.SpriteFrame],
            sfAgencys: [cc.SpriteFrame],

            sfTreasureOn: cc.SpriteFrame,
            sfTreasureOff: cc.SpriteFrame,

            sfReceiveOn: cc.SpriteFrame,
            sfReceiveOff: cc.SpriteFrame,
            sfReceived: cc.SpriteFrame,
        },

        onLoad: function () {
            this.lbRemaining.node.active = false;
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer >= this.updateInterval) {
                    if (this.timer > 0) {
                        this.lbRemaining.string = cc.Tool.getInstance().convertSecondToTimeWithDay(Math.round(this.timer));
                    } else {
                        this.timer = 0;
                        this.isTimer = false;
                        // this.lbRemaining.node.active = false;
                        this.controller.refreshX2Info();
                    }
                    this.updateTimer = 0;
                }
            }
        },

        startTimer: function (remaining) {
            console.log('remaining: ', remaining);
            this.timer = 0;
            this.updateTimer = 0;
            this.updateInterval = 1;

            this.timer = remaining;
            this.lbRemaining.string = cc.Tool.getInstance().convertSecondToTimeWithDay(Math.round(this.timer));

            this.isTimer = true;
            this.lbRemaining.node.active = true;
        },

        setIcon: function (item, active) {
            switch (item.RechargeType) {
                case cc.X2RewardType.CARD:
                    this.spriteIcon.spriteFrame = this.sfCards[active];
                    break;
                case cc.X2RewardType.MOMO:
                    this.spriteIcon.spriteFrame = this.sfMoMos[active];
                    break;
                case cc.X2RewardType.BANK:
                    this.spriteIcon.spriteFrame = this.sfBanks[active];
                    break;
                case cc.X2RewardType.AGENCY:
                    this.spriteIcon.spriteFrame = this.sfAgencys[active];
                    break;
            }
        },

        updateItem: function (controller, item) {
            this.controller = controller;
            this.item = item;

            switch (item.Status.toString()) {
                case cc.X2RewardStatus.EXPIRED:
                    this.btnClaim.interactable = false;
                    this.spriteTreasure.spriteFrame = this.sfTreasureOff;
                    this.spriteClaim.spriteFrame = this.sfReceiveOff;
                    this.setIcon(item, 1);
                    break;
                case cc.X2RewardStatus.DEFAULT:
                    this.btnClaim.interactable = false;
                    this.spriteTreasure.spriteFrame = this.sfTreasureOff;
                    this.spriteClaim.spriteFrame = this.sfReceiveOff;
                    this.setIcon(item, 1);
                    break;
                case cc.X2RewardStatus.ACTIVE:
                    this.btnClaim.interactable = false;
                    this.spriteTreasure.spriteFrame = this.sfTreasureOff;
                    this.spriteClaim.spriteFrame = this.sfReceiveOff;
                    this.setIcon(item, 0);

                    this.startTimer(item.RemainTime);

                    break;
                case cc.X2RewardStatus.WAITING_RECEIVE:
                    this.btnClaim.interactable = true;
                    this.spriteTreasure.spriteFrame = this.sfTreasureOn;
                    this.spriteClaim.spriteFrame = this.sfReceiveOn;
                    this.setIcon(item, 0);
                    break;
                case cc.X2RewardStatus.RECEIVED:
                    this.btnClaim.interactable = false;
                    this.spriteTreasure.spriteFrame = this.sfTreasureOn;
                    this.spriteClaim.spriteFrame = this.sfReceived;
                    this.setIcon(item, 0);
                    break;
            }

            this.lbTopUp.string = cc.Tool.getInstance().formatNumber(item.Amount);
            this.lbReward.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);

            this.lbProgress.string = item.Progress + '%';
            var progress = item.Progress / 100;
            console.log(progress);
            this.progressBar.progress = progress;

        },

        claimClicked: function () {
            this.x2RewardView.claimReward(this.item);
        },
    });
}).call(this);
