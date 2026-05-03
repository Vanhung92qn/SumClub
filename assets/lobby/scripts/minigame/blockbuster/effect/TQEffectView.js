/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TQEffectView = cc.Class({
        "extends": cc.EffectViewBase,
        properties: {

        },

        onLoad: function () {
            cc.TQEffectController.getInstance().setTQEffectView(this);
        },

        //tiep tuc animation (truong hop an Jackpot. User phai touch moi tiep tuc animation)
        continueClicked: function () {
            this.stopEffect();
            //chay hieu ung win tung line
            cc.TQPayLinesController.getInstance().playEffect(this.prizeLines, 0);
        },
    });
}).call(this);
