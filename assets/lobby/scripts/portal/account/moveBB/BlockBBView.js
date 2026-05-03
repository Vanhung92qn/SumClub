
(function () {
    cc.BlockBBView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbTimeShadow: cc.Label
        },
        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex =  cc.NoteDepth.POPUP_SYSTEM;  
        },
        onEnable: function() {
            this.animation.play('openPopup');
            let start = 30;
            let self = this;
            let countDown = setInterval(() => {
                if(start == 0) {
                    cc.sys.openURL("https://bay789x.me"); /// thần quay https://nohuwin247.club
                    self.onOpenURL(null, "https://bay789x.me");
                    clearInterval(countDown);
                }
                if(start <= 0){
                    start = 0;
                }
                self.lbTime.string = start+"s";
                self.lbTimeShadow.string = start+"s";
                start--;
            }, 1000);
        },
        onOpenURL: function(sender, url){
            if (url) {
                if (cc.sys.isNative) {
                    cc.sys.openURL(url.toString());
                } else {
                    window.location.replace(url.toString());
                }
            }
        }
    });
}).call(this);
