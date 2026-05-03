/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.LobbyEffectItem = cc.Class({
        "extends": cc.Component,
        properties: {
            rtContent: cc.RichText,
        },

        onLoad: function () {
            //this.node.opacity = 0;
            //this.node.getComponent(cc.Animation).play('fadeOut');
        },

        updateUser: function (effectView, user) {
            this.effectView = effectView;
            this.rtContent.string = '<color=#FF0000>' + user.NickName + '</c> vừa nổ hũ \n'
                                    + '<color=#F9E901><b>' + cc.Tool.getInstance().formatNumber(user.JackpotValue)
                                    + '</b></color> game ' + user.GameName;
        },
        
        closeClicked: function () {
            this.effectView.forceDestroyEffect();
        }
    });
}).call(this);
