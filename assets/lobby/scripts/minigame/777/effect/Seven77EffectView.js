/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.Seven77EffectView = cc.Class({
        "extends": cc.EffectViewBase,
        properties: {

        },

        onLoad: function () {
            cc.Seven77EffectController.getInstance().setSeven77EffectView(this);
        },

        //tiep tuc animation (truong hop an Jackpot. User phai touch moi tiep tuc animation)
        continueClicked: function () {
            this.stopEffect();
            //chay hieu ung win tung line
            cc.Seven77PayLinesController.getInstance().playEffect(this.prizeLines, 0);
        },
    });
}).call(this);
