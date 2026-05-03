var netConfig = require('NetConfig');

(function () {
    cc.DNSHelpView = cc.Class({
        "extends": cc.Component,
        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;        
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        //Click
        backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.active = false;
            }, this, 1, 0, delay, false);
        },
        onClickDNSHelp: function(sender, url) {
        
            if (url) {
                cc.sys.openURL(url.toString());
            }
            
        }
    });
}).call(this);
