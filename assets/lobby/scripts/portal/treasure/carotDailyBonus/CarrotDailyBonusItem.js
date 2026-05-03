/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.CarrotDailyBonusItem = cc.Class({
        "extends": cc.Component,
        properties: {
            skeletonEffect: sp.Skeleton,

            spriteBG: cc.Sprite,
            spriteBGVP: cc.Sprite,
            spriteCarrot: cc.Sprite,

            lbVP: cc.Label,
            lbDay: cc.Label,
            lbCarrot: cc.Label,
        },

        onLoad: function() {
            this.button = this.node.getComponent(cc.Button);
            this.images = cc.CarrotDailyBonusController.getInstance().getCarrotDailyBonusImage();
        },

        updateItem: function(item) {
            this.item = item;

            var carrot = item.CarrotValue;
            switch (item.Status.toString()) {
                case cc.CarrotDailyBonusStatus.ALLOW: //duoc chon
                    this.spriteBG.spriteFrame = this.images.sfBgDailyBonus[1];
                    this.spriteBGVP.spriteFrame = this.images.sfBGVPs[0];
                    this.spriteCarrot.spriteFrame = this.images.sfCarrots[carrot - 1];
                    this.button.interactable = true;
                    this.skeletonEffect.node.active = true;
                    this.skeletonEffect.clearTracks();
                    this.skeletonEffect.setToSetupPose();
                    this.skeletonEffect.setAnimation(0, 'animation', true);

                    break;
                case cc.CarrotDailyBonusStatus.ALLOWED: //da chon
                    this.spriteBG.spriteFrame = this.images.sfBgDailyBonus[2];
                    this.spriteBGVP.spriteFrame = this.images.sfBGVPs[1];
                    this.spriteCarrot.spriteFrame = this.images.sfCarrots[4];
                    this.button.interactable = false;
                    this.skeletonEffect.node.active = false;

                    break;
                case cc.CarrotDailyBonusStatus.NOT_ALLOWED: //ko duoc phep chon
                    this.spriteBG.spriteFrame = this.images.sfBgDailyBonus[0];
                    this.spriteBGVP.spriteFrame = this.images.sfBGVPs[0];
                    this.spriteCarrot.spriteFrame = this.images.sfCarrots[carrot - 1];
                    this.button.interactable = false;
                    this.skeletonEffect.node.active = false;

                    break;
            }


            this.lbVP.string = item.ThresholdVP + 'VP';
            this.lbDay.string = item.DayInWeek;
            this.lbCarrot.string = 'X' + carrot;
        },

        onTreasureCarrotDailyResponse: function(response) {
            cc.PopupController.getInstance().showMessage('Nhận thành công.');
            cc.CarrotDailyBonusController.getInstance().refreshDailyBonus();
            cc.TreasureController.getInstance().refreshPortalTreasureInfo();
            cc.TreasureController.getInstance().setIsDailyBonus(true); //TRUE = da nhan
            cc.TreasureController.getInstance().checkPlayFxDailyBonus();
            cc.TreasureController.getInstance().updateCarrot(response.Carrot);

            cc.DDNA.getInstance().logEventTreasureDailyBonus(this.item.CarrotValue, cc.DDNARewardType.CARROT);
        },
        
        getCarrotClicked: function () {
            cc.PopupController.getInstance().showBusy();
            var treasureCarrotDailyCommand = new cc.TreasureCarrotDailyCommand;
            treasureCarrotDailyCommand.execute(this);
        }
    });
}).call(this);
