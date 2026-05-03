(function () {
    cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function() {
            var self = this;
            this.isTouch = false;
            this.lastX = this.node.x;
            this.lastY = this.node.y;
            this.countTouch = 0;

            this.node.on('touchstart', function () {
                self.isTouch = true;
                self.node.zIndex = cc.Config.getInstance().getZINDEX();
            }, this.node);

            this.node.on('touchmove', function (event) {
                if (self.isTouch) {
                    var delta = event.touch.getDelta();
                    self.countTouch ++;
                    this.x += delta.x;
                    this.y += delta.y;
                }
            }, this.node);

            this.node.on('touchend', function (event) {
                if (self.isTouch) {
                    if(self.node.name == 'plate'){
                        cc.SicBoController.getInstance().openEndDiaNanView();
                    }	
                    self.countTouch = 0;
                    self.lastX = this.x;
                    self.lastY = this.y;
                    self.isTouch = false;
                }
            }, this.node);
        },

        disableTouch: function () {
            this.isTouch = false;
        }
    });
}).call(this);
