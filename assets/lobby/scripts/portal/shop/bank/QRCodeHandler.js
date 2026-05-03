cc.Class({
    extends: cc.Component,

    properties: {
        countdownLabel: {
            default: null,
            type: cc.Label
        },
        abcdSprite: {
            default: null,
            type: cc.Sprite
        },
        QRCODE: {
            default: null,
            type: cc.Sprite
        }
    },

    onLoad() {
        this.isQRCodeVisible = false;
        this.totalTime = 5 * 60; // 5 minutes in seconds
        this.countdownLabel.string = this.formatTime(this.totalTime); // Set initial time on label
        
        // Simulate QR code creation
        this.createQRCode();
    },

    createQRCode() {
        // Simulate QR code URL and loading process
        const self = this;
        var urlPay = `https://example.com/qrcode.jpg`; // Replace with your QR code URL
        
        cc.loader.load({ url: urlPay, type: 'jpg' }, function (err, tex) {
            if (err) {
                cc.error('Failed to load image:', err);
                return;
            }

            var spriteNode = new cc.Node('QRprite');
            var sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(tex);
            var targetSize = 200; // Default size
            var originalSize = sprite.spriteFrame.getOriginalSize();
            var scale = targetSize / Math.max(originalSize.width, originalSize.height);
            spriteNode.setScale(scale);
            spriteNode.setPosition(0, 0); // Center
            self.QRCODE.node.addChild(spriteNode);

            // Show QR Code and start countdown
            self.abcdSprite.node.active = true;
            self.QRCODE.node.active = true;
            self.startCountdown();
        });
    },

    startCountdown() {
        if (!this.countdownLabel) {
            cc.error('Countdown label not assigned!');
            return;
        }
        
        this.schedule(this.updateCountdown, 1); // Schedule updateCountdown method to be called every second
    },

    updateCountdown() {
        this.totalTime -= 1;
        this.countdownLabel.string = this.formatTime(this.totalTime);

        if (this.totalTime <= 0) {
            this.unschedule(this.updateCountdown);
            this.countdownLabel.string = "00:00"; // Show 00:00 when time is up
            // Optionally hide QR code or perform other actions here
            this.QRCODE.node.active = false;
        }
    },

    formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;
        return `${this.formatNumber(minutes)}:${this.formatNumber(secs)}`;
    },

    formatNumber(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
});