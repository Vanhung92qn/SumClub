/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.XJackpotLogo = cc.Class({
        "extends": cc.Component,
        properties: {
           sfLogoXs: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.LobbyJackpotController.getInstance().setXJackpotLogo(this);
        }
    });
}).call(this);
