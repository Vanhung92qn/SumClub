(function () {
    cc.Avatar = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.sprite = this.node.getComponent(cc.Sprite);
        },

        setAvatar: function (spriteFrame) {
            if (this.node !== null) {
                this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        },

        getAvatar: function (imageUrl) {
            var self = this;
            cc.loader.load({url: imageUrl, type: 'png', width: 256, height: 256}, function (err, tex) {
                if (self.node !== null) {
                    self.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                }
            });
            /*
            cc.textureCache.addImageAsync(imageUrl, function (texture) {
                if (self.node !== null) {
                    self.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                }
            }, this);*/
        },

        load: function (fbId) {
            var self = this;
            var imageUrl = 'https://graph.facebook.com/' + fbId + '/picture?redirect=false&width=512&height=512';

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    var obj = JSON.parse(response);
                    self.getAvatar(obj.data.url);
                }
            };
            xhr.open("GET", imageUrl, true);
            xhr.send();
        },

        loadAvatarJackpot: function (fbId) {
            this.node.getComponent(cc.Sprite).spriteFrame = null;

            if(!fbId || fbId === '') return;
            var self = this;
            var imageUrl = 'https://graph.facebook.com/' + fbId + '/picture?redirect=false&width=512&height=512';

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    var obj = JSON.parse(response);
                    self.getAvatar(obj.data.url);
                }
            };
            xhr.open("GET", imageUrl, true);
            xhr.send();
        }
    });

}).call(this);
