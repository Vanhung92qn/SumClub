/**
 * Created by Nofear on 1/14/2019.
 */

(function () {
    cc.TouchMove = cc.Class({
        "extends": cc.Component,
        properties: {
            btnHandle: cc.Button,
            touchParent: cc.TouchMove,
        },

        onLoad: function() {
            var self = this;

            this.isTouch = false;

            this.lastX = this.node.x;
            this.lastY = this.node.y;
            this.countTouch = 0;


            //this.node.opacity = 160;
            this.btnHandle = this.node.getComponent(cc.Button);

            this.node.on('touchstart', function () {
                //this.opacity = 255;
                 self.isTouch = true;
                 self.node.zIndex = cc.Config.getInstance().getZINDEX();
            }, this.node);

            this.node.on('touchmove', function (event) {
                if (self.touchParent !== undefined && self.touchParent !== null) {
                    self.touchParent.isTouch = false;
                }
                if (self.isTouch) {
                    //this.opacity = 255;
                    if (self.touchParent !== undefined && self.btnHandle !== null) {
                        if (self.lastX !== this.x || self.lastY !== this.y) {
                            self.btnHandle.interactable = false;
                        }
                    }
                    var delta = event.touch.getDelta();
                    self.countTouch ++;
                    this.x += delta.x;
                    this.y += delta.y;
                }
            }, this.node);

            this.node.on('touchend', function (event) {
   
                if (self.touchParent !== undefined && self.touchParent !== null) {
                    self.touchParent.isTouch = true;
                    
                    if(self.btnHandle.node.name == 'bat'){
                        cc.TaiXiuController.getInstance().openEndDiaNanView();
                    }					
                }
                if (self.isTouch) {
                    if (self.btnHandle !== null) {
                        self.btnHandle.interactable = true;
                    }            
                    if ((self.countTouch < (cc.sys.os === cc.sys.OS_ANDROID ? 5 : 2)) && self.btnHandle !== null && self.btnHandle.node.name == "btnMINI") {
                        cc.MINIController.getInstance().openClicked();                       
                    }
                    if ((self.countTouch < (cc.sys.os === cc.sys.OS_ANDROID ? 5 : 2)) && self.btnHandle !== null && self.btnHandle.node.name == 'bat'){
                        cc.TaiXiuController.getInstance().openEndDiaNanView();
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
