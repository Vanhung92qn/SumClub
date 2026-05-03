/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.BCCardItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteCard: cc.SpriteFrame
        },
        onOpenCard: function () {
            //let spriteCard = cc.BCController.getInstance().BCCardActionsView.nodeCards[this.cardValue];
            this.node.getComponent(cc.Sprite).spriteFrame = this.spriteCard;
        },

    });
}).call(this);
